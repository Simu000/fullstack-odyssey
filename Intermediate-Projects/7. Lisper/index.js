import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const content = await axios.get(
      "https://secrets-api.appbrewery.com/random"
    );
    res.render("index.ejs", {
      secret: content.data.secret,
      user: content.data.username,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
