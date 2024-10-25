import { verifyJWT } from "../utils/tokenUtils.js";
import {
    BadRequestError,
    UnathenticatedError,
    UnauthorizedError,
} from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        throw new UnathenticatedError("authentication invalid");
    }

    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === "67170db24a1c16a7cbdd802e";
        // console.log(testUser, userId);

        req.user = { userId, role, testUser };
        next();
    } catch (error) {
        throw new UnathenticatedError("authentication invalid");
    }
};

export const authorizePermission = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("unauthorized to access this route");
        }
        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError("Demo User. Read Only");
    }
    next();
};
