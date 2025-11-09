import { Router } from "express";
import {
  CreateNewUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/signup", CreateNewUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);

// Protected routes (require authentication)
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);

export default router;
