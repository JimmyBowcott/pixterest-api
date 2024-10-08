const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = require("express").Router();

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return done(null, false, { message: "Incorrect username." });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

router.post("/", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
  
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ user: { id: user._id, savedPosts: user.savedPosts } });
      });
    })(req, res, next);
  });

module.exports = router;
