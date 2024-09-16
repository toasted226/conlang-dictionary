import { Request, Response } from "express";
import db from "../db/database";

export const getWords = async (req: Request, res: Response) => {
    try {
        const { language } = req.params;
        let search: string | undefined = req.query.search?.toString();

        let query =
            "SELECT * FROM words " +
            "JOIN languages ON languages.language_id = words.language_id " +
            "WHERE words.language_id = $1 ";
        let args: string[] = [language];
        
        if (search) {
            search += "%";
            query += "AND words.word LIKE $2";
            args.push(search);
        }
        
        const result = await db.query(query, args);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).send("Database query failed");
    }
};
