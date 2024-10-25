import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
    validateRegisterInput,
    validateLoginInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();
router.route("/register").post(validateRegisterInput, register);
router.route("/login").post(validateLoginInput, login);
router.route("/logout").get(logout);

export default router;
