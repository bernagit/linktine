import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    if (err instanceof ZodError) {
        return res.status(400).json({ error: JSON.parse(err.message) });
    }
    if (err.code === "P2002") {
        // prisma unique constraint
        return res.status(409).json({ message: "Conflict", meta: err.meta });
    }
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
}
