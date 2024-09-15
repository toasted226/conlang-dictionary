import express, { Router } from "express";
import { getLanguage, getLanguages } from "../controllers/languages";

const router: Router = express.Router();

router.route("/").get(getLanguages);
router.route("/:id").get(getLanguage);

export default router;