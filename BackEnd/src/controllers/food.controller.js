import Food from "../models/food.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

// Create a new food order
const createFoodOrder = asyncHandler(async (req, res) => {
  console.log("🍔 [Create Food Order] Request received");
  console.log("🍔 [Create Food Order] User:", req.user ? req.user.email : "MISSING");
  console.log("🍔 [Create Food Order] Request body:", req.body);

  const {
    restaurant,
    minSpent,
    offer,
    expiryTime,
    totalPrice,
    deliveryLocation,
    cuisine,
    notes,
    maxParticipants,
    items,
  } = req.body;

  if (!restaurant || !minSpent || !expiryTime || !totalPrice) {
    console.error("❌ [Create Food Order] Missing required fields");
    throw new ApiError(
      400,
      "Restaurant, minimum spent, expiry time, and total price are required"
    );
  }

  // Validate expiry time is in the future
  const expiry = new Date(expiryTime);
  if (expiry <= new Date()) {
    console.error("❌ [Create Food Order] Expiry time is in the past");
    throw new ApiError(400, "Expiry time must be in the future");
  }

  console.log("✅ [Create Food Order] Creating order for user:", req.user._id);

  const foodOrder = await Food.create({
    createdBy: req.user._id,
    restaurant,
    MinSpent: minSpent,
    Offer: offer,
    expiryTime: expiry,
    totalPrice,
    deliveryLocation,
    cuisine,
    notes,
    maxParticipants,
    items,
    currentParticipants: 1,
    participants: [],
  });

  console.log("✅ [Create Food Order] Created with ID:", foodOrder._id);

  const populatedOrder = await Food.findById(foodOrder._id).populate(
    "createdBy",
    "name email phone profilePicture"
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { foodOrder: populatedOrder },
        "Food order created successfully"
      )
    );
});

// Search food orders
const searchFoodOrders = asyncHandler(async (req, res) => {
  const { restaurant, cuisine, location, includeExpired } = req.query;

  const query = {};

  // Search by restaurant name (partial match)
  if (restaurant) {
    query.restaurant = { $regex: restaurant, $options: "i" };
  }

  // Search by cuisine
  if (cuisine) {
    query.cuisine = { $regex: cuisine, $options: "i" };
  }

  // Search by delivery location
  if (location) {
    query.deliveryLocation = { $regex: location, $options: "i" };
  }

  // By default, exclude expired orders unless explicitly requested
  if (includeExpired !== "true") {
    query.expired = false;
    query.expiryTime = { $gt: new Date() };
  }

  const foodOrders = await Food.find(query)
    .populate("createdBy", "name email phone profilePicture")
    .populate("participants.user", "name profilePicture")
    .sort({ expiryTime: 1 })
    .limit(50);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { foodOrders },
        "Food orders fetched successfully"
      )
    );
});

// Get food order details
const getFoodOrderDetails = asyncHandler(async (req, res) => {
  const { foodOrderId } = req.params;

  const foodOrder = await Food.findById(foodOrderId)
    .populate("createdBy", "name email phone profilePicture studentId")
    .populate("participants.user", "name email phone profilePicture");

  if (!foodOrder) {
    throw new ApiError(404, "Food order not found");
  }

  // Check and update expiry status
  await foodOrder.checkAndUpdateExpiry();

  // Calculate split amount per person
  const splitAmount = foodOrder.calculateSplit();
  const isUserCreator =
    foodOrder.createdBy._id.toString() === req.user._id.toString();
  const userParticipant = foodOrder.participants.find(
    (p) => p.user._id.toString() === req.user._id.toString()
  );

  const responseData = {
    foodOrder,
    payment: {
      splitAmount,
      totalParticipants: foodOrder.currentParticipants,
      isExpired: foodOrder.expired,
      userAmount: isUserCreator || userParticipant ? splitAmount : null,
      minSpent: foodOrder.MinSpent,
      offer: foodOrder.Offer,
    },
  };

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        responseData,
        "Food order details fetched successfully"
      )
    );
});

// Join a food order
const joinFoodOrder = asyncHandler(async (req, res) => {
  const { foodOrderId } = req.params;

  const foodOrder = await Food.findById(foodOrderId);

  if (!foodOrder) {
    throw new ApiError(404, "Food order not found");
  }

  // Check if order is expired
  if (foodOrder.expired || new Date() > foodOrder.expiryTime) {
    throw new ApiError(400, "Cannot join expired food order");
  }

  // Check if user is the creator
  if (foodOrder.createdBy.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot join your own food order");
  }

  // Check if user already joined
  const alreadyJoined = foodOrder.participants.some(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (alreadyJoined) {
    throw new ApiError(400, "You have already joined this food order");
  }

  // Check if order is full
  if (
    foodOrder.maxParticipants &&
    foodOrder.currentParticipants >= foodOrder.maxParticipants
  ) {
    throw new ApiError(400, "Food order is full");
  }

  // Add user to participants
  foodOrder.participants.push({
    user: req.user._id,
    joinedAt: new Date(),
  });
  foodOrder.currentParticipants += 1;

  await foodOrder.save();

  const updatedOrder = await Food.findById(foodOrderId)
    .populate("createdBy", "name email phone profilePicture")
    .populate("participants.user", "name email phone profilePicture");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { foodOrder: updatedOrder },
        "Successfully joined food order"
      )
    );
});

// Leave a food order
const leaveFoodOrder = asyncHandler(async (req, res) => {
  const { foodOrderId } = req.params;

  const foodOrder = await Food.findById(foodOrderId);

  if (!foodOrder) {
    throw new ApiError(404, "Food order not found");
  }

  // Check if user is the creator
  if (foodOrder.createdBy.toString() === req.user._id.toString()) {
    throw new ApiError(
      400,
      "Creator cannot leave. Delete the order instead."
    );
  }

  // Check if user is a participant
  const participantIndex = foodOrder.participants.findIndex(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (participantIndex === -1) {
    throw new ApiError(400, "You are not a participant of this food order");
  }

  // Remove user from participants
  foodOrder.participants.splice(participantIndex, 1);
  foodOrder.currentParticipants -= 1;

  await foodOrder.save();

  const updatedOrder = await Food.findById(foodOrderId)
    .populate("createdBy", "name email phone profilePicture")
    .populate("participants.user", "name email phone profilePicture");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { foodOrder: updatedOrder },
        "Successfully left food order"
      )
    );
});

// Get user's food orders (created and joined)
const getUserFoodOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Get orders created by user
  const createdOrders = await Food.find({ createdBy: userId })
    .populate("createdBy", "name email phone profilePicture")
    .populate("participants.user", "name profilePicture")
    .sort({ createdAt: -1 });

  // Get orders user has joined
  const joinedOrders = await Food.find({
    "participants.user": userId,
  })
    .populate("createdBy", "name email phone profilePicture")
    .populate("participants.user", "name profilePicture")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { createdOrders, joinedOrders },
        "User food orders fetched successfully"
      )
    );
});

// Delete a food order (creator only)
const deleteFoodOrder = asyncHandler(async (req, res) => {
  const { foodOrderId } = req.params;

  const foodOrder = await Food.findById(foodOrderId);

  if (!foodOrder) {
    throw new ApiError(404, "Food order not found");
  }

  // Check if user is the creator
  if (foodOrder.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only the creator can delete this food order");
  }

  // Check if there are participants
  if (foodOrder.participants.length > 0) {
    throw new ApiError(
      400,
      "Cannot delete food order with participants. Ask them to leave first."
    );
  }

  await Food.findByIdAndDelete(foodOrderId);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Food order deleted successfully"));
});

export {
  createFoodOrder,
  searchFoodOrders,
  getFoodOrderDetails,
  joinFoodOrder,
  leaveFoodOrder,
  getUserFoodOrders,
  deleteFoodOrder,
};
