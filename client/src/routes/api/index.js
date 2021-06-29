const router = require("express").Router();
const main = require("./main");

// Post routes
router.use("/main", main);

module.exports = router;


