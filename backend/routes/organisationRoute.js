module.exports = function (app, ensureIsAuthenticated, { User, Advert, Update }) {
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


  app
  .route("/organisation/ad")
  .post(ensureIsAuthenticated, async (req, res) => {
    // Get fields
    const orgUsername = req.user.username;
    const title = req.body.title;
    const description = req.body.description;
    const videoUrl = req.body.videoUrl;

    // Create an advert
    const newAd = new Advert({
      orgUsername,
      title,
      description,
      videoUrl
    })

    //Then save the advert to the database
    try{
      await newAd.save();
    } catch (e) {
      console.error(e);
      return res.json({
        success: false,
        message: "there was a server-side error creating the ad"
      })
    }
  })

  app
    .route("/organisation/myUpdates")
    .get(ensureIsAuthenticated, async (req, res) => {
      try {
        const myUpdates = await Update.find({
        orgUsername: req.user.username
      })
      return res.json({
        success: true,
        updates: myUpdates
      })
    } catch (e) {
      console.error(e);
      return res.json({
        success: false,
        message: "error getting your updates on the server side"
      })
    }
    })

  app
    .route("/organisation/update")
    .post(ensureIsAuthenticated, async (req, res) => {
      // Get fields from the request body
      const orgUsername = req.user.username;
      const type = req.body.type;
      const title = req.body.title;
      const description = req.body.description;

      // Create the new update
      const newUpdate = new Update({
        orgUsername,
        type,
        title,
        description
      })
      try {
        await newUpdate.save();
        return res.json({
          success: true
        })
      } catch (e) {
        console.error(e);
        return res.json({
          success: false,
          message: "there was a server side error adding a new update"
        })
      }
    })
};
