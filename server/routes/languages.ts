import express, { Router } from "express";
import {
    addLanguage,
    deleteLanguage,
    getLanguage,
    getLanguages,
    updateLanguage,
} from "../controllers/languages";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/").get(getLanguages).post(auth, addLanguage);
router
    .route("/:id")
    .get(getLanguage)
    .put(auth, updateLanguage)
    .delete(auth, deleteLanguage);

export default router;
