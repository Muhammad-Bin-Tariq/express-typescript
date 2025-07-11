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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const secret = process.env.JWTKEY;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Step 1: Find user by email
        const user = yield prisma.user.findUnique({
            where: { email },
            include: { role: true },
        });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const storedPassword = user.password;
        let isPasswordMatch = false;
        // Step 2: Detect if password is hashed
        const isHashed = storedPassword.startsWith("$2b$");
        if (isHashed) {
            // New user (bcrypt)
            isPasswordMatch = yield bcrypt_1.default.compare(password, storedPassword);
        }
        else {
            // Legacy user (plain-text password)
            isPasswordMatch = password === storedPassword;
            if (isPasswordMatch) {
                // Rehash and store password for future logins
                const hashed = yield bcrypt_1.default.hash(password, 10);
                yield prisma.user.update({
                    where: { id: user.id },
                    data: { password: hashed },
                });
                console.log(`✅ Rehashed legacy password for ${user.email}`);
            }
        }
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // Step 3: Generate JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role.name,
        }, secret, { expiresIn: "1h" });
        const redirectPath = user.role.name === "Admin" ? "/admin" : "/profile";
        return res.status(200).json({
            message: "Login successful",
            token,
            redirect: redirectPath,
        });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.login = login;
