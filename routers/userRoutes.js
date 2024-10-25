import { Router } from "express";
import {
    getCurrentUser,
    getApplicationStats,
    updateUser,
} from "../controllers/userController.js";

import upload from "../middlewares/multerMiddleware.js";

import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";

import {
    authorizePermission,
    checkForTestUser,
} from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/current-user", getCurrentUser);
router.get(
    "/admin/app-stats",
    authorizePermission("admin"),
    getApplicationStats
);
router.patch(
    "/update-user",
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUserInput,
    updateUser
);

export default router;
