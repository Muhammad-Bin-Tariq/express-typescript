"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Register Router
const express_1 = __importDefault(require("express"));
const RegisterController_1 = require("../controllers/RegisterController");
// Controller imports
const router = express_1.default.Router();
router.post("/", RegisterController_1.register);
exports.default = router;
