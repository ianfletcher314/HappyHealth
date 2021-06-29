const router = require("express").Router();
const healthRoute = require("./health");

// Post routes
router.use("/health", healthRoute);

module.exports = router;


