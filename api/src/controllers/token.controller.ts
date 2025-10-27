import { Request, Response } from "express";
import apiTokenService from "../services/token.service";

const list = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const tokens = await apiTokenService.list(userId);

    res.status(200).json(tokens);
};

const find = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { tokenId } = req.params;

    const token = await apiTokenService.find(tokenId);
    if (token?.userId !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (token == null) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(token);
};

const create = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const token = await apiTokenService.create(userId, req.body);

    res.status(201).json(token);
};

const revoke = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { tokenId } = req.params;

    const token = await apiTokenService.find(tokenId);
    if (token?.userId !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (token == null) {
        return res.status(404).json({ message: "Not found" });
    }

    const newToken = await apiTokenService.revoke(tokenId);
    res.status(200).json(newToken);
};

const remove = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { tokenId } = req.params;

    const token = await apiTokenService.find(tokenId);
    if (token?.userId !== userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (token == null) {
        return res.status(404).json({ message: "Not found" });
    }

    await apiTokenService.remove(tokenId);
    res.status(200).json({ message: 'Ok' });
};

const apiTokensController = {
    list,
    find,
    create,
    revoke,
    remove,
};

export default apiTokensController;
