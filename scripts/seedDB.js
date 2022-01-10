const mongoose = require("mongoose");
const db = require("../models");

//COMMENT THIS CONNNECTION OUT AFTER TESTING
// connection to mongo database
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://happyhealth:password12345@cluster0.iidhp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const userSeed = [
  {
    username: "spenserlogan",
    password: "password12345",
    email: "spenserlogan@gmail.com ",
    userCreated: new Date(Date.now()),
  },
];
// function that seeds the database with the userSeed Above
db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
