import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = (req: Request & { user?: string }, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        const user = jwt.verify(token, process.env.SECRET as string) as JwtPayload;
        const { username } = user;
        req.user = username;
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(403).json({authenticated: false});
    }
};
