import express from "express";
import UserAuth from "../models/UserEntity.js";
import Astro from "../models/AstroEntity.js";
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
  // const astrologers = [
  //     {
  //         id: '1',
  //         name: 'Aacharya AtulRam Shastri',
  //         imageUrl: 'https://images.pexels.com/photos/29894015/pexels-photo-29894015/free-photo-of-festive-decor-on-classic-red-car-for-holidays.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
  //         specialties: ['Vedic Astrology', 'Vaastu'],
  //         languages: ['Hindi'],
  //         experience: 7,
  //         pricePerMin: 10,
  //         followers: 1500,
  //         isVerified: true,
  //     },
  //     {
  //         id: '2',
  //         name: 'Krishan Ojha',
  //         imageUrl: 'https://images.pexels.com/photos/14635526/pexels-photo-14635526.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
  //         specialties: ['Vedic Astrology', 'Nadi Astrology', 'Numerology'],
  //         languages: ['Hindi'],
  //         experience: 29,
  //         pricePerMin: 20,
  //         followers: 2500,
  //         isVerified: true,
  //     },
  //     {
  //         id: '3',
  //         name: 'Aacharya AtulRam Shastri',
  //         imageUrl: 'https://images.pexels.com/photos/5370666/pexels-photo-5370666.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
  //         specialties: ['Vedic Astrology', 'Vaastu'],
  //         languages: ['Hindi'],
  //         experience: 7,
  //         pricePerMin: 10,
  //         followers: 1500,
  //         isVerified: true,
  //     },
  // ];

  try {
    const getAllAstro = await Astro.find();
    if (!getAllAstro) {
      return res.json({ data: [] });
    }
    return res.status(200).json(getAllAstro);
  } catch (error) {
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

    return res.status(200).json(getResponse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

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

export default userRoutes;
