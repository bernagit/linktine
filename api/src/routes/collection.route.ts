import { Router } from "express";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import collectionsController from "../controllers/collection.controller";
import {
    createCollectionSchema,
    getCollectionsQuerySchema,
    updateCollectionSchema,
} from "../validators/collection.validator";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createCollectionSchema), collectionsController.create);
router.get("/", validate(getCollectionsQuerySchema), collectionsController.list);
router.get("/:id", collectionsController.get);
router.put("/:id", validate(updateCollectionSchema), collectionsController.update);
router.delete("/:id", collectionsController.remove);

export default router;
