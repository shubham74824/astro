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

      shortBio: user.shortBio || "",
      profile:
        "https://images.pexels.com/photos/29879483/pexels-photo-29879483/free-photo-of-festive-christmas-ornament-on-pine-tree-branch.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
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

export default astroRoutes;
