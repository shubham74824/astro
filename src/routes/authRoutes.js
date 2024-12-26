import express from "express";
import User from "../models/UserEntity.js";
import Astro from "../models/AstroEntity.js";
import jwt from "jsonwebtoken";

const authRoutes = express.Router();

const secretKey = "your_secret_key";

authRoutes.post('/send_otp', async (req, res) => {
    const { number } = req.body;

    if (!number) {
        return res.status(400).json({ message: "Number is required" });
    }

    // Check if the number exists in User or Astro collections
    const user = await User.findOne({ number }).exec();
    const astro = await Astro.findOne({ number }).exec();

    if (user || astro) {
        // If number exists, update OTP in the respective document
        const target = user || astro;
        const otp = 1234;
        target.otp = otp; // Update OTP
        target.otpCreatedAt = new Date(); // Update OTP creation timestamp
        await target.save();

        // (Optional) Send OTP via email/SMS (mocked here)
        console.log(`OTP sent to ${number}: ${otp}`);

        return res.json({ message: "OTP sent successfully" });
    }

    // If number doesn't exist, create a new User entry
    const otp = 1234;
    const newUser = new User({ number, otp, otpCreatedAt: new Date() });
    await newUser.save();

    // (Optional) Send OTP via email/SMS (mocked here)
    console.log(`OTP sent to ${number}: ${otp}`);

    res.json({ message: "OTP sent successfully" });
});

authRoutes.post('/verify_otp', async (req, res) => {
    const { number, otp } = req.body;

    if (!number || !otp) {
        return res.status(400).json({ message: "Number and OTP are required" });
    }

    // Check if the number exists in User or Astro collections
    const user = await User.findOne({ number, otp });
    const astro = await Astro.findOne({ number, otp });

    const target = user || astro;

    if (!target) {
        return res.status(500).json({ message: "Invalid OTP or number" });
    }

    // Check OTP expiration (5 minutes)
    const otpAge = (new Date() - target.otpCreatedAt) / (1000 * 60); // Age in minutes
    if (otpAge > 5) {
        return res.status(500).json({ message: "OTP has expired" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: target._id, number }, secretKey, { expiresIn: '1h' });

    // Clear OTP from the document for security
    target.otp = null;
    target.otpCreatedAt = null;
    target.isProfileCompleted=true;
    await target.save();

    // Determine the type and return the response
    const type = user ? "user" : "astro";
    res.json({ token, type });
});

authRoutes.post('/register_astro', async (req, res) => {
    const { fullName, number, gender, email, experience, city, shortBio } = req.body;

    if (!fullName || !number || !email) {
        return res.status(400).json({ message: "Full name, number, and email are required" });
    }

    // Check if the number or email already exists in the Astro collection
    const existingAstro = await Astro.findOne({ $or: [{ number }, { email }] }).exec();

    if (existingAstro && existingAstro.isProfileCompleted) {
        return res.status(500).json({ message: "Number or email is already registered" });
    }

    // Generate OTP
    const otp = 1234;

    // Create a new Astro entry
    const newAstro = new Astro({
        fullName,
        number,
        gender,
        email,
        experience,
        city,
        shortBio,
        otp,
        otpCreatedAt: new Date(),
    });

    await newAstro.save();

    // (Optional) Send OTP via email/SMS (mocked here)
    console.log(`OTP sent to ${number}: ${otp}`);

    res.json({ message: "OTP sent successfully" });
});

export default authRoutes;