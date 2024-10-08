const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ user: { id: user._id, savedPosts: user.savedPosts } });
          });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
