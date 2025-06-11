import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "URL",
      message: "Enter your URL?",
    },
    {
      type: "password",
      name: "password",
      message: "What is your password?",
      mask: "*",
    },
  ])
  .then((answers) => {
    var qr_svg = qr.image(answers.URL); //default is png
    qr_svg.pipe(fs.createWriteStream("qr_image.png"));

    fs.writeFile(
      "url.txt",
      `URL: ${answers.URL}\nPassword: ${answers.password}`,
      (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("Data saved to r.txt");
        }
      }
    );
  })
  .catch((error) => {
    if (error.isTtyError) {
    } else {
    }
  });
