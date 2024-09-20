import express, { Router } from "express";
import { authenticated, login } from "../controllers/users";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/login").get(auth, authenticated).post(login);

export default router;
