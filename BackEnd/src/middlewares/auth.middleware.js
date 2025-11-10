import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyToken = asyncHandler(async (req, _, next) => {
  try {
    // Try to get token from cookies first (cookie-based auth)
    // Then try Authorization header (localStorage-based auth)
    const cookieToken = req.cookies?.accessToken;
    const headerToken = req.header("Authorization")?.replace("Bearer ", "");
    const token = cookieToken || headerToken;

    // Debug logging
    console.log("🔐 [Backend Auth Middleware] Token check:");
    console.log("- Cookie token:", cookieToken ? "EXISTS" : "MISSING");
    console.log("- Header token:", headerToken ? "EXISTS" : "MISSING");
    console.log(
      "- Using token from:",
      cookieToken ? "COOKIE" : headerToken ? "HEADER" : "NONE"
    );
    console.log("- All cookies:", Object.keys(req.cookies || {}));
    console.log(
      "- Authorization header:",
      req.header("Authorization") || "MISSING"
    );
    console.log("🔑 [Backend Auth] Environment check:");
    console.log(
      "- ACCESS_TOKEN_SECRET exists:",
      !!process.env.ACCESS_TOKEN_SECRET
    );
    console.log(
      "- ACCESS_TOKEN_SECRET length:",
      process.env.ACCESS_TOKEN_SECRET?.length || 0
    );
    console.log("- NODE_ENV:", process.env.NODE_ENV);

    if (!token) {
      console.error("❌ [Backend Auth] No token provided!");
      throw new ApiError(401, "Unauthorized request - No token provided");
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error(
        "❌ [Backend Auth] ACCESS_TOKEN_SECRET is not set in environment!"
      );
      throw new ApiError(500, "Server configuration error");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(
      "✅ [Backend Auth] Token verified, user ID:",
      decodedToken?._id
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshTokens"
    );

    if (!user) {
      console.error("❌ [Backend Auth] User not found for token");
      throw new ApiError(401, "Invalid access token");
    }

    console.log("✅ [Backend Auth] User found:", user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ [Backend Auth] Error:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyJWT = verifyToken; // Alias for consistency
export default verifyToken;
