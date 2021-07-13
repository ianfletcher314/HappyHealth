const router = require("express").Router();
const healthRoute = require("./health");
const User = require("./user");

// Post routes
// router.use("/health", healthRoute);
router.use("/user", User);

module.exports = router;


