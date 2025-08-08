import dotenv from "dotenv";
import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const sendMail = async (msg) => {
  try {
    await sgMail.send(msg); 
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.post("/send-email", async (req, res) => {
  const { to } = req.body;
  const msg = {
    to: to,
    from: "simu0609@gmail.com",
    subject: "Hello from SendGrid...",
    text: "Hope You have a great day!",
  };

  try {
    await sendMail(msg);
    res.status(200).send("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
