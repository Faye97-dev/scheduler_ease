// @ts-nocheck
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { db } from "@/db/client";
import { users } from "@/db/schema";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@/config";
// import * as authService from "@/services/auth.service";


// todo : refactor logic to auth service
export const register = async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db
            .insert(users)
            .values({ email, fullName, password: hashedPassword })
            .returning();
        res.status(201).json({ message: 'User registered successfully', payload: user });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await db.query.users.findFirst({
            where: (users, { eq }) => eq(users.email, email),
        });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ user_id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ payload: { token, user } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
    }
};