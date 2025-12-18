import { Router } from "express";
import requireAuth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { createTokenSchema } from "../validators/token.validator";
import apiTokensController from "../controllers/token.controller";

const router = Router();

router.use(requireAuth);

router.get("/", apiTokensController.list);
router.get("/:tokenId", apiTokensController.find);
router.post("/", validate(createTokenSchema), apiTokensController.create);
router.post("/:tokenId/revoke", apiTokensController.revoke);
router.delete("/:tokenId", apiTokensController.remove);

export default router;
