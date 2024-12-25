import express from "express";


const astroRoutes = express.Router();
astroRoutes.get("/astro_profile",(req, res) => {
    
    const astrologerData = {
        fullName: "John Doe",
        number: "+1234567890",
        gender: "Male",
        email: "john.doe@example.com",
        experience: "5 years",
        city: "New York",
        shortBio: "Experienced astrologer specializing in horoscope and birth chart readings.",
        id: "astro123",
        profile: "https://images.pexels.com/photos/29879483/pexels-photo-29879483/free-photo-of-festive-christmas-ornament-on-pine-tree-branch.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" // Image URL
    };
    return res.json(astrologerData);
});
astroRoutes.get("/astro",(req, res) => {
    const dummyDashboardData = {
        name: "John Doe",
        astroId: "AST12345",
        profile: "https://example.com/profile.jpg",
        today_chat_time: "2 hours",
        today_call_time: "1 hour",
        total_chat_time: "50 hours",
        total_call_time: "25 hours",
        id: "1"
    };
    return res.json(dummyDashboardData);
});
astroRoutes.get("/call_astro",(req, res) => {
    const dummyCallData = [
        {
            name: "Alice",
            type: "Incoming",
            totalTime: "30 min",
            id: "1"
        },
        {
            name: "Bob",
            type: "Outgoing",
            totalTime: "15 min",
            id: "2"
        }
    ];
    return res.json(dummyCallData);
});
astroRoutes.get("/chat_astro",(req, res) => {
    const dummyChatData = [
        {
            name: "Charlie",
            lastMessage: "Hello, can you help me?",
            time: "10:30 AM",
            totalTime: "20 min",
            id: "1"
        },
        {
            name: "David",
            lastMessage: "Looking forward to our session",
            time: "9:00 AM",
            totalTime: "30 min",
            id: "2"
        }
    ];
    return res.json(dummyChatData);
});


export default astroRoutes;