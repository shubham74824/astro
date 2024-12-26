import express from 'express';
import User from "./src/models/UserEntity.js"
import Astro from "./src/models/AstroEntity.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import router from "./src/routes/commonRoutes.js";
import astroRoutes from "./src/routes/astroRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
const app = express(); // Initialize Express app

app.get('/', (req, res) => {
    res.send('Hello, World!'); // Respond with a simple message
});

const port = process.env.PORT || 3000;

app.use(express.json())
app.use(astroRoutes)
app.use(router);
app.use(userRoutes)
app.use(authRoutes);

mongoose.connect('mongodb://localhost:27017/astro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(r => console.log("DB CONNECTED"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log the server URL
});
