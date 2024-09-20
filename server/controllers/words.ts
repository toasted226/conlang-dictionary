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

export const addWord = async (req: Request, res: Response) => {
    try {
        const { language } = req.params;
        const {
            word,
            translation,
            part_of_speech,
            example,
            example_translation,
            phonetic_transcription,
        } = req.body;

        const query =
            "INSERT INTO words (" +
            "language_id, " +
            "word, " +
            "translation, " +
            "part_of_speech, " +
            "example, " +
            "example_translation, " +
            "phonetic_transcription) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7)";
        await db.query(query, [
            language,
            word,
            translation,
            part_of_speech,
            example,
            example_translation,
            phonetic_transcription,
        ]);
        res.status(201).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database update failed");
    }
};

export const updateWord = async (req: Request, res: Response) => {
    try {
        const { language, word_id } = req.params;
        const {
            word,
            translation,
            part_of_speech,
            example,
            example_translation,
            phonetic_transcription,
        } = req.body;

        const query =
            "UPDATE words SET " +
            "word = $1, " +
            "translation = $2, " +
            "part_of_speech = $3, " +
            "example = $4, " +
            "example_translation = $5, " +
            "phonetic_transcription = $6 " +
            "WHERE language_id = $7 AND word_id = $8";
        await db.query(query, [
            word,
            translation,
            part_of_speech,
            example,
            example_translation,
            phonetic_transcription,
            language,
            word_id,
        ]);

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database update failed");
    }
};

export const deleteWord = async (req: Request, res: Response) => {
    try {
        const { language, word_id } = req.params;

        const query =
            "DELETE FROM words WHERE language_id = $1 AND word_id = $2";
        await db.query(query, [language, word_id]);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).send("Database update failed");
    }
};
