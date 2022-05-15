"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
require('dotenv').config({ path: __dirname + '/.env' });
//const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
//app.use(cors());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use("/api", user_routes_1.default);
app.use("/auth", auth_route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
