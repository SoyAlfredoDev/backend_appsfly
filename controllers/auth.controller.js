import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from '../services/usersService.js';
import { createAccessToken } from '../libs/jwt.js';
import validateRut from '../libs/validateRut.js';
import { TOKEN_SECRET } from '../config.js';

import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req, res) => {
    try {
        const {
            userId,
            userFirstName,
            userLastName,
            userEmail,
            userPassword,
            userPasswordConfirmation,
            userCodePhoneNumber,
            userPhoneNumber,
            userDocumentType,
            userDocumentNumber
        } = req.body;

        if (userPassword !== userPasswordConfirmation) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        let rutFormatted;

        if (userDocumentType === 'rut') {
            rutFormatted = validateRut(userDocumentNumber)

        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
        const data = {
            userId,
            userFirstName: userFirstName.trim().toLowerCase(),
            userLastName: userLastName.trim().toLowerCase(),
            userEmail: userEmail.trim().toLowerCase(),
            userPassword: hashedPassword,
            userCodePhoneNumber,
            userPhoneNumber,
            userDocumentType,
            userDocumentNumber: rutFormatted || userDocumentNumber
        };
        const user = await createUser(data);
        const token = await createAccessToken({ id: user.id })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // solo https en prod
            sameSite: "none" // 🔑 necesario para cross-site
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                userId: user.userId,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userEmail: user.userEmail,
                userCodePhoneNumber: user.userCodePhoneNumber,
                userPhoneNumber: user.userPhoneNumber,
                userDocumentType: user.userDocumentType,
                userDocumentNumber: user.userDocumentNumber
            }
        });

    } catch (error) {
        console.error("(auth.controller.js): Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const userEmailFormatted = userEmail.trim().toLowerCase();
        const user = await getUserByEmail(userEmailFormatted);
        if (!user) return res.status(400).json({
            message: 'user not found'
        });
        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) return res.status(400).json({
            message: 'Incorrect username or password'
        });
        const token = await createAccessToken({ id: user.userId });
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax"
        });
        res.status(201).json({
            message: 'User login successfully',
            user: {
                userId: user.userId,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userEmail: user.userEmail,
                userLastConnection: user.userLastConnection,
                userCodePhoneNumber: user.userCodePhoneNumber,
                userPhoneNumber: user.userPhoneNumber,
                userDocumentType: user.userDocumentType,
                userDocumentNumber: user.userDocumentNumber
            }
        });
    } catch (error) {
        console.error("(auth.controller.js): Error logging user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    req.prisma = null
    return res.status(200).json({ message: 'Logout successful' });
};

export const verifyAuthController = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        // Retornar ID para poder cargar datos del usuario
        return res.json({ ok: true, id: decoded.payload.id });
    });
}
