import { Request, Response } from "express";
import db from "../db/database";

export const getWords = async (req: Request, res: Response) => {
    try {
        const { language } = req.params;
        const query = "SELECT * FROM words JOIN languages ON languages.language_id = words.language_id WHERE words.language_id = $1";
        const result = await db.query(query, [language]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }
};

export const searchWords = async (req: Request, res: Response) => {
    try {
        
    } catch (err) {

    }
}