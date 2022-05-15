import express from "express";
const { authenticateToken } = require('../middleware/auth.middleware')

import { UserController } from "../controller/user.controller";

const router = express.Router();
const User = new UserController();

router.get("/user", authenticateToken, User.getUsers);

router.get("/user/:id", authenticateToken, User.getOneUser);

router.post("/user", authenticateToken, User.createUser);

router.delete("/user/:id", authenticateToken, User.deleteUser);

router.put("/user/:id", authenticateToken, User.updateUser);



export default router;
