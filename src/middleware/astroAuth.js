import jwt from "jsonwebtoken";

const astrologerAuth = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from header

    if (!token) {
        return res.status(403).json({ message: "Access denied: token missing" });
    }

    const secret = "123abc$%4d9Ef!@#hijKL6789MN0pQRstuvWXYZ"; // Secret key

    try {
        // Verifying the token and decoding it
        const decoded = jwt.verify(token, secret);

        // Ensure the 'id' exists in the decoded payload
        if (!decoded.id) {
            return res.status(400).json({ message: "id is missing in token" });
        }

        // Attach id to req.authData
        req.authData = { id: decoded.id };



        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Token verification error:", error.message); // Log the error message
        return res
            .status(401)
            .json({ message: "Invalid token", error: error.message });
    }
};

export default astrologerAuth;