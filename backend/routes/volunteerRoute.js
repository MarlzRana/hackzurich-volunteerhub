module.exports = function (app, ensureIsAuthenticated, { User, Advert }) {
  app.route("/volunteer/allInfo").get(ensureIsAuthenticated, async (req, res) => {
    const userClone = Object.assign({}, req.user._doc);
    delete userClone._id;
    delete userClone.__v;
    return res.json(userClone);
  });

  app
    .route("/volunteer/bio")
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
        return res.json({
          success: false,
        });
      }
    });

  app
    .route("/volunteer/tags")
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
    .route("/volunteer/socialLinks")
    .get(ensureIsAuthenticated, async (req, res) => {
      return res.json(req.user.associatedInfo.socialLinks);
    })
    .post(ensureIsAuthenticated, async (req, res) => {
      req.user.associatedInfo.socialLinks = req.body;
      req.user.markModified("associatedInfo");
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
        return res.json({
          success: false,
        });
      }
    });

    app
      .route("/ad/forVolunteers")
      .get(ensureIsAuthenticated, async (req, res) => {
        const ads = await Advert.find({});
        return res.json(ads);
      })

  app
    .route("/volunteer/subToOrg")
    .post(ensureIsAuthenticated, async (req, res) => {
      const orgUsername = req.body.orgUsername;
      if (!req.user.subbedOrgs){
        req.user.associatedInfo.subbedOrgs = [req.body.orgUsername]
      } else {
        req.user.associatedInfo.subbedOrgs.append(req.body.orgUsername);
      }
      req.user.markModified("associatedInfo");
      try {
        await req.user.save();
      } catch(e) {
        console.error(e);
        return res.json({
          success: false,
          message: "error subscribing user to org"
        })
      }

    })
};
