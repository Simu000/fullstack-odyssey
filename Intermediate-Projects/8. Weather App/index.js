import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const APIkey = "89691a559a6ac03635cf78f548a3f9d5";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/city", async (req, res) => {
  try {
    let city = req.body.City;
    const result = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`
    );
    let latitude = result.data[0].lat;
    let longitude = result.data[0].lon;

    const finalResult = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`
    );
    console.log(finalResult);

    res.render("results.ejs", {
      City: finalResult.data.name,
      Country: finalResult.data.sys.country,
      Temperature: finalResult.data.main.temp,
      Feel: finalResult.data.main.feels_like,
      desc: finalResult.data.weather[0].description,
      humidity: finalResult.data.main.humidity,
      windSpeed: finalResult.data.wind.speed,
      cloudiness: finalResult.data.clouds.all,
      Sunrise: new Date(
        finalResult.data.sys.sunrise * 1000
      ).toLocaleTimeString(),
      Sunset: new Date(finalResult.data.sys.sunset * 1000).toLocaleTimeString(),
      icon: finalResult.data.weather[0].icon,
    });
  } catch (error) {
    res.status(404).render("results.ejs", {
      error: "City not found. Please enter a valid city name.",
      City: null,
      Country: null,
      Temperature: null,
      Feel: null,
      desc: null,
      humidity: null,
      windSpeed: null,
      cloudiness: null,
      Sunrise: null,
      Sunset: null,
      icon: null,
    });
  }
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
