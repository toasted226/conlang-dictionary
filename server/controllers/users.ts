import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../db/database";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const retrieved = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    if (retrieved.rowCount !== 1) {
        return res.status(403).json({
            error: `A user with the username of ${username} could not be found`,
        });
    }

    if (await verifyPassword(password, retrieved.rows[0].password)) {
        const token = jwt.sign(
            retrieved.rows[0],
            process.env.SECRET as string,
            { expiresIn: "30d", algorithm: "HS256" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
        });
        return res.status(200).json({ auth: true });
    }

    return res.status(403).json({ error: "The password entered is incorrect" });
};

export const authenticated = (req: Request & { user?: string }, res: Response) => {
    return res.status(200).json({ username: req.user });
};

const hashPassword = async (plainTextPassword: string) => {
    return await bcrypt.hash(plainTextPassword, saltRounds);
};

const verifyPassword = async (
    plainTextPassword: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};
