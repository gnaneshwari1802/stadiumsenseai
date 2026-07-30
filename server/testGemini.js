require("dotenv").config();

const https = require("https");

const apiKey = process.env.GEMINI_API_KEY;

https.get(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
  (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    });
  }
);