"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWTKEY;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(403).json({ error: "Invalid token" });
        if (typeof decoded === "object" && decoded !== null) {
            req.user = {
                role: decoded.role,
                email: decoded.email,
            };
            console.log("Authenticated user:", req.user);
        }
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
