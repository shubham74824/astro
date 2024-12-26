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
      _id: user._id,
      name: user.fullName || "",
      email: user.email || "",
      number: user.number,
      gender: user.gender || "",
      city: user.city || "",
      address: user.address || "",
      shortBio: user.shortBio || "",
      specialties: user.specialties || "",
      languages: user.languages || "",
    };

    // Send astrologer details
    res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
astroRoutes.get("/astro", (req, res) => {
  const dummyDashboardData = {
    name: "John Doe",
    astroId: "AST12345",
    profile: "https://example.com/profile.jpg",
    today_chat_time: "2 hours",
    today_call_time: "1 hour",
    total_chat_time: "50 hours",
    total_call_time: "25 hours",
    id: "1",
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

export default astroRoutes;
