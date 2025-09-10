import { Router } from "express";
import requireAuth from "../middlewares/auth";

const router = Router();

router.use(requireAuth);

router.post("/");

export default router;
