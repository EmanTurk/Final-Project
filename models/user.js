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
        lowercase: true, 
        validate: function(value) { 
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: "Invalid Email Address" 
    },
    password: {
        type: String,
        required: true,
        minlength: [4, "Password must be at least 4 characters!"] 
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
