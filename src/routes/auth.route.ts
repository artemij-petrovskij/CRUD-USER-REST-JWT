import express from "express";
import { UserAuth } from "../controller/auth.controller";

const router = express.Router();
const Auth = new UserAuth();

router.post("/login", Auth.loginUser);

router.post("/signup", Auth.signupUser);



export default router;
