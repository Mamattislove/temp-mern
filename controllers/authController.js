import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";

import { hashedPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnathenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    req.body.password = await hashedPassword(req.body.password);
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        throw new UnathenticatedError("invalid credentials");
    }
    const isPasswordCorrect = await comparePassword(
        req.body.password,
        user.password
    );
    if (!isPasswordCorrect) {
        throw new UnathenticatedError("invalid credentials");
    }
    const token = createJWT({
        userId: user._id,
        role: user.role,
    });
    // console.log(token);

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.CREATED).json({ msg: "user logged in" });
};

export const logout = (req, res) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
