// Register Router
import express from "express";

import { register } from "../controllers/RegisterController";

// Controller imports

const router = express.Router();

router.post("/", register);

export default router;
