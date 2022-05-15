"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
class UserAuth {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ where: { email: email } });
                if (user !== null && bcrypt.compareSync(password, user.password)) {
                    jwt.sign({
                        email
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err, token) => {
                        res.status(200).json({
                            message: `Welcome user with email: ${email.trim()}`,
                            token: token
                        });
                    });
                }
                else {
                    res.status(404).json({ res: `User with email: ${email} not found or does not exist` });
                }
            }
            catch (err) {
                console.error(`Server error ` + err);
                res.status(500).json({ 'error': err });
            }
        });
    }
    signupUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_model_1.default.findOne({ where: { email: email.trim() } });
                if (user !== null) {
                    res.status(404).json({ res: `User with email: ${email.trim()} already exist` });
                }
                else {
                    const salt = bcrypt.genSaltSync(10);
                    yield user_model_1.default.create({
                        email: email.trim(),
                        password: bcrypt.hashSync(password, salt)
                    });
                    jwt.sign({
                        email
                    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }, (err, token) => {
                        res.status(201).json({
                            message: `User with email: ${email.trim()} created successfully`,
                            token: token
                        });
                    });
                }
            }
            catch (err) {
                console.error(`Server error ` + err);
                res.status(500).json({ 'error': err });
            }
        });
    }
}
exports.UserAuth = UserAuth;
