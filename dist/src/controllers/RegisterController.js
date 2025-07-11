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
exports.register = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, } = req.body;
    try {
        // 1. Check if email already exists
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }
        // 2. Get the "User" role
        const userRole = yield prisma.role.findUnique({
            where: { name: "User" },
        });
        if (!userRole) {
            return res.status(500).json({ error: "User role not found in database" });
        }
        // 3. Create new user
        yield prisma.user.create({
            data: {
                username,
                email,
                password, // 🔒 Optional: hash this in production later
                roleId: userRole.id,
            },
        });
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.register = register;
