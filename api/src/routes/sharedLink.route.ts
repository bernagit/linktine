import { Router } from "express";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import sharedLinksController from "../controllers/sharedLink.controller";
import { createSharedLinkSchema } from "../validators/sharedLink.validator";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createSharedLinkSchema), sharedLinksController.create);
router.get("/:token", sharedLinksController.access);

export default router;
