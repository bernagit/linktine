import { Request, Response } from "express";
import sharedLinksService from "../services/sharedLink.service";

const create = async (req: Request, res: Response) => {
    const ownerId = req.user!.id;
    const shared = await sharedLinksService.create({ ...req.body, ownerId });
    res.status(201).json(shared);
};

const access = async (req: Request, res: Response) => {
    const { token } = req.params;
    const shared = await sharedLinksService.access(token);
    if (!shared) return res.status(404).json({ message: "Invalid or expired token" });
    res.json(shared);
};

const sharedLinksController = { create, access };
export default sharedLinksController;
