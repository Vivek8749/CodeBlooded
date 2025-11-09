import { Router } from "express";
import {
  createRide,
  searchRides,
  getRideDetails,
  joinRide,
  leaveRide,
  getUserRides,
  deleteRide,
} from "../controllers/ride.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All ride routes require authentication
router.use(verifyJWT);

// Create a new ride
router.post("/", createRide);

// Search for rides
router.get("/search", searchRides);

// Get user's rides (created and joined)
router.get("/my-rides", getUserRides);

// Get specific ride details
router.get("/:rideId", getRideDetails);

// Join a ride
router.post("/:rideId/join", joinRide);

// Leave a ride
router.post("/:rideId/leave", leaveRide);

// Delete a ride (creator only)
router.delete("/:rideId", deleteRide);

export default router;
