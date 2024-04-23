import { Router } from "express";
import * as AuthController from "@/controllers/auth.controller";
import { validateData } from "@/middleware/validationMiddleware";
import { loginUserSchema, registerUserSchema } from "@/dtos/auth.dto";

const router = Router();

router.post("/register", validateData(registerUserSchema), AuthController.register);
router.post("/login", validateData(loginUserSchema), AuthController.login);

export default router;
