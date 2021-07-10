const mongoose = require("mongoose");
const db = require("../models");
// This file empties the Books collection and inserts the books below
mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/happyhealth"
);
const userSeed = [
  {
    username: "spenserlogan",
    password: "password12345",
    email: "spenserlogan@gmail.com ",
    userCreated: new Date(Date.now())
  }
];
db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
});