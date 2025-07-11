import express from "express";
import {
  getUsers,
  adminDetails,
  updateUsername,
  deleteUserByUsername,
} from "../controllers/AdminController";
import { authenticateJWT } from "../middleware/authenticateJWT";
import { authorize } from "../middleware/authorize";

const router = express.Router();

router.get("/", authenticateJWT, authorize(["Admin"]), adminDetails);
router.get("/users", authenticateJWT, authorize(["Admin"]), getUsers);
router.get("/users", authenticateJWT, authorize(["Admin"]), getUsers);
router.get("/users", authenticateJWT, authorize(["Admin"]), getUsers);
router.get("/users", authenticateJWT, authorize(["Admin"]), getUsers);

export default router;
