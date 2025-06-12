import express from "express";
import bodyparser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));

function bandName(req, res, next) {
  var name = req.body["street"] + req.body["pet"];

  next();
}

app.use(bandName);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Your Band Name</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #fceabb, #f8b500);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        h1 {
          color: #222;
        }
        h2 {
          background-color: #fff;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          color: #333;
        }
        a {
          margin-top: 20px;
          text-decoration: none;
          color: #fff;
          background-color: #f8b500;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          transition: 0.3s;
        }
        a:hover {
          background: #e0a400;
        }
      </style>
    </head>
    <body>
      <h1>Your Band Name Is:</h1>
      <h2>${req.body["street"] + req.body["pet"]} ✌️</h2>
      <a href="/">Generate Another</a>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
