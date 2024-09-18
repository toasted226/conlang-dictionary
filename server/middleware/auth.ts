import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.SECRET as string);
        // req.user = user;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(403).json({error: "Invalid credentials"});
    }
};
