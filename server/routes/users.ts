import express, { Router } from "express";
import { login } from "../controllers/users";

const router: Router = express.Router();

router.route("/login").post(login);

export default router;
