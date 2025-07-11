import express from "express";
import { authenticateJWT, authorize } from "../middleware/authenticateJWT";
import { userDetails } from "../controllers/ProfileController";

const router = express.Router();

import { Request, Response } from "express";

router.get("/", authenticateJWT, authorize(["User"]), userDetails);
export default router;
