const User = require("../models/user");
const router = require("express").Router();

router.put("/", async (req, res, next) => {
    try {
        const { id, savedPosts } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        user.savedPosts = savedPosts;
        await user.save();
        res.json(user);
        
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
