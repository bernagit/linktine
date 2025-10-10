import { Request, Response } from "express";
import baseService from "../services/base.service";

const getDashboard = async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
        const data = await baseService.getDashboard(userId);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const globalSearch = async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const query = req.query.q as string;

    if (!query) {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
    }

    try {
        const results = await baseService.globalSearch(userId, query);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const baseController = {
    getDashboard,
    globalSearch,
};

export default baseController;
