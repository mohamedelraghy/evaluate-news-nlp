var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

console.log(__dirname);
// Variables for url and api key

const baseURL = process.env.BASE_URL;
const apiKey = process.env.API_KEY;
let userInput = []; // const does not work

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// POST Route
app.post("/api", async function (req, res) {
  userInput = req.body.url;
  console.log(`You entered: ${userInput}`);
  const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`;

  const response = await fetch(apiURL);
  const mcData = await response.json();
  console.log(mcData);
  res.status(200).json(mcData);
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});
