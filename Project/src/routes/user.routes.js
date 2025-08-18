import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser)
// router.route("/login").post(login)

export default router; // default is used so we can give a username in other files accoring to out wishes