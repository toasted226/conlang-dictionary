import { Request, Response } from "express";
import db from "../db/database";

export const getLanguages = async (req: Request, res: Response) => {
    try {
        const result = await db.query("SELECT * FROM languages");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }
};

export const getLanguage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await db.query("SELECT * FROM languages WHERE language_id = $1", [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }
};
