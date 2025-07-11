"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateJWT_1 = require("../middleware/authenticateJWT");
const authorize_1 = require("../middleware/authorize");
const ProfileController_1 = require("../controllers/ProfileController");
const router = express_1.default.Router();
router.get("/", authenticateJWT_1.authenticateJWT, (0, authorize_1.authorize)(["User"]), ProfileController_1.userDetails);
exports.default = router;
