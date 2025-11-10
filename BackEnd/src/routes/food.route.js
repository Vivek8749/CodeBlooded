import { Router } from "express";
import {
  createFoodOrder,
  searchFoodOrders,
  getFoodOrderDetails,
  joinFoodOrder,
  leaveFoodOrder,
  getUserFoodOrders,
  deleteFoodOrder,
} from "../controllers/food.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All food routes require authentication
router.use(verifyJWT);

// Create a new food order
router.post("/", createFoodOrder);

// Search for food orders
router.get("/search", searchFoodOrders);

// Get user's food orders (created and joined)
router.get("/my-orders", getUserFoodOrders);

// Get specific food order details
router.get("/:foodOrderId", getFoodOrderDetails);

// Join a food order
router.post("/:foodOrderId/join", joinFoodOrder);

// Leave a food order
router.post("/:foodOrderId/leave", leaveFoodOrder);

// Delete a food order (creator only)
router.delete("/:foodOrderId", deleteFoodOrder);

export default router;
