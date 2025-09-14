import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { env } from "../config/env";

export default async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        // Check for token in Authorization header or cookies
        const cookieToken = req.cookies.auth_token;
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ") && !cookieToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = authHeader?.slice(7) || cookieToken;
        const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; role: string };
        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) return res.status(401).json({ message: "Invalid token" });

        req.user = { id: user.id, role: user.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
