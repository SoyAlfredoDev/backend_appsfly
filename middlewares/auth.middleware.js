import jwt from "jsonwebtoken";

import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const authRequired = (req, res, next) => {
    try {
        // Get the Authorization header: "Bearer <token>"
        const authHeader = req.headers.authorization;

        // If no Authorization header is provided
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Extract the token (the part after "Bearer")
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid Authorization format" });
        }

        // Verify the JWT token
        jwt.verify(token, TOKEN_SECRET, (error, decodedUser) => {
            if (error) {
                return res.status(403).json({ message: "Invalid or expired token" });
            }

            // Attach decoded user data to the request
            req.user = decodedUser;

            // Allow the request to continue
            next();
        });

    } catch (err) {
        return res.status(500).json({ message: "Internal authentication error" });
    }
};
