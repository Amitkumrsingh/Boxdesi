const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    otp: {
        type: String,
        required: false, // Change this to false
    },
    otpExpiresAt: {
        type: Date,
        required: false, // Change this to false
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: false, // Change this to false
    },
    tokenExpiresAt: {
        type: Date,
        required: false, // Change this to false
    },
});


module.exports = mongoose.model('User', userSchema);
