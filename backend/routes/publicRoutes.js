module.exports = function publicRoutes(app, {Update, User}) {
    app
     .route("/public/updates")
     .get(async (req, res) => {
        const updates = await Update.find();
        return res.json(updates);
     })

     app
      .route("/public/orgInfo/:orgUsername")
      .get(async (req, res) => {
        const orgUsername = req.params.orgUsername;
        const orgDoc = await User.findOne({
            username: orgUsername
        })
        const modifiedOrgDoc = Object.assign({}, orgDoc._doc);
        delete modifiedOrgDoc._id;
        delete modifiedOrgDoc.password;
        delete modifiedOrgDoc.__v;
        return res.json(modifiedOrgDoc);
      })
}