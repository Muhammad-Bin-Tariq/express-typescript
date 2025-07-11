"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const authenticateJWT_1 = require("../middleware/authenticateJWT");
const router = express_1.default.Router();
router.get("/", authenticateJWT_1.authenticateJWT, (0, authenticateJWT_1.authorize)(["Admin"]), AdminController_1.adminDetails);
router.get("/users", authenticateJWT_1.authenticateJWT, (0, authenticateJWT_1.authorize)(["Admin"]), AdminController_1.getUsers);
router.get("/users", authenticateJWT_1.authenticateJWT, (0, authenticateJWT_1.authorize)(["Admin"]), AdminController_1.updateUsername);
router.get("/users", authenticateJWT_1.authenticateJWT, (0, authenticateJWT_1.authorize)(["Admin"]), AdminController_1.deleteUserByUsername);
exports.default = router;
