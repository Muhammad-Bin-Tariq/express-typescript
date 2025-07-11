"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const AdminRouter_1 = __importDefault(require("./routes/AdminRouter"));
const LoginRouter_1 = __importDefault(require("./routes/LoginRouter"));
const ProfileRouter_1 = __importDefault(require("./routes/ProfileRouter"));
const RegisterRouter_1 = __importDefault(require("./routes/RegisterRouter"));
const app = (0, express_1.default)();
const port = process.env.PORT;
console.log(port);
app.use(body_parser_1.default.json()); // for parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/admin", AdminRouter_1.default);
app.use("/login", LoginRouter_1.default);
app.use("/profile", ProfileRouter_1.default);
app.use("/register", RegisterRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
