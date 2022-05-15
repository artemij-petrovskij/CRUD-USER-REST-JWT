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
exports.UserController = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
class UserController {
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findAll();
                res.status(200).json(user);
            }
            catch (err) {
                res.status(500);
            }
        });
    }
    getOneUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield user_model_1.default.findOne({ where: { id: id } });
            if (user !== null) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json(`User with id: ${id} does not exist`);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            yield user_model_1.default.create({
                email: email,
                password: password
            });
            res.status(201).send(`User with email: ${email} created successfully`);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const checkUserIsset = yield user_model_1.default.findOne({ where: { id: id } });
            if (checkUserIsset !== null) {
                yield user_model_1.default.destroy({
                    where: {
                        id: id,
                    },
                });
                res.status(201).send("User deleted successfully");
            }
            else {
                res.status(404).send(`User with id: ${id} does not exist`);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const { id } = req.params;
            const checkUserIsset = yield user_model_1.default.findOne({ where: { id: id } });
            if (checkUserIsset !== null) {
                yield user_model_1.default.update({
                    email: email,
                    password: password,
                }, {
                    where: {
                        id: id,
                    },
                });
                res.status(200).send(`User with id: ${id} was updated successfully`);
            }
            else {
                res.status(404).send(`User with id: ${id} not found`);
            }
        });
    }
}
exports.UserController = UserController;
