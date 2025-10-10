import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import validate from "../middlewares/validate";
import {
    changePwdSchema,
    loginSchema,
    registerSchema,
    updateSchema,
} from "../validators/auth.validator";
import requireAuth from "../middlewares/auth";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", requireAuth, authController.getMe);
router.patch("/me", requireAuth, validate(updateSchema), authController.updateMe);
router.patch("/change-password", requireAuth, validate(changePwdSchema), authController.changePwd);

export default router;
