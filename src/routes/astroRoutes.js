import express from "express";
import astrologerAuth from "../middleware/astroAuth.js";
import Astro from "../models/AstroEntity.js";
const astroRoutes = express.Router();
// astro profile
astroRoutes.get("/astro_profile", astrologerAuth, async (req, res) => {
  const { id } = req.authData; // Accessing the userId attached in the middleware

  try {
    // Find astrologer by ID and exclude OTP fields
    const astrologer = await Astro.findById({ _id: id });

    if (!astrologer) {
      return res.status(404).json({ message: "Astrologer not found" });
    }

    // Send astrologer details
    res.status(200).json({ success: true, data: astrologer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// astro update
astroRoutes.post("/astro_update", astrologerAuth, async (req, res) => {
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

//   get astro
astroRoutes.get("/astro", async (req, res) => {
  const dummyDashboardData = {
    name: "John Doe",
    astroId: "AST12345",
    profile: "https://example.com/profile.jpg",
    today_chat_time: "00:00",
    today_call_time: "00:00",
    total_chat_time: "000:00",
    total_call_time: "00:00",
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
