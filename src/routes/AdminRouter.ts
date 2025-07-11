import express from "express";
import {
  getUsers,
  adminDetails,
  updateUsername,
  deleteUserByUsername,
} from "../controllers/AdminController";
import { authenticateJWT, authorize } from "../middleware/authenticateJWT";

const router = express.Router();

router.get("/", authenticateJWT, authorize(["Admin"]), adminDetails);
router.get("/users", authenticateJWT, authorize(["Admin"]), getUsers);
router.get("/users", authenticateJWT, authorize(["Admin"]), updateUsername);
router.get(
  "/users",
  authenticateJWT,
  authorize(["Admin"]),
  deleteUserByUsername
);

export default router;
