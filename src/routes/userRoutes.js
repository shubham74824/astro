import express from "express";
import axios from "axios";
import Astro from "../models/AstroEntity.js";
import User from "../models/UserEntity.js";
import UserAuth from "../middleware/userAuth.js";
const userRoutes = express.Router();

userRoutes.post("/daily_horoscope_Data", async (req, res) => {
  try {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are zero-based
    const year = now.getFullYear();
    const hour = now.getHours();
    const min = now.getMinutes();

    // Fixed latitude, longitude, and timezone
    const lat = 25.7464; // Latitude for Varanasi, India
    const lon = 82.6837; // Longitude for Varanasi, India
    const tzone = 5.5; // IST (UTC+5:30)
    const planetColor = "#ff0000";
    const signColor = "#00ff00";
    const lineColor = "#0000ff";
    const chartType = "north";

    // Construct the request body for the Astrology API
    const requestBody1 = {
      day,
      month,
      year,
      hour,
      min,
      lat,
      lon,
      tzone,
    };

    const requestBody2 = {
      day,
      month,
      year,
      hour,
      min,
      lat,
      lon,
      tzone,
      planetColor,
      signColor,
      lineColor,
      chartType,
    };

    // Astrology API credentials
    const apiUsername = "635294";
    const apiPassword = "034da42232b5b34a57b7e6e27e031473622744d4";

    // Encode credentials for Basic Auth
    const auth = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
      "base64"
    );

    // Define the URLs for the two API endpoints
    const url2 = "https://json.astrologyapi.com/v1/horo_chart_image/D1";
    const url1 = "https://json.astrologyapi.com/v1/horo_chart/D1";

    // Create an array of promises for the two POST requests
    const requests = [
      axios.post(url1, requestBody1, {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }),
      axios.post(url2, requestBody2, {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }),
    ];

    // Wait for both requests to complete
    const [response1, response2] = await Promise.all(requests);

    // Process the responses as needed
    const horoscopeData = response2.data.svg; // Assuming the second response contains the horoscope data

    const cleanedSvgString = horoscopeData.replace(/\\"/g, "");

    // Create the data structure as per the given format
    const result = response1.data.map((item) => {
      return {
        tabName: item.sign_name,
        description: {
          planet: item.planet || [],
          planet_small: item.planet_small || [],
          planet_degree: item.planet_degree || [],
          horoscope_image: cleanedSvgString, // Assuming the first response contains the horoscope image
        },
      };
    });

    // Respond with the data in the required format
    res.json(result);
  } catch (error) {
    console.error("Error fetching horoscope data:", error);
    res.status(500).json({ message: "Failed to retrieve horoscope data" });
  }
});

userRoutes.post("/match_making", async (req, res) => {
  try {
    const { maleName, maleDOB, malePlace, femaleName, femaleDOB, femalePlace } =
      req.body;

    // Validate inputs
    if (
      !maleName ||
      !maleDOB ||
      !malePlace ||
      !femaleName ||
      !femaleDOB ||
      !femalePlace
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert DOB and Place into the format expected by the Astrology API
    const maleLatLon = await getLatLong(malePlace);
    const femaleLatLon = await getLatLong(femalePlace);

    const requestBody = {
      m_day: maleDOB.day,
      m_month: maleDOB.month,
      m_year: maleDOB.year,
      m_hour: maleDOB.hour,
      m_min: maleDOB.min,
      m_lat: maleLatLon.lat,
      m_lon: maleLatLon.lng,
      m_tzone: 5.5, // Adjust as needed
      f_day: femaleDOB.day,
      f_month: femaleDOB.month,
      f_year: femaleDOB.year,
      f_hour: femaleDOB.hour,
      f_min: femaleDOB.min,
      f_lat: femaleLatLon.lat,
      f_lon: femaleLatLon.lng,
      f_tzone: 5.5, // Adjust as needed
    };

    const apiUsername = "635294";
    const apiPassword = "034da42232b5b34a57b7e6e27e031473622744d4";
    const auth = Buffer.from(`${apiUsername}:${apiPassword}`).toString(
      "base64"
    );

    // Call the Astrology API
    const response = await axios.post(
      "https://json.astrologyapi.com/v1/match_ashtakoot_points",
      requestBody,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    const horoscopeData = response.data;

    // Assuming response.data has the required data as described earlier
    if (!response.data) {
      return res
        .status(500)
        .json({ message: "Invalid response from external API" });
    }

    // Ensure total points data exists
    if (!horoscopeData.total) {
      return res
        .status(500)
        .json({ message: "Missing 'total' data in the response" });
    }

    function transformResponse(data) {
      const details = [
        "varna",
        "vashya",
        "tara",
        "yoni",
        "maitri",
        "gan",
        "bhakut",
        "nadi",
      ].map((key) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the first letter
        total_points: data[key].total_points,
        received_points: data[key].received_points,
      }));

      return [
        {
          title: "Details",
          desc: details,
        },
        ...details.map((detail) => ({
          title: detail.title,
          desc: data[detail.title.toLowerCase()].description,
        })),
        {
          title: "Result",
          desc: `The match has scored ${data.total.received_points} points out of ${data.total.total_points} points.`,
        },
        {
          title: "Conclusion",
          desc: data.conclusion.report,
        },
      ];
    }

    const formattedResponse = transformResponse(horoscopeData);

    res.json(formattedResponse);
  } catch (error) {
    // Handle errors and send a response
    console.error("Error fetching data from external API", error);
    res.status(500).json({
      message: "An error occurred while fetching data",
      error: error.message,
    });
  }
});

userRoutes.get("/horoscope", (req, res) => {});

userRoutes.get("/my_profile", UserAuth, async (req, res) => {
  const { id } = req.authData; // Accessing the userId attached in the middleware

  try {
    // Find astrologer by ID and exclude OTP fields
    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = {
      id: user._id,
      name: user.name || "",
      email: user.email || "",
      number: user.number,
      gender: user.gender || "",
      address: user.address || "",
    };

    return res.json(userProfile);

    // Send astrologer details
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRoutes.patch("/update_profile", UserAuth, async (req, res) => {
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
      updatedAstro,
    });
  } catch (error) {
    console.error("Error updating User details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
    const getResponse = await Astro.find();

    // Check if getResponse is empty
    if (!getResponse || getResponse.length === 0) {
      return res.json({ data: [] });
    }

    // Map over the array of astrologers and transform each one
    const transformedResponse = getResponse.map((astro) => ({
      id: astro._id.toString(), // Convert ObjectId to string if necessary
      name: astro.fullName,
      imageUrl:
        "https://i.ibb.co/y6WmwWX/Whats-App-Image-2024-12-26-at-22-58-30-38f19b5f.jpg", // Set default or get from data
      specialties: astro.specialties.length ? astro.specialties : [], // Default to empty array if no specialties
      languages: astro.languages.length ? astro.languages : [], // Default to empty array if no languages
      experience: parseInt(astro.experience) || 0, // Convert experience to number
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

  // return res.json(astrologers);
});

   // const astrologerProfile = {
    //     name: 'Aacharya AtulRam Shastri',
    //     expertise: 'Vedic Astrology, Vaastu, Numerology',
    //     ratePerMinute: '10',
    //     experience: '7 years',
    //     rating: '4.5',
    //     consultations: '200+',
    //     thoughts: 'I believe astrology is a way to understand the cosmic forces and find the right direction in life.',
    //     aboutMe: 'I am a Vedic astrologer with over 7 years of experience, dedicated to providing insights through astrology.',
    //     imageUrl: 'https://example.com/astrologer-image.jpg', // Replace with a real image URL
    // };


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
      image_url:
        "https://i.ibb.co/y6WmwWX/Whats-App-Image-2024-12-26-at-22-58-30-38f19b5f.jpg", // Set default or get from data
      expertise: getResponse.specialties.length
        ? getResponse.specialties
        : [],
      
      experience: getResponse.experience || "",
      rate_per_minute: getResponse.pricePerMin || "",
      consultations:"0",
      rating:"4.2",
      thoughts:"good astrologer",
      about_me:getResponse.shortBio,
    
    };
    

    return res.status(200).json(transformedResponse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// userRoutes.get("/single_astro/:id", async (req, res) => {
//   // const astrologerProfile = {
//   //     name: 'Aacharya AtulRam Shastri',
//   //     expertise: 'Vedic Astrology, Vaastu, Numerology',
//   //     ratePerMinute: '10',
//   //     experience: '7 years',
//   //     rating: '4.5',
//   //     consultations: '200+',
//   //     thoughts: 'I believe astrology is a way to understand the cosmic forces and find the right direction in life.',
//   //     aboutMe: 'I am a Vedic astrologer with over 7 years of experience, dedicated to providing insights through astrology.',
//   //     imageUrl: 'https://example.com/astrologer-image.jpg', // Replace with a real image URL
//   // };
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ message: "Astrologer ID is required" });
//     }

//     const getResponse = await Astro.findById({_id:id});
//     if (!getResponse) {
//       return res.status(404).json({ message: "No Astro available by this ID" });
//     }
//     const transformedResponse = {
//       id: getResponse._id,
//       name: getResponse.fullName,
//       imageUrl: "https://i.ibb.co/y6WmwWX/Whats-App-Image-2024-12-26-at-22-58-30-38f19b5f.jpg", // Set default or get from data
//       specialties: getResponse.specialties.length
//         ? getResponse.specialties
//         : [],
//       languages: getResponse.languages.length ? getResponse.languages : [],
//       experience: astro.experience || 0,
//       pricePerMin: parseInt(getResponse.pricePerMin) || 0,
//       followers: parseInt(getResponse.followers) || 0,
//       isVerified: getResponse.isVerified,
//     };

//     return res.status(200).json(transformedResponse);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
//   // return res.json(astrologerProfile);
// });
userRoutes.get("/home_user", async (req, res) => {
  const astrologer = await Astro.find();
  if (!astrologer) {
    return res.json([]);
  }
  const getResposne = astrologer.map((value) => {
    return {
      id: value._id,
      name: value.fullName,
      price: value.pricePerMin?.toString() || "",
      image:
        "https://i.ibb.co/y6WmwWX/Whats-App-Image-2024-12-26-at-22-58-30-38f19b5f.jpg",
    };
  });
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

  return res.json(getResposne);
});

async function getHoroscopeDetails(lat, lng, dob, tob) {
  const apiKey = "894a22ed-12b6-564d-a204-562194a13ab9"; // Replace with your API key for VedicAstroAPI
  const tz = "5.5"; // Replace with the user's timezone
  const lang = "en"; // Language of response

  const url = `https://api.vedicastroapi.com/v3-json/horoscope/planet-details?dob=${dob}&tob=${tob}&lat=${lat}&lon=${lng}&tz=${tz}&api_key=${apiKey}&lang=${lang}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Vedic Astrology API request failed: ${error.message}`);
  }
}

async function getLatLong(address) {
  const apiKey = "1910725eac824c56a5954075170fc2c8"; // Replace with your OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.results.length > 0) {
      const lat = response.data.results[0].geometry.lat;
      const lng = response.data.results[0].geometry.lng;
      return { lat, lng };
    } else {
      throw new Error("Geocoding failed: No results found");
    }
  } catch (error) {
    throw new Error(`Geocoding API request failed: ${error.message}`);
  }
}

async function getLatLon(address) {
  const apiKey = "1910725eac824c56a5954075170fc2c8"; // Replace with your OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);

    // Check if results exist
    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      const lat = result.geometry.lat;
      const lon = result.geometry.lng; // Use `.lng` for longitude

      console.log("Extracted Latitude:", lat, "Longitude:", lon); // Debug logs
      return { lat, lon }; // Return both lat and lon
    } else {
      throw new Error("Geocoding failed: No results found");
    }
  } catch (error) {
    console.error(`Geocoding API request failed: ${error.message}`);
    throw new Error(`Geocoding API request failed: ${error.message}`);
  }
}

async function fetchAstrologyData(endpoint, requestBody) {
  const apiUsername = "635294"; // Your API Username
  const apiPassword = "034da42232b5b34a57b7e6e27e031473622744d4"; // Your API Password
  var language = "hi";
  // Combine username and password for Basic Authentication
  const auth = Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64");

  // Base URL for the API
  const API_BASE_URL = "https://json.astrologyapi.com/v1";

  try {
    // Make the API request
    const response = await axios.post(
      `${API_BASE_URL}/${endpoint}`,
      requestBody,
      {
        headers: {
          Authorization: `Basic ${auth}`, // Authentication header
          "Content-Type": "application/json", // JSON Content-Type header
          "Accept-Language": language,
        },
      }
    );

    // Return the response data
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error(
      `Error fetching data from ${endpoint}:`,
      error.response?.data || error.message
    );

    // Return a simple error message
    return { error: `Failed to fetch data from ${endpoint}` };
  }
}

userRoutes.post("/kundali", async (req, res) => {
  const { address, datetime } = req.body;

  if (!address || !datetime) {
    return res
      .status(400)
      .json({ error: "Missing required parameters in request body." });
  }

  const tzone = 5.5; // Fixed timezone value

  try {
    // Parse datetime into components (day, month, year, hour, min)
    const dateObject = new Date(datetime);

    if (isNaN(dateObject.getTime())) {
      return res.status(400).json({ error: "Invalid datetime format." });
    }

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // JavaScript months are zero-indexed
    const year = dateObject.getFullYear();
    const hour = dateObject.getHours();
    const min = dateObject.getMinutes();

    // Get lat-long from the address
    const { lat, lon } = await getLatLon(address); // Ensure both are fetched
    if (!lat || !lon) {
      throw new Error("Failed to fetch latitude and longitude.");
    }

    console.log("Latitude:", lat, "Longitude:", lon);

    // Construct the request body for API calls
    const requestBody = { day, month, year, hour, min, lat, lon, tzone };

    // Fetch data from all APIs
    const [birthDetails, astroDetails, ayanamsha, manglik] = await Promise.all([
      fetchAstrologyData("birth_details", requestBody),
      fetchAstrologyData("astro_details", requestBody),
      fetchAstrologyData("ayanamsha", requestBody),

      fetchAstrologyData("manglik", requestBody),
    ]);

    const formattedAyanamsha = Object.keys(ayanamsha).map((key) => ({
      ayanamsha,
    }));

    // const response = {
    //   title: "birth details",

    //   description: {
    //     year: birthDetails.year,
    //     month: birthDetails.month,
    //     day: birthDetails.day,
    //     hour: birthDetails.hour,
    //     minute: birthDetails.minute,
    //     latitude: lat,
    //     longitude: lon,
    //     timezone: tzone,
    //     seconds: birthDetails.seconds || 0,
    //     ayanamsha: birthDetails.ayanamsha,
    //     sunrise: birthDetails.sunrise,
    //     sunset: birthDetails.sunset,
    //   },
    //   title: "astroDetails",

    //   description: {
    //     ascendant: astroDetails.ascendant,
    //     ascendant_lord: astroDetails.ascendant_lord,
    //     varna: astroDetails.varna,
    //     vashya: astroDetails.vashya,
    //     yoni: astroDetails.yoni,
    //     gan: astroDetails.gan,
    //     nadi: astroDetails.nadi,
    //     signLord: astroDetails.signLord,
    //     sign: astroDetails.sign,
    //     nakshatra: astroDetails.nakshatra,
    //     nakshatraLord: astroDetails.nakshatraLord,
    //     charan: astroDetails.charan,
    //     yog: astroDetails.yog,
    //     karan: astroDetails.karan,
    //     tithi: astroDetails.tithi,
    //     yunja: astroDetails.yunja,
    //     tatva: astroDetails.tatva,
    //     nameAlphabet: astroDetails.nameAlphabet,
    //     paya: astroDetails.paya,
    //   },

    //   title: "ayanamsha",
    //   description: ayanamsha,

    //   title: "manglik",
    //   description: {
    //     manglik_present_rule: {
    //       based_on_aspect: manglik.based_on_aspect || [],
    //       based_on_house: manglik.based_on_house || [],
    //     },
    //     manglik_cancel_rule: [],
    //     is_mars_manglik_cancelled: manglik.is_mars_manglik_cancelled,
    //     manglik_status: manglik.manglik_status,
    //     percentage_manglik_present: manglik.percentage_manglik_present,
    //     percentage_manglik_after_cancellation:
    //       manglik.percentage_manglik_present,
    //     manglik_report: manglik.manglik_report,
    //     is_present: manglik.is_present,
    //   },
    // };

    const response = {
      birthDetails: {
        title: "Birth Details",
        description: {
          year: birthDetails.year,
          month: birthDetails.month,
          day: birthDetails.day,
          hour: birthDetails.hour,
          minute: birthDetails.minute,
          latitude: lat,
          longitude: lon,
          timezone: tzone,
          seconds: birthDetails.seconds || 0,
          ayanamsha: birthDetails.ayanamsha,
          sunrise: birthDetails.sunrise,
          sunset: birthDetails.sunset,
        },
      },
      astroDetails: {
        title: "Astro Details",
        description: {
          ascendant: astroDetails.ascendant,
          ascendant_lord: astroDetails.ascendant_lord,
          varna: astroDetails.varna,
          vashya: astroDetails.vashya,
          yoni: astroDetails.yoni,
          gan: astroDetails.gan,
          nadi: astroDetails.nadi,
          signLord: astroDetails.signLord,
          sign: astroDetails.sign,
          nakshatra: astroDetails.nakshatra,
          nakshatraLord: astroDetails.nakshatraLord,
          charan: astroDetails.charan,
          yog: astroDetails.yog,
          karan: astroDetails.karan,
          tithi: astroDetails.tithi,
          yunja: astroDetails.yunja,
          tatva: astroDetails.tatva,
          nameAlphabet: astroDetails.nameAlphabet,
          paya: astroDetails.paya,
        },
      },
      ayanamsha: {
        title: "Ayanamsha",
        description: ayanamsha,
      },
      manglik: {
        title: "Manglik Details",
        description: {
          manglik_present_rule: {
            based_on_aspect: manglik.based_on_aspect || [],
            based_on_house: manglik.based_on_house || [],
          },
          manglik_cancel_rule: [],
          is_mars_manglik_cancelled: manglik.is_mars_manglik_cancelled,
          manglik_status: manglik.manglik_status,
          percentage_manglik_present: manglik.percentage_manglik_present,
          percentage_manglik_after_cancellation:
            manglik.percentage_manglik_present,
          manglik_report: manglik.manglik_report,
          is_present: manglik.is_present,
        },
      },
    };

    return res.json(response);

    return res.json(response);
  } catch (error) {
    console.error("Error in /kundali route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRoutes;
