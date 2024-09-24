import express, { Router } from "express";
import { authenticated, createAccount, login, logout } from "../controllers/users";
import { auth } from "../middleware/auth";

const router: Router = express.Router();

router.route("/login").get(auth, authenticated).post(login);
router.route("/logout").get(logout);
router.route("/create").post(createAccount);

export default router;
