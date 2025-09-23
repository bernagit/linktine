import { Request, Response } from "express";
import dashboardService from "../services/dashboard.service";

const getDashboard = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  try {
    const data = await dashboardService.getDashboard(userId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const dashboardController = {
  getDashboard,
};

export default dashboardController;
