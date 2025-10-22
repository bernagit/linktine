import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { env } from "../config/env";
import crypto from "crypto";

export default async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        // Check for token in Authorization header or cookies
        const cookieToken = req.cookies.auth_token;
        const authHeader = req.headers.authorization;

        let payload = null;
        if (cookieToken) {
            payload = jwt.verify(cookieToken, env.JWT_SECRET) as { id: string; role: string };
        } else if (authHeader?.startsWith("Apikey ")) {
            const apiToken = authHeader.slice(7);
            const hashedToken = crypto.createHash("sha256").update(apiToken).digest("hex");

            const token = await prisma.apiToken.findFirst({
                where: { tokenHash: hashedToken },
                include: { user: true },
            });
            if (token == null) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            await prisma.apiToken.update({
                where: { id: token.id },
                data: {
                    lastUsedAt: new Date(),
                },
            });

            payload = { id: token.user.id, role: token.user.role };
        } else if (authHeader?.startsWith("Bearer ")) {
            payload = jwt.verify(authHeader?.slice(7), env.JWT_SECRET) as {
                id: string;
                role: string;
            };
        } else {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) return res.status(401).json({ message: "Invalid token" });

        req.user = { id: user.id, role: user.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
