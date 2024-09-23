import express, { Router } from "express";
import { authenticated, login, logout } from "../controllers/users";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/login").get(auth, authenticated).post(login);
router.route("/logout").get(logout);

export default router;
