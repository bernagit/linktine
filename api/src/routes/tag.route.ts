import { Router } from "express";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import tagsController from "../controllers/tag.controller";
import { createTagSchema, updateTagSchema } from "../validators/tag.validator";

const router = Router();

router.use(requireAuth);

router.post("/", validate(createTagSchema), tagsController.create);
router.get("/", tagsController.list);
router.put("/:id", validate(updateTagSchema), tagsController.update);
router.delete("/:id", tagsController.remove);
router.get("/suggestions", tagsController.getSuggestions);

export default router;
