const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: "Username is Required"
    },

    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 8, "Password should be longer."]
    },
    
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    
    userCreated: {
        type: Date,
        default: Date.now
    },
    favorites: [
        {
        title : {
            type: String,
            trim: true,
        },
        url : {
            type: String,
            trim: true,
        },
        id : {
            type: String,
            trim: true,
        }
    }
    ]
});


UserSchema.pre("save", function(next) {
    if(!this.isModified("password"))
        return next();
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});
// old comparePassword
// UserSchema.methods.comparePassword = function(password, cb) {
//     bcrypt.compare(password, this.password, (err, isMatch) => {
//         console.log("hashed",this.password,"unhashed",password,"isMatch?",isMatch)
//         if(err)
//             return cb(err);
//         else {
//             return isMatch;
//         }
//     });
// }
// kats comparePassword
UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  }; 

// app.post("/login", async (request, response) => {
//     try {
//         var user = await User.findOne({ username: request.body.username }).exec();
//         if(!user) {
//             return response.status(400).send({ message: "The username does not exist" });
//         }
//         if(!Bcrypt.compareSync(request.body.password, user.password)) {
//             return response.status(400).send({ message: "The password is invalid" });
//         }
//         response.send({ message: "The username and password combination is correct!" });
//     } catch (error) {
//         response.status(500).send(error);
//     }
// });

const User = mongoose.model("User", UserSchema);

module.exports = User;