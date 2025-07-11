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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByUsername = exports.updateUsername = exports.getUsers = exports.adminDetails = void 0;
// import db from "../server";
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
//Admin Personal Details
const adminDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!email) {
        return res.status(400).json({ error: "Email not provided in token" });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: { email },
            select: {
                username: true,
                email: true,
                role: true,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User profile fetched", user });
    }
    catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.adminDetails = adminDetails;
// GET USERS (Prisma)
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getUsers = getUsers;
// UPDATE USERNAME (Prisma)
const updateUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldUsername, newUsername, } = req.body;
    if (!oldUsername || !newUsername) {
        res.status(400).json({ error: "Both old and new usernames are required" });
        return;
    }
    try {
        const user = yield prisma.user.updateMany({
            where: { username: oldUsername },
            data: { username: newUsername },
        });
        if (user.count === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "Username updated successfully" });
    }
    catch (err) {
        console.error("Error updating username:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateUsername = updateUsername;
// DELETE USER BY USERNAME (Prisma)
const deleteUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    if (!username) {
        res.status(400).json({ error: "Username is required" });
        return;
    }
    try {
        const user = yield prisma.user.deleteMany({
            where: { username },
        });
        if (user.count === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteUserByUsername = deleteUserByUsername;
