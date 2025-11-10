import Ride from "../models/ride.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create a new ride
const createRide = asyncHandler(async (req, res) => {
  console.log("🚗 [Create Ride Controller] Request received");
  console.log(
    "🚗 [Create Ride Controller] User from req.user:",
    req.user ? req.user.email : "MISSING"
  );
  console.log("🚗 [Create Ride Controller] User ID:", req.user?._id);
  console.log("🚗 [Create Ride Controller] Request body:", req.body);

  const { from, to, expiryTime, maxSeats, totalPrice, vehicleDetails, notes } =
    req.body;

  if (!from || !to || !expiryTime || !maxSeats || !totalPrice) {
    console.error("❌ [Create Ride] Missing required fields");
    throw new ApiError(
      400,
      "From, to, expiry time, seats, and total price are required"
    );
  }

  // Validate expiry time is in the future
  const expiry = new Date(expiryTime);

  if (expiry <= new Date()) {
    console.error("❌ [Create Ride] Expiry time is in the past");
    throw new ApiError(400, "Expiry time must be in the future");
  }

  console.log("✅ [Create Ride] Creating ride for user:", req.user._id);

  const ride = await Ride.create({
    createdBy: req.user._id,
    from,
    to,
    expiryTime: expiry,
    maxSeats,
    currentSeats: 0,
    totalPrice,
    vehicleDetails,
    notes,
  });

  console.log("✅ [Create Ride] Ride created with ID:", ride._id);

  const populatedRide = await Ride.findById(ride._id).populate(
    "createdBy",
    "name email phone"
  );

  console.log("✅ [Create Ride] Ride populated and returning response");

  return res
    .status(201)
    .json(
      new ApiResponse(201, { ride: populatedRide }, "Ride created successfully")
    );
});

// Search rides by destination
const searchRides = asyncHandler(async (req, res) => {
  const { to, date, includeExpired } = req.query;

  if (!to) {
    throw new ApiError(400, "Destination (to) is required for search");
  }

  const query = {
    to: { $regex: to, $options: "i" },
  };

  // By default, exclude expired rides unless explicitly requested
  if (includeExpired !== "true") {
    query.expired = false;
    query.expiryTime = { $gt: new Date() };
  }

  // Filter by date if provided
  if (date) {
    const searchDate = new Date(date);
    const nextDay = new Date(searchDate);
    nextDay.setDate(nextDay.getDate() + 1);
    query.createdAt = {
      $gte: searchDate,
      $lt: nextDay,
    };
  }

  const rides = await Ride.find(query)
    .populate("createdBy", "name email phone profilePicture")
    .populate("participants.user", "name profilePicture")
    .sort({ expiryTime: 1 })
    .limit(50);

  return res
    .status(200)
    .json(new ApiResponse(200, { rides }, "Rides fetched successfully"));
});

// Get ride details
const getRideDetails = asyncHandler(async (req, res) => {
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId)
    .populate("createdBy", "name email phone profilePicture studentId")
    .populate("participants.user", "name email phone profilePicture");

  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }

  // Check and update expiry status if needed
  await ride.checkAndUpdateExpiry();

  // Calculate split for response
  const splitAmount = ride.calculateSplit();
  const isUserCreator =
    ride.createdBy._id.toString() === req.user._id.toString();
  const userParticipant = ride.participants.find(
    (p) => p.user._id.toString() === req.user._id.toString()
  );

  const responseData = {
    ride,
    payment: {
      splitAmount,
      totalParticipants: ride.participants.length + 1,
      isExpired: ride.expired,
      userAmount: isUserCreator || userParticipant ? splitAmount : null,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, responseData, "Ride details fetched successfully")
    );
});

// Join a ride
const joinRide = asyncHandler(async (req, res) => {
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);

  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }

  // Check and update expiry status
  await ride.checkAndUpdateExpiry();

  // Check if ride has expired
  if (ride.expired) {
    throw new ApiError(
      400,
      "This ride has expired and is no longer accepting participants"
    );
  }

  if (ride.currentSeats >= ride.maxSeats) {
    throw new ApiError(400, "Ride is full");
  }

  // Check if user is creator
  if (ride.createdBy.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot join your own ride");
  }

  // Check if user already joined
  const alreadyJoined = ride.participants.some(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (alreadyJoined) {
    throw new ApiError(400, "You have already joined this ride");
  }

  ride.participants.push({ user: req.user._id });
  ride.currentSeats += 1;
  await ride.save();

  const updatedRide = await Ride.findById(rideId)
    .populate("createdBy", "name email phone")
    .populate("participants.user", "name email phone profilePicture");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { ride: updatedRide }, "Joined ride successfully")
    );
});

// Leave a ride
const leaveRide = asyncHandler(async (req, res) => {
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);

  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }

  // Check and update expiry status
  await ride.checkAndUpdateExpiry();

  // Check if ride has expired
  if (ride.expired) {
    throw new ApiError(
      400,
      "This ride has expired. You cannot leave now. Please complete payment."
    );
  }

  const participantIndex = ride.participants.findIndex(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (participantIndex === -1) {
    throw new ApiError(400, "You are not part of this ride");
  }

  ride.participants.splice(participantIndex, 1);
  ride.currentSeats -= 1;
  await ride.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Left ride successfully"));
});

// Get user's rides (as creator or participant)
const getUserRides = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const createdRides = await Ride.find({ createdBy: userId })
    .populate("createdBy", "name email phone")
    .populate("participants.user", "name profilePicture")
    .sort({ createdAt: -1 });

  const joinedRides = await Ride.find({ "participants.user": userId })
    .populate("createdBy", "name email phone")
    .populate("participants.user", "name profilePicture")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { createdRides, joinedRides },
        "User rides fetched successfully"
      )
    );
});

// Delete a ride (creator only)
const deleteRide = asyncHandler(async (req, res) => {
  const { rideId } = req.params;

  const ride = await Ride.findById(rideId);

  if (!ride) {
    throw new ApiError(404, "Ride not found");
  }

  if (ride.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only the ride creator can delete this ride");
  }

  if (ride.participants.length > 0) {
    throw new ApiError(
      400,
      "Cannot delete ride with participants. Cancel it instead."
    );
  }

  await Ride.findByIdAndDelete(rideId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Ride deleted successfully"));
});

export {
  createRide,
  searchRides,
  getRideDetails,
  joinRide,
  leaveRide,
  getUserRides,
  deleteRide,
};
