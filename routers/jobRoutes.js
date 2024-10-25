import { Router } from "express";

import {
    createJob,
    getAllJobs,
    getJob,
    updateJob,
    deletejob,
    showStats,
} from "../controllers/jobController.js";

import {
    validateJobInput,
    validateIdParam,
} from "../middlewares/validationMiddleware.js";

import { checkForTestUser } from "../middlewares/authMiddleware.js";

const router = Router();

router
    .route("/")
    .get(getAllJobs)
    .post(validateJobInput, checkForTestUser, createJob);
router.get("/stats", showStats);
router
    .route("/:id")
    .get(validateIdParam, getJob)
    .patch(validateIdParam, validateJobInput, checkForTestUser, updateJob)
    .delete(validateIdParam, checkForTestUser, deletejob);

export default router;
