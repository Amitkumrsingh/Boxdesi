// controllers/authController.js
const User = require('../models/User');
const twilio = require('twilio');
const crypto = require('crypto');
require('dotenv').config();

// Initialize Twilio client
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send OTP
exports.sendOtp = async (req, res) => {
    const { phoneNumber } = req.body;

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
        const otpExpiresAt = new Date(Date.now() + 10 * 60000); // OTP expires in 10 minutes

        // Check if the user already exists
        let user = await User.findOne({ phoneNumber });

        // Generate a new verification token and its expiration time
        const verificationToken = crypto.randomBytes(32).toString('hex'); // Generate a random token
        const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours

        if (!user) {
            // If the user doesn't exist, create a new one
            user = new User({
                phoneNumber,
                otp,
                otpExpiresAt,
                verificationToken,  // Set the generated verification token
                tokenExpiresAt,      // Set the token expiration time
            });
        } else {
            // Update existing user's OTP, verification token, and expiration time
            user.otp = otp; // Ensure the OTP is set
            user.otpExpiresAt = otpExpiresAt; // Update expiration time
            user.verificationToken = verificationToken; // Update verification token
            user.tokenExpiresAt = tokenExpiresAt; // Update token expiration time
        }

        // Save the user with OTP and verification token
        await user.save();

        // Send OTP via Twilio
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to verify OTP
// Function to verify OTP
// Function to verify OTP
exports.verifyOtp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required.' });
    }

    try {
        const user = await User.findOne({ phoneNumber });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the OTP matches

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if the OTP has expired
        if (new Date() > user.otpExpiresAt) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // If OTP is valid, proceed to generate verification token
        user.isVerified = true;
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        user.verificationToken = verificationToken;
        user.tokenExpiresAt = tokenExpiresAt;

        // Clear OTP after successful verification
        user.otp = null; // Change this line to avoid validation errors

        await user.save(); // Save user changes

        res.status(200).json({ message: 'Phone number verified successfully', verificationToken });
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



