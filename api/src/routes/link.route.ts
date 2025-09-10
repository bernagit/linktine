import { Router } from "express";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import linksController from "../controllers/link.controller";
import {
    createLinkSchema,
    getLinksQuerySchema,
    updateLinkSchema,
} from "../validators/link.validator";
const router = Router();

router.use(requireAuth);

router.post("/", validate(createLinkSchema), linksController.create);
router.get("/", validate(getLinksQuerySchema), linksController.list);
router.put("/:id", validate(updateLinkSchema), linksController.update);
router.delete("/:id", linksController.remove);

export default router;
