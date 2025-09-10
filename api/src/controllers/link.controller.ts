import { Request, Response } from "express";
import linksService from "../services/link.service";

const create = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const link = await linksService.create({ ...req.body, userId });
    res.status(201).json(link);
};

const list = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { q, tag, collectionId, read, archived, page = "1", limit = "20" } = req.query;

    const pagination = {
        page: Math.max(1, parseInt(page as string, 10)),
        limit: Math.min(100, parseInt(limit as string, 10)),
    };

    const filters = { q, tag, collectionId, read, archived };
    const result = await linksService.list(userId, filters, pagination);

    res.json(result);
};

const update = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    // check if link exists and belongs to user
    const link = await linksService.read(id, userId);
    if (!link) return res.status(404).json({ message: "Link not found" });

    const updatedLink = await linksService.update({
        id,
        userId,
        data: req.body,
    });

    res.json(updatedLink);
};

const remove = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    // check if link exists and belongs to user
    const link = await linksService.read(id, userId);
    if (!link) return res.status(404).json({ message: "Link not found" });

    await linksService.remove(id, userId);
    res.status(204).send();
};

const linksController = {
    create,
    list,
    update,
    remove,
};

export default linksController;
