const router = require("express").Router();
const User = require("../../models/User");
const db = require("../../models");
const withAuth = require("../../utils/auth");

// ---------------------homepage get route with user authentication
router.get("/", withAuth, async (req, res) => {
  //find the user where the id is equal to the session id
  db.User.findById(req.session.user_id)
    //return username and favorites as json
    .then((dbUser) => {
      const favorites = dbUser.favorites;
      return res.json({
        favorites,
        userName: dbUser.username,
        myField: "test",
      });
    })
    .catch((err) => {
      console.log(">>", err);
      res.json(err);
    });
});
// -------------------------create user route
router.post("/", async (req, res) => {
  console.log("creating user");
  User.create(req.body)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// ---------------------------login route
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      username: req.body.username,
    });

    if (!userData) {
      console.log(">>>>user not found");
      return res.status(400).json({
        message: "Incorrect email or password, please try again",
        userData,
      });
    }

    const validPassword = await userData.comparePassword(req.body.password);

    if (!validPassword) {
      console.log(">>>>>>>>>invalid password");
      return res.status(400).json({
        message: "Incorrect email or password, please try again + valid pass",
        userData,
        validPassword,
      });
    }

    req.session.save(() => {
      req.session.user_id = userData._id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      return res.json({ user: userData, message: "You are now logged in!" });
    });

    console.log("<<<<<<<session was saved");
  } catch (err) {
    res.status(400).json({ status: "failed", msg: err.message, err });
  }
});

// ------------------------ PUT ROUTE ADDS RECIPES TO FAVORITES
router.put("/recipes", withAuth, (req, res) => {
  // console.log(req.body)
  db.User.findByIdAndUpdate(
    //find the user where the id is equal to the session id
    req.session.user_id,
    {
      $push: { favorites: req.body }, //this pushes to array model db
    },
    { new: true }
  )
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
});
// -------------------------logout route
router.get("/logout", function (req, res, next) {
  if (req.session.loggedIn) {
    req.session.destroy();
    res.json({ message: "You are successfully logged out!" });
  } else {
    res.json({ message: "You were never logged in!" });
  }
});

module.exports = router;
