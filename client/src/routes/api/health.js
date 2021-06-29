const router = require("express").Router();
const healthController = require("../../../../controllers/healthController")

router.route("/")
    .get(healthController.findAll)

module.exports = router;