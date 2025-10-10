import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { env } from "../config/env";

const setCookie = (res: Response, token: string) => {
    const isProduction = env.NODE_ENV === "production";
    res.cookie("auth_token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: env.JWT_EXPIRES_IN * 1000, // Convert to milliseconds
    });
};

const register = async (req: Request, res: Response) => {
    if (env.DISABLE_SIGNUP === true) {
        return res.status(403).json({ message: "Sign up is disabled" });
    }
    const result = await authService.register(req.body);
    setCookie(res, result.token);
    res.status(201).json(result);
};

const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    setCookie(res, result.token);
    res.json(result);
};

const logout = (req: Request, res: Response) => {
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
    });
    res.json({ message: "Logged out successfully" });
};

const getMe = async (req: Request, res: Response) => {
    const user = await authService.getMe(req.user!.id);
    res.json(user);
};

const updateMe = async (req: Request, res: Response) => {
    const { name, prefs } = req.body;
    const updatedUser = await authService.updateMe(req.user!.id, { name, prefs });
    res.json(updatedUser);
};

const changePwd = async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePwd(req.user!.id, { currentPassword, newPassword });

    res.json(result);
};

export { register, login, logout, getMe, updateMe, changePwd };
