// MODULES
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

// CUSTOM MODULES
const myDB = require("./connection");
const defaultRoute = require("./routes/defaultRoute.js");
const authRoute = require("./routes/authRoute.js");
const volunteerRoute = require("./routes/volunteerRoute.js");
const authSetup = require("./authSetup.js");

// Creating main app object
const app = express();

// MIDDLEWARE
app.use("/public", express.static(process.cwd() + "/public"));
// Setting up the CORS policy
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    key: "express.sid",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MAIN LOGIC
myDB(async (mongoose) => {
  // Database collection schema setup
  const socialLinksSchema = new mongoose.Schema({
    instagram: String,
    twitter: String,
    linkedin: String,
  });
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bio: String,
    tags: [String],
    socialLinks: socialLinksSchema,
    location: String,
  });
  const User = mongoose.model("users", userSchema);

  //Auth config
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

  //Routes
  defaultRoute(app);
  authRoute(app, { User });
  volunteerRoute(app, ensureAuthenticated, { User });
  authSetup(app, { User });

  // 404 Not Found "Middleware"
  app.use((req, res, next) => {
    res.status(404).type("text").send("Page not found, try again!");
  });
}).catch((e) => {
  app.route("/").get((req, res) => {
    res.json({ title: e, message: "Unable to login" });
  });
});

// PORT AND LISTEN SETUP
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
