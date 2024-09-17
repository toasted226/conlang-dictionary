import express, { Router } from "express";
import { login } from "../controllers/users";

const router: Router = express.Router();

router.route("/login").get(login);

export default router;
