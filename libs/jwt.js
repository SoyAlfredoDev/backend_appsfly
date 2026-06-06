import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { payload },
            TOKEN_SECRET,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                resolve(token);
            }
        );
    });
}


