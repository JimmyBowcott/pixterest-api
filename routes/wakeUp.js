const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json({ message: "Waking server up..." });
});

module.exports = router;