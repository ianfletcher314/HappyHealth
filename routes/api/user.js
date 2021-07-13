const router = require("express").Router();
const User = require("../../models/User");


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
    User.create(req.body)
      .then((user) => {
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
        res.status(200).json(user);
      })
    //   .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;
