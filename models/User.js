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
        },
        image : {
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

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  }; 


const User = mongoose.model("User", UserSchema);

module.exports = User;