const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("passport");
const ObjectId = require("mongodb").ObjectId;

module.exports = function (app, { User }) {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ _id: new ObjectId(id) });
    done(null, user);
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );
};
