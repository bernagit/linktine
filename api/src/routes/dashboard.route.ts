import { Router } from "express";
import requireAuth from "../middlewares/auth";
import dashboardController from "../controllers/dashboard.controller";

const router = Router();

router.use(requireAuth);

router.get("/", dashboardController.getDashboard);

export default router;
