import express from "express";
import User from "../models/UserEntity.js";
import Astro from "../models/AstroEntity.js";
import jwt from "jsonwebtoken";
import { sendOTP } from "../utils/AppUtils.js";
const authRoutes = express.Router();

const secretKey = "123abc$%4d9Ef!@#hijKL6789MN0pQRstuvWXYZ";

authRoutes.post("/send_otp", async (req, res) => {
    const { number } = req.body; // Only number is passed
  
    if (!number) {
      return res.status(400).json({ message: "Number is required" });
    }
  
    try {
      // First, check if the number exists in the Astro collection (Astrologer login)
      const astro = await Astro.findOne({ number: number.trim() });
  
      if (astro) {
        // If found, generate OTP for Astro login
        const otp = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
        astro.otp = otp;
        astro.otpCreatedAt = new Date(); // Update OTP creation timestamp
        await astro.save();
  
        // Send OTP via SMS (or any other method)
        const message = `Your OTP is ${otp}. Please do not share it with anyone.`;
        console.log("message..", message);
        const smsResponse = await sendOTP(number, message);
  
        if (!smsResponse || smsResponse.return !== true) {
          return res.status(500).json({ message: "Failed to send OTP" });
        }
  
        return res.json({
          message: "OTP sent successfully for Astro login",
        });
      }
  
      // If not found in Astro, check in the User collection (User registration or login)
      const user = await User.findOne({ number }).exec();
  
      if (user) {
        // If found in User collection, generate OTP for login
        const otp = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
        user.otp = otp;
        user.otpCreatedAt = new Date(); // Update OTP creation timestamp
        await user.save();
  
        // Send OTP via SMS (or any other method)
        const message = `Your OTP is ${otp}. Please do not share it with anyone.`;
        console.log("message..", message);
        const smsResponse = await sendOTP(number, message);
  
        if (!smsResponse || smsResponse.return !== true) {
          return res.status(500).json({ message: "Failed to send OTP" });
        }
  
        return res.json({
          message: "OTP sent successfully for User login",
        });
      } else {
        // If not found in User collection, register the user and send OTP
        const otp = Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0");
        const newUser = new User({
          number,
          otp,
          otpCreatedAt: new Date(),
        });
  
        await newUser.save();
  
        // Send OTP via SMS (or any other method)
        const message = `Your OTP is ${otp}. Please do not share it with anyone.`;
        const smsResponse = await sendOTP(number, message);
        console.log("message..", message);
        if (!smsResponse || smsResponse.return !== true) {
          return res.status(500).json({ message: "Failed to send OTP" });
        }
  
        return res.json({
          message: "OTP sent successfully for User registration",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
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