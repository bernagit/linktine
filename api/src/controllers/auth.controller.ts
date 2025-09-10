import { Request, Response } from "express";
import * as authService from "../services/auth.service";

const register = async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
};

const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
};

export { register, login };
