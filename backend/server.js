// PACKAGES
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// ROUTES

// Creating main app object
const app = express();

// MIDDLEWARE
app.use("/public", express.static(process.cwd() + "/public"));
// Setting up the CORS policy
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// MAIN LOGIC
app.route("/").get((req, res) => {
  res.send("Welcome to VolunteerHub");
});

// 404 Not Found "Middleware"
app.use((req, res, next) => {
  res.status(404).type("text").send("Page not found, try again!");
});

// PORT AND LISTEN SETUP
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
