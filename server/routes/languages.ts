import express, { Router } from "express";
import { addLanguage, getLanguage, getLanguages } from "../controllers/languages";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/").get(getLanguages).post(auth, addLanguage);
router.route("/:id").get(getLanguage);

export default router;
