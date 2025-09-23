import { Request, Response } from "express";
import collectionsService from "../services/collection.service";

const create = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const collection = await collectionsService.create({ ...req.body, userId });
    res.status(201).json(collection);
};

const get = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;
    
    const collection = await collectionsService.read(id, userId);
    if (!collection) return res.status(404).json({ message: "Collection not found" });
    res.json(collection);
}

const list = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { q, parentId, page = "1", limit = "20" } = req.query;

    const pagination = {
        page: Math.max(1, parseInt(page as string, 10)),
        limit: Math.min(100, parseInt(limit as string, 10)),
    };

    const filters = { q, parentId };
    const result = await collectionsService.list(userId, filters, pagination);

    res.json(result);
};

const update = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const collection = await collectionsService.read(id, userId);
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    const updated = await collectionsService.update({
        id,
        userId,
        data: req.body,
    });

    res.json(updated);
};

const remove = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id } = req.params;

    const collection = await collectionsService.read(id, userId);
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    await collectionsService.remove(id, userId);
    res.status(204).send();
};

const collectionsController = {
    create,
    list,
    get,
    update,
    remove,
};

export default collectionsController;
