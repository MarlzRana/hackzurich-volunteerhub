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
const organisationRoute = require("./routes/organisationRoute.js");
const fileRoute = require("./routes/fileRoute.js");
const authSetup = require("./authSetup.js");
const publicSetup = require("./routes/publicRoutes.js");
const { mongo } = require("mongoose");
const { MongoTopologyClosedError } = require("mongodb");

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
    associatedInfo: mongoose.Schema.Types.Mixed,
  });
  const fileSchema = new mongoose.Schema({
    fileNameOnBackend: String,
    mimetype: String,
    ownerId: mongoose.Types.ObjectId
  })
  const advertSchema = new mongoose.Schema({
    orgUsername: String,
    title: String,
    description: String,
    videoUrl: String
  })
  const updateSchema = new mongoose.Schema({
    orgUsername: String,
    type: String,
    title: String,
    description: String,
  })
  const User = mongoose.model("users", userSchema);
  const File = mongoose.model("files", fileSchema);
  const Advert = mongoose.model("adverts", advertSchema);
  const Update = mongoose.model("updates", updateSchema);

  //Auth config
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/lackPermissions");
  }

  function ensureAuthenticatedVolunteer(req, res, next) {
    if (req.isAuthenticated() && req.user.type === "volunteer") {
      return next();
    }
    res.redirect("/auth/lackPermissions");
  }

  function ensureAuthenticatedOrganisation(req, res, next) {
    if (req.isAuthenticated() && req.user.type === "organisation") {
      return next();
    }
    res.redirect("/auth/lackPermissions");
  }

  //Routes
  defaultRoute(app);
  authRoute(app, { User });
  volunteerRoute(app, ensureAuthenticatedVolunteer, { User, Advert });
  organisationRoute(app, ensureAuthenticatedOrganisation, { User, Advert, Update });
  fileRoute(app, ensureAuthenticated, { File });
  publicSetup(app, {Update, User});
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
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
