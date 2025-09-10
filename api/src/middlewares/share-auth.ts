import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

export async function resolveShareToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { token } = req.params;

        // Try SharedLink first
        let sharedLink = await prisma.sharedLink.findUnique({
            where: { token },
            include: { link: true, owner: true },
        });

        if (sharedLink) {
            if (sharedLink.expiresAt && sharedLink.expiresAt < new Date()) {
                return res.status(410).json({
                    data: null,
                    error: { message: "Share expired", code: "EXPIRED" },
                });
            }

            (req as any).shared = {
                type: "link",
                entity: sharedLink.link,
                share: sharedLink,
            };
            return next();
        }

        // Try SharedCollection if no link
        let sharedCollection = await prisma.sharedCollection.findUnique({
            where: { token },
            include: { collection: true, owner: true },
        });

        if (sharedCollection) {
            if (sharedCollection.expiresAt && sharedCollection.expiresAt < new Date()) {
                return res.status(410).json({
                    data: null,
                    error: { message: "Share expired", code: "EXPIRED" },
                });
            }

            (req as any).shared = {
                type: "collection",
                entity: sharedCollection.collection,
                share: sharedCollection,
            };
            return next();
        }

        // Not found in either table
        return res.status(404).json({
            data: null,
            error: { message: "Share not found", code: "NOT_FOUND" },
        });
    } catch (err) {
        next(err);
    }
}
