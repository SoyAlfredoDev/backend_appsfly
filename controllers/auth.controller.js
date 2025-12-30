import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from '../services/usersService.js';
import { createAccessToken } from '../libs/jwt.js';
import validateRut from '../libs/validateRut.js';

import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET;

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

        const existingUser = await getUserByEmail(userEmail.trim().toLowerCase());
        if (existingUser) {
            return res.status(400).json({ error: 1, message: "Email already in use" });
        }

        if (userPassword !== userPasswordConfirmation) {
            return res.rr(400).json({ error: 2, message: "Passwords do not match" });
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
        res.status(201).json({
            message: 'User registered successfully',
            token,
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

        res.status(201).json({
            message: 'User login successfully',
            token,
            user: {
                userId: user.userId,
                userFirstName: user.userFirstName,
                userLastName: user.userLastName,
                userEmail: user.userEmail,
                userLastConnection: user.userLastConnection,
                userCodePhoneNumber: user.userCodePhoneNumber,
                userPhoneNumber: user.userPhoneNumber,
                userDocumentType: user.userDocumentType,
                userDocumentNumber: user.userDocumentNumber,
                userConfirmEmail: user.userConfirmEmail
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
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "No token" });

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        // Retornar ID para poder cargar datos del usuario
        return res.json({ ok: true, id: decoded.payload.id });
    });
}

import { sendEmail } from '../services/emailService.js';
import { passwordResetTemplate } from '../emails-models/passwordResetTemplate.js';
import { updateUserPassword } from '../services/usersService.js';

//send email with link for reset password
export const forgotPassword = async (req, res) => {
    try {
        const { userEmail } = req.body;
        const user = await getUserByEmail(userEmail.trim().toLowerCase());

        if (!user) {
            return res.status(200).json({ message: 'If the email exists, a recovery link has been sent.' });
        }

        const token = jwt.sign(
            { id: user.userId, type: 'reset' },
            TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const frontendUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://appsfly.netlify.app';
        const resetUrl = `${frontendUrl}/reset-password/${token}`;

        await sendEmail({
            to: user.userEmail,
            subject: 'Restablece tu contraseña en AppsFly',
            html: passwordResetTemplate(resetUrl),
            text: `Restablece tu contraseña aquí: ${resetUrl}`
        });

        res.json({ message: 'If the email exists, a recovery link has been sent.' });

    } catch (error) {
        console.error("(auth.controller.js): Error in forgotPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        console.log(token, newPassword);

        if (!token || !newPassword) {
            return res.status(400).json({ message: "Token and new password are required" });
        }

        jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid or expired token" });
            }

            if (decoded.type !== 'reset') {
                 return res.status(400).json({ message: "Invalid token type" });
            }

            if (newPassword.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters" });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            await updateUserPassword(decoded.id, hashedPassword);

            res.json({ message: "Password updated successfully" });
        });

    } catch (error) {
        console.error("(auth.controller.js): Error in resetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
