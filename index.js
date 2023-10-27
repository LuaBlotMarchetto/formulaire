const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

/* MAILGUN CONFIGURATION */
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Lua Blot-Marchetto",
  key: process.env.API_KEY,
});

app.get("/", (req, res) => {
  res.send("server is up");
});

app.post("/form", async (req, res) => {
  try {
    console.log(req.body);

    const { firstname, lastname, email, message } = req.body;

    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "marchetto.lua@gmai.com",
      subject: `Formulaire JS`,
      text: message,
    };

    const response = await client.messages.create(
      process.env.DOMAIN,
      messageData
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("server is listening");
});
