import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const generateAuthTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshTokens.push(refreshToken);
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "Error generating token");
  }
};

const CreateNewUser = asyncHandler(async (req, res) => {
  console.log("📍 CreateNewUser called");
  const { name, email, password, phone, studentId } = req.body || {};

  if (
    !name ||
    !email ||
    !password ||
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    throw new ApiError(400, "Name, email and password are required");
  }

  // Check if the user exists
  if (await User.findOne({ email })) {
    throw new ApiError(409, "User already exists");
  }

  const user = new User({ name, email, password, phone, studentId });
  await user.save();

  // Generate tokens for the new user
  const { refreshToken, accessToken } = await generateAuthTokens(user._id);

  const userData = await User.findById(user._id).select(
    "-password -refreshToken -refreshTokens"
  );

  if (!userData) {
    throw new ApiError(500, "Error creating new user");
  }

  // Set cookies for cookie-based auth
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        {
          user: userData,
          token: accessToken, // For localStorage
          refreshToken: refreshToken, // For localStorage
        },
        "User registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  // Validate input
  if (email === undefined || password === undefined) {
    throw new ApiError(400, "Invalid login details");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate JWT tokens
  const { refreshToken, accessToken } = await generateAuthTokens(user._id);

  const userData = await User.findById(user._id).select(
    "-password -refreshToken -refreshTokens"
  );

  // Cookie options
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: userData,
          token: accessToken, // For localStorage
          refreshToken: refreshToken, // For localStorage
        },
        "Login successful"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "User not authenticated");
  }

  // Remove all refresh tokens for this user
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshTokens: [] },
    },
    {
      new: true,
    }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };

  return res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .clearCookie("accessToken", cookieOptions)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

// Refresh token endpoint - works for both cookie and localStorage
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Try to get refresh token from cookies first, then from body (localStorage case)
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request - No refresh token");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Check if the refresh token exists in user's refresh tokens
    if (!user.refreshTokens.includes(incomingRefreshToken)) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAuthTokens(user._id);

    // Remove old refresh token and add new one
    await User.findByIdAndUpdate(user._id, {
      $pull: { refreshTokens: incomingRefreshToken },
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          {
            token: accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

// Get current user - works for both auth methods
const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }

  const userData = await User.findById(req.user._id).select(
    "-password -refreshToken -refreshTokens"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: userData }, "User fetched successfully")
    );
});

export {
  CreateNewUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
};
