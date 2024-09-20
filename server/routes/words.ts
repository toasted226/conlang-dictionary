import express, { Router } from "express";
import { addWord, deleteWord, getWords, updateWord } from "../controllers/words";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/:language").get(getWords).post(auth, addWord);
router.route("/:language/:word_id").put(auth, updateWord).delete(auth, deleteWord);

export default router;