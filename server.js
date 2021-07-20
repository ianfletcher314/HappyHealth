// require ("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const session = require("express-session");
const MongoStore = require('connect-mongo');
// const User = require("./models/User");
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const sess = {
  secret: process.env.SECRET||"secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI||'mongodb://localhost/happyhealth', //YOUR MONGODB URL
      ttl: 14 * 24 * 60 * 60,
       autoRemove: 'native' 
  })
};

app.use(session(sess));

// Add routes, both API and view
app.use(routes);


// const userInput = {
//   username: "spenserlogan",
//   password: "password12345"
// }

// const user = new User(userInput);
// user.save((err, document) => {
//   if(err)
//     console.log(err);
//   console.log(document);
// })
  
// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");
// mongoose.connect(
//     process.env.MONGODB_URI || "mongodb://localhost/happyhealth",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     }
//   );


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/happyhealth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

  
// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// mongodb+srv://Health-admin:StayHealthy123@cluster0.iidhp.mongodb.net/happyhealth?retryWrites=true&w=majority