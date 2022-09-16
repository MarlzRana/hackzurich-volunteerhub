// MODULES
const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = function (app, userCollection) {
  app.route("/auth").get((req, res) => {
    res.send("Welcome to auth endpoint");
  });

  app.route("/auth/register").post(
    (req, res, next) => {
      userCollection.findOne(
        { username: req.body.username },
        (err, userDoc) => {
          if (err) return next(err);
          if (userDoc)
            return res.json({ success: false, message: "user already exists" });
          userCollection.insertOne(
            {
              username: req.body.username,
              password: bcrypt.hashSync(req.body.password, 12),
            },
            (err, userDoc1) => {
              next(null, userDoc1.insertedId);
            }
          );
        }
      );
    },
    passport.authenticate("local", { failureRedirect: "/failureLogin" }),
    (req, res, next) => {
      return res.json({ success: true, message: "successfully registered" });
    }
  );

  app
    .route("/auth/login")
    .post(
      passport.authenticate("local", { failureRedirect: "/failureLogin" }),
      (req, res) => {
        res.json({
          success: true,
          message: "successfully logged in",
        });
      }
    );

  app.route("failureLogin").get((req, res) => {
    res.json({ success: false, message: "unsuccessful login" });
  });

  app.route("/auth/logout").get((req, res) => {
    req.logout();
    res.json({
      success: true,
      message: "successful logout",
    });
  });

  app.route("/auth/isAuthenicated").get((req, res) => {
    if (req.isAuthenticated()) {
      return res.json({
        isAuthenicated: true,
      });
    }
    return res.json({
      isAuthenicated: false,
    });
  });
};
