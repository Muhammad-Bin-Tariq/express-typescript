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
exports.login = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const secret = process.env.JWTKEY;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find user by email and password, and include their role
        const user = yield prisma.user.findFirst({
            where: { email, password },
            include: { role: true }, // Includes the linked Role either User or Admin
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role.name, // Include role name in JWT payload which changes the token based on admin or user login
        }, secret, { expiresIn: "1h" });
        // Return both token and redirect route based on role
        const redirectPath = user.role.name === "Admin" ? "/admin" : "/profile";
        return res.status(200).json({
            message: "Login successful",
            token,
            redirect: redirectPath,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
