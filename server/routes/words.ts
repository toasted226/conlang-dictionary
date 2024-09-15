import express, { Router } from "express";
import { getWords } from "../controllers/words";

const router: Router = express.Router();

router.route("/:language").get(getWords);

export default router;