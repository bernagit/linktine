import { Router } from "express";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import sharedCollectionsController from "../controllers/sharedCollection.controller";
import { createSharedCollectionSchema } from "../validators/sharedCollection.validator";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createSharedCollectionSchema), sharedCollectionsController.create);
router.get("/:token", sharedCollectionsController.access);

export default router;
