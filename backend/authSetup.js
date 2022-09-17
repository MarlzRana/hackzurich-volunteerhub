const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, myDataBase) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectId(id) }, (err, doc) => {
      done(null, doc);
    });
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      myDataBase.findOne({ username: username }, (err, userDoc) => {
        console.log(`User ${username} attempted to log in.`);
        if (err) return done(err);
        if (!userDoc) return done(null, false);
        if (!bcrypt.compareSync(password, userDoc.password)) {
          return done(null, false);
        }
        return done(null, userDoc);
      });
    })
  );
};
