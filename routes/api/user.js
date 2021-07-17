const router = require("express").Router();
const User = require("../../models/User");
// const session = require('express-session');


const userInput = {
      username: "spenserlogan",
      password: "password12345"
}

// const user = new User(userInput);

// user.save((err, document) => {
//   if(err)
//     console.log(err);
//   console.log(document);
// })

router.post('/', async (req, res) => {
    console.log("the route is working");
    console.log(req.body)
    User.create(req.body)
      .then((user) => {
        console.log(user)
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        // if (req.body.tagIds.length) {
        //   const productTagIdArr = req.body.tagIds.map((tag_id) => {
        //     return {
        //       product_id: product.id,
        //       tag_id,
        //     };
        //   });
        //   return ProductTag.bulkCreate(productTagIdArr);
        // }
        // if no product tags, just respond
        res.status(200).json({user});
      })
    //   .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});


router.post('/login', async (req, res) => {

  // req.session.regenerate(function(err){
  //   console.log('session regenerated!', err)
  // })

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
    console.log("valid pass", validPassword)

    if (!validPassword) {
      console.log(">>>>>>>>>invalid password")
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again + valid pass' ,userData, validPassword });
    }
    console.log(userData)
    console.log('before session save:', req.session)
    req.session.save(() => {
              req.session.user_id = userData._id;
              req.session.username = userData.username;
              req.session.loggedIn = true;
              console.log("<<<<<<<<<<<<<>>>>>>>>>", req.session)
              return res.json({ user: userData, message: 'You are now logged in!' });
            })
          
            console.log("<<<<<<<session was saved")

  } catch (err) {
    res.status(400).json({status: "failed", msg: err.message, err});
  }
});

// old route
// router.post('/login', async(req, res) => {
//   User.findOne({
//       username: req.body.username
//     }
// )
//     .then(dbUserData => {
//       console.log(req.body,"request",dbUserData)
//       if(!dbUserData) {
//         res.status(400).json({message: "No user with that username!" });
//         return;
//       }
//       const validPassword =dbUserData.comparePassword(req.body.password);
//       if (!validPassword) {
//         console.log(req.body,"request and valid pass",validPassword,)
//         res.status(400).json({message: "Incorrect password!" });
//         return;
//       }
//       req.session.save(() => {
//         req.session.user_id = dbUserData.id;
//         req.session.username = dbUserData.username;
//         req.session.loggedIn = true;
//         res.json({user: dbUserData, message: "You are now logged in!" });
//       })
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     })
// });



// Maybe use this route instead /api/user/:id
router.put("/recipes", (req, res) => {

  db.User.update( //find the user where the id is equal to the session id
      //{ _id: req.params.id },
      {
          $push: { favorites: req.body } //this pushes to array model db
      },
      { new: true }).then(dbUser => {
          res.json(dbUser);
      }).catch(err => {
          res.json(err);
      });

});







module.exports = router;
