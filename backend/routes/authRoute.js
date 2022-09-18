// MODULES
const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports = function (app, { User }) {
  app.route("/auth").get((req, res) => {
    res.send("Welcome to auth endpoint");
  });

  app.route("/auth/register").post(
    async (req, res, next) => {
      try {
        const doesUserExist = await User.findOne({
          username: req.body.username,
        });
        if (doesUserExist) {
          return res.json({ success: false, message: "user already exists" });
        }
        const newUser = new User({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 12),
          type: req.body.type,
          associatedInfo: { bio: "" },
        });
        await newUser.save();
        next(null, newUser._id);
      } catch (e) {
        next(e);
      }
    },
    passport.authenticate("local", { failureRedirect: "/auth/failureLogin" }),
    (req, res, next) => {
      return res.json({ success: true, message: "successfully registered" });
    }
  );

  app
    .route("/auth/login")
    .post(
      passport.authenticate("local", { failureRedirect: "/auth/failureLogin" }),
      (req, res) => {
        res.json({
          success: true,
          message: "successfully logged in",
        });
      }
    );

  app.route("/auth/failureLogin").get((req, res) => {
    res.json({ success: false, message: "unsuccessful login" });
  });

  app.route("/auth/lackPermissions").get((req, res) => {
    res.json({
      success: false,
      message:
        "you lack permissions (most likely you tried to access an organisation endpoint as a volunteer or vice versa)",
    });
  });

  app.route("/auth/logout").get((req, res) => {
    req.logout(() => {
      res.json({
        success: true,
        message: "successful logout",
      });
    });
  });

  app.route("/auth/isAuthenticated").get((req, res) => {
    if (req.isAuthenticated()) {
      return res.json({
        isAuthenticated: true,
      });
    }
    return res.json({
      isAuthenticated: false,
    });
  });

  app.route("/auth/accountType").get((req, res) => {
    if (req.isAuthenticated()) {
      return res.json(req.user.type);
    }
    return res.json({
      isAuthenticated: false,
    });
  });
};
