// Packages
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes


// Creating main app object
const app = express();


// Middleware
app.use("/public", express.static(process.cwd() + "/public"));
// Setting up the CORS policy
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



