import { Request, Response } from "express";
import tagsService from "../services/tag.service";

const create = async (req: Request, res: Response) => {
    const tag = await tagsService.create(req.body);
    res.status(201).json(tag);
};

const list = async (req: Request, res: Response) => {
    const tags = await tagsService.list();
    res.json(tags);
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tag = await tagsService.update(id, req.body);
    res.json(tag);
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    await tagsService.remove(id);
    res.status(204).send();
};

const tagsController = { create, list, update, remove };
export default tagsController;
