const router = require("express").Router();
const User = require("../../models/User");
const db = require("../../models");
const withAuth = require("../../utils/auth")



const userInput = {
      username: "spenserlogan",
      password: "password12345"
}


router.get('/', withAuth, async (req, res) => {
  db.User.findById( //find the user where the id is equal to the session id
    req.session.user_id
    ).then(dbUser => {
      const favorites = dbUser.favorites;
        return res.json({favorites, userName: dbUser.username, myField: "test"});
    }).catch(err => {
      console.log('>>', err)
        res.json(err);
    });

})

router.post('/', async (req, res) => {
    console.log("the route is working");
    console.log(req.body)
    User.create(req.body)
      .then((user) => {
        console.log(user)
        res.status(200).json({user});
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.post('/login', async (req, res) => {


  try {
    const userData = await User.findOne({
            username: req.body.username
          });

    if (!userData) {
      console.log(">>>>user not found")
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' ,userData });
    }

    // VALID PASSWORD IS UNDEFINED FOR SOME REASON HOWEVER COMPARE PASSWORD IS WORKING!
    const validPassword = await userData.comparePassword(req.body.password);
    // console.log("valid pass", validPassword)

    if (!validPassword) {
      console.log(">>>>>>>>>invalid password")
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again + valid pass' ,userData, validPassword });
    }
    // console.log(userData)
    // console.log('before session save:', req.session)
    req.session.save(() => {
              req.session.user_id = userData._id;
              req.session.username = userData.username;
              req.session.loggedIn = true;
              // console.log("<<<<<<<<<<<<<>>>>>>>>>", req.session)
              return res.json({ user: userData, message: 'You are now logged in!' });
            })
          
            console.log("<<<<<<<session was saved")

  } catch (err) {
    res.status(400).json({status: "failed", msg: err.message, err});
  }
});



// Maybe use this route instead /api/user/:id
router.put("/recipes", withAuth, (req, res) => {

  // console.log(req.body)
  db.User.findByIdAndUpdate( //find the user where the id is equal to the session id
      req.session.user_id,
      {
          $push: { favorites: req.body } //this pushes to array model db
      },
      { new: true }).then(dbUser => {
          res.json(dbUser);
      }).catch(err => {
          res.json(err);
      });

});


router.get('/logout', function(req, res, next) {
  // remove the req.user property and clear the login session
  // console.log("<<<<<<<Did we make it this far>>>>>>>>>>>>>", req)
  if (req.session.loggedIn) {
    req.session.destroy();
  res.json({message: 'You are successfully logged out!'});
  }else {
    res.json({message: "You were never logged in!"})
  }
});


module.exports = router;
