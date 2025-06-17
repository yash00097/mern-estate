import {errorHandler} from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(res, 401, 'No token provided'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(res, 403, 'Forbidden'));
        req.user = user;
        next();
    })

} 