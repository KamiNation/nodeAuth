import mongoose from "mongoose";
// This package makes it easy to validate 
import pkg from "validator";
// we need to validate the email so we destruct it from the package 
const { isEmail } = pkg

import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        // and then use it here
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
})

// fire a function after doc saved to db [after]
userSchema.post('save', function (doc, next) {
    console.log("new user was saved to doc and saved", doc);
    next();
})


// fire a function before doc saved to db [before]
userSchema.pre('save', function (next) {
    console.log("user about to be created and saved", this)
    next()
})


userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const User = mongoose.model('user', userSchema);

export default User