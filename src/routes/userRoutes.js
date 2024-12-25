import express from "express";
import UserAuth from "../middleware/userAuth.js";
import Astro from "../models/AstroEntity.js"
import User from "../models/UserEntity.js";
const userRoutes = express.Router();
userRoutes.get("/kundli", (req, res) => {});
userRoutes.get("/match_making", (req, res) => {});
userRoutes.get("/horoscope", (req, res) => {});
userRoutes.get("/my_profile", (req, res) => {
  const dummyProfile = {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    number: "+91 98765 43210",
    gender: "Male",
    address: "New Delhi",
  };

  // Send the dummy profile data as the response
  res.json(dummyProfile);
});

userRoutes.get("/all_astro", async (req, res) => {
    try {
        const getResponse = await Astro.find();
    
        // Check if getResponse is empty
        if (!getResponse || getResponse.length === 0) {
          return res.json({ data: [] });
        }
    
        // Map over the array of astrologers and transform each one
        const transformedResponse = getResponse.map((astro) => ({
          id: astro._id.toString(), // Convert ObjectId to string if necessary
          name: astro.fullName,
          imageUrl: "https://example.com/default-image.jpg", // Set default or get from data
          specialties: astro.specialties.length ? astro.specialties : [], // Default to empty array if no specialties
          languages: astro.languages.length ? astro.languages : [], // Default to empty array if no languages
          experience: parseInt(astro.experience), // Convert experience to number
          pricePerMin: parseInt(astro.pricePerMin) || 10, // Set default price if it's not present
          followers: parseInt(astro.followers) || 0, // Set default followers if it's not present
          isVerified: astro.isVerified,
        }));
    
        // Send the transformed data back as an array
        return res.status(200).json(transformedResponse);
      } catch (error) {
        console.error("Error:", error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
      }
});
userRoutes.get("/single_astro/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Astrologer ID is required" });
    }

    const getResponse = await Astro.findById(id);
    if (!getResponse) {
      return res.status(404).json({ message: "No Astro available by this ID" });
    }
    const transformedResponse = {
      id: getResponse._id,
      name: getResponse.fullName,
      imageUrl: "https://example.com/default-image.jpg", // Set default or get from data
      specialties: getResponse.specialties.length
        ? getResponse.specialties
        : [],
      languages: getResponse.languages.length ? getResponse.languages : [],
      experience: parseInt(getResponse.experience),
      pricePerMin: parseInt(getResponse.pricePerMin),
      followers: parseInt(getResponse.followers),
      isVerified: getResponse.isVerified,
    };

    return res.status(200).json(transformedResponse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// user profile
userRoutes.get("/home_user", (req, res) => {
  const astrologers = [
    {
      id: "1",
      name: "Aacharya AtulRam Shastri",
      image:
        "https://images.pexels.com/photos/29894015/pexels-photo-29894015/free-photo-of-festive-decor-on-classic-red-car-for-holidays.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      pricing: "1/m",
    },
    {
      id: "2",
      name: "Krishan Ojha",
      imageUrl:
        "https://images.pexels.com/photos/14635526/pexels-photo-14635526.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      pricing: "2/m",
    },
    {
      id: "3",
      name: "Aacharya AtulRam Shastri",
      imageUrl:
        "https://images.pexels.com/photos/5370666/pexels-photo-5370666.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
      pricing: "3/m",
    },
  ];

  return res.json(astrologers);
});

//  user profole
userRoutes.get("/user_profile", UserAuth, async (req, res) => {
    const { id } = req.authData; // Accessing the userId attached in the middleware
  
    try {
      // Find astrologer by ID and exclude OTP fields
      const astrologer = await User.findById({ _id: id });
  
      if (!astrologer) {
        return res.status(404).json({ message: "Astrologer not found" });
      }
  
      // Send astrologer details
      res.status(200).json({ success: true, data: astrologer });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }); 

//   update profile

userRoutes.post("/user_update", UserAuth, async (req, res) => {
    const { id } = req.authData;
  
    const updates = req.body;
  
    try {
      // Find the astrologer by ID and update their details
      const updatedAstro = await User.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true, fields: "-otp -otpCreatedAt" } // Exclude OTP fields
      );
  
      if (!updatedAstro) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({
        message: "User details updated successfully",
        updatedAstro,
      });
    } catch (error) {
      console.error("Error updating User details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });



export default userRoutes;
