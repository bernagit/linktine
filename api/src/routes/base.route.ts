import { Router } from "express";
import requireAuth from "../middlewares/auth";
import baseController from "../controllers/base.controller";

const router = Router();

router.use(requireAuth);

router.get("/dashboard", baseController.getDashboard);
router.get("/search", baseController.globalSearch);

export default router;
