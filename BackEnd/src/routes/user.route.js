import { Router } from "express";
import {
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", CreateNewUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);

export default router;
