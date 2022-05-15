"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { authenticateToken } = require('../middleware/auth.middleware');
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
const User = new user_controller_1.UserController();
router.get("/user", authenticateToken, User.getUsers);
router.get("/user/:id", authenticateToken, User.getOneUser);
router.post("/user", authenticateToken, User.createUser);
router.delete("/user/:id", authenticateToken, User.deleteUser);
router.put("/user/:id", authenticateToken, User.updateUser);
exports.default = router;
