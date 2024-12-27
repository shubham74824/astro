import express from "express";
import astrologerAuth from "../middleware/astroAuth.js";
import Astro from "../models/AstroEntity.js";
import User from "../models/UserEntity.js";
const astroRoutes = express.Router();
astroRoutes.get("/astro_profile", astrologerAuth, async (req, res) => {
  const { id } = req.authData; // Accessing the userId attached in the middleware

  try {
    // Find astrologer by ID and exclude OTP fields
    const user = await Astro.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Astrologer not found" });
    }
    const userProfile = {
      id: user._id,
      fullName: user.fullName || "",
      email: user.email || "",
      number: user.number,
      gender: user.gender || "",
      experience: user.experience || "",
      city: user.city || "",
      pricePerMin: parseInt(user.pricePerMin) || 0,
      shortBio: user.shortBio || "",
      profile:
        "https://i.ibb.co/y6WmwWX/Whats-App-Image-2024-12-26-at-22-58-30-38f19b5f.jpg",
    };

    // Send astrologer details
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
astroRoutes.get("/astro", astrologerAuth, async (req, res) => {
  const { id } = req.authData;

  const user = await Astro.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: "Astrologer not found" });
  }
  const dummyDashboardData = {
    name: user.fullName || "",
    astroId: user._id.toString().slice(0, 4),
    profile: "https://example.com/profile.jpg",
    today_chat_time: "0 hour",
    today_call_time: "0 hour",
    total_chat_time: "00 hours",
    total_call_time: "00 hours",
    id: user._id.toString().slice(0, 4),
  };

  return res.json(dummyDashboardData);
});
astroRoutes.get("/call_astro", (req, res) => {
  const dummyCallData = [
    {
      name: "Alice",
      type: "Incoming",
      totalTime: "30 min",
      id: "1",
    },
    {
      name: "Bob",
      type: "Outgoing",
      totalTime: "15 min",
      id: "2",
    },
  ];
  return res.json(dummyCallData);
});
astroRoutes.get("/chat_astro", (req, res) => {
  const dummyChatData = [
    {
      name: "Charlie",
      lastMessage: "Hello, can you help me?",
      time: "10:30 AM",
      totalTime: "20 min",
      id: "1",
    },
    {
      name: "David",
      lastMessage: "Looking forward to our session",
      time: "9:00 AM",
      totalTime: "30 min",
      id: "2",
    },
  ];
  return res.json(dummyChatData);
});

astroRoutes.patch("/astro_update", astrologerAuth, async (req, res) => {
  const { id } = req.authData;

  const updates = req.body;

  try {
    // Find the astrologer by ID and update their details
    const updatedAstro = await Astro.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true, fields: "-otp -otpCreatedAt" } // Exclude OTP fields
    );

    if (!updatedAstro) {
      return res.status(404).json({ message: "Astrologer not found" });
    }

    res.json({
      message: "Astrologer details updated successfully",
      updatedAstro,
    });
  } catch (error) {
    console.error("Error updating astrologer details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default astroRoutes;
