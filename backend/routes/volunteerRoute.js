const passport = require("passport");

module.exports = function (app, ensureIsAuthenticated, { User }) {
  app.route("/volunteer/allInfo").get(async (req, res) => {
    const userClone = Object.assign({}, req.user._doc);
    delete userClone._id;
    delete userClone.__v;
    return res.json(userClone);
  });

  app
    .route("/volunteer/bio")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        bio: req.user.bio,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.bio = req.body.bio;
      try {
        await req.user.save();
        return res.json({
          success: true,
        });
      } catch (e) {
        return res.json({
          success: false,
        });
      }
    });

  app
    .route("/volunteer/tags")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        tags: req.user.tags,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.tags = req.body.tags;
      try {
        await req.user.save();
        return res.json({
          success: true,
        });
      } catch (e) {
        console.log(e);
        return res.json({
          success: false,
        });
      }
    });

  app
    .route("/volunteer/socialLinks")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json(req.user.socialLinks);
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.socialLinks = req.body;
      try {
        await req.user.save();
        return res.json({
          success: true,
        });
      } catch (e) {
        return res.json({
          success: false,
        });
      }
    });

  app
    .route("/volunteer/location")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        location: req.user.location,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.location = req.body.location;
      try {
        await req.user.save();
        return res.json({
          success: true,
        });
      } catch (e) {
        return res.json({
          success: false,
        });
      }
    });
};
