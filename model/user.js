const { error } = require('console');
const { createHmac, randomBytes } = require('crypto');
const mongoose = require("mongoose");
const { createUsertoken } = require('../services/authentication');

const userchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    salt: {
        type: String,
        //required: true,
    },

    password: {
        type: String,
        required: true,
    },  

    profileImageUrl: {
        type: String,
        default: "/images/default.jpeg"
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
}, {
    timestamps: true
});

userchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    const salt = randomBytes(16).toString('hex');
    const hashedpassord = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedpassord;

    next();
});

userchema.statics.matchPasswordandGenerateToken = async function (email,password){
    const user = await this.findOne({ email });
    console.log(user);
    if(!user) throw new Error("User not found");
    const salt = user.salt;
    const hashedpassord = user.password;
    const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

    if(hashedpassord !== userProvidedHash) throw new Error("Incorrect password") ;
    const token = createUsertoken(user);
    return token;
}




const User = mongoose.model("user", userchema);

module.exports = User;