import { Request, Response } from "express";
import db from "../db/database";

export const getLanguages = async (req: Request, res: Response) => {
    try {
        const result = await db.query("SELECT * FROM languages ORDER BY name ASC");
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database query failed" });
    }
};

export const getLanguage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await db.query("SELECT * FROM languages WHERE language_id = $1", [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database query failed" });
    }
};

export const addLanguage = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        await db.query("INSERT INTO languages (name) VALUES ($1)", [name]);
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database update failed" });
    }
}

export const updateLanguage = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        await db.query("UPDATE languages SET name = $1 WHERE language_id = $2", [name, id]);
        res.status(200).json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database update failed" });
    }
}

export const deleteLanguage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await db.query("DELETE FROM languages WHERE language_id = $1", [id]);
        res.status(200).json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Database update failed" });
    }
}
