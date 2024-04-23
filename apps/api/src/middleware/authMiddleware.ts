import { JWT_SECRET } from "@/config";
import { Request, Response, NextFunction } from "express";

import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { user_id: string };
        req.query["user_id"] = decoded?.user_id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
