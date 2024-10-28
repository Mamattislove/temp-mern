import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import "express-async-errors";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

import jobRouter from "./routers/jobRoutes.js";
import authRouter from "./routers/authRoutes.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { NotFoundError } from "./errors/customErrors.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";
import userRouter from "./routers/userRoutes.js";
import cors from "cors";
import { getLocalIPAddress } from "./utils/ipAddress.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

if ((process.env.NODE_ENV = "development")) {
    app.use(morgan("dev"));
}

app.get("/api/v1/test", (req, res) => {
    res.json({ msg: "Congrats" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
    throw new NotFoundError("not found");
});

app.use(errorHandlerMiddleware);

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
        console.log(`Listening on PORT: ${process.env.PORT}`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}
