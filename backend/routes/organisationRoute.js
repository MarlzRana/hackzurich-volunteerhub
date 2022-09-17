module.exports = function (app, ensureIsAuthenticated, { User }) {
  app
    .route("/organisation/name")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        name: req.user.associatedInfo.name,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.associatedInfo.name = req.body.name;
      req.user.markModified("associatedInfo");
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
    .route("/organisation/bio")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        bio: req.user.associatedInfo.bio,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.associatedInfo.bio = req.body.bio;
      req.user.markModified("associatedInfo");
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
    .route("/organisation/tags")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        tags: req.user.associatedInfo.tags,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.associatedInfo.tags = req.body.tags;
      req.user.markModified("associatedInfo");
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
    .route("/organisation/location")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json({
        location: req.user.associatedInfo.location,
      });
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.associatedInfo.location = req.body.location;
      req.user.markModified("associatedInfo");
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
};
