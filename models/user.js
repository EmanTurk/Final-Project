import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide A Name'],
        minlength: [2, 'Too Short'],
        maxlength: 20 // Corrected from 'maxlenghh' to 'maxlength'
    },
    address: {
        type: String,
        required: [true, 'Must Provide An Address']
    },
    email: {
        type: String,
        required: [true, "Must Provide A Valid Email"],
        unique: [true, 'This Email is Already In Use'],
        lowercase: true, // Corrected from 'lowerCase' to 'lowercase'
        validate: function(value) { // Corrected from 'validatior' to 'validate'
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: "Invalid Email Address" // Corrected the spelling of 'Unvalid' to 'Invalid'
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "Password must be at least 4 characters!"] // Corrected the message to match the minlength
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
