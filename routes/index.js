const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// ------testing route
router.route("/test").get((req, res) => {
  console.log("routes is working");
  res.status(222).json({ message: "thank the lord" });
});
// api routes use /api endpoint
router.use("/api", apiRoutes);

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
