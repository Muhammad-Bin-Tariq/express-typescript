import express from "express";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { authorize } from "../middleware/authorize";
import { userDetails } from "../controllers/ProfileController";

const router = express.Router();

import { Request, Response } from "express";

router.get("/", authenticateJWT, authorize(["User"]), userDetails);
export default router;
