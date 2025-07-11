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
exports.userDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const userDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.userDetails = userDetails;
