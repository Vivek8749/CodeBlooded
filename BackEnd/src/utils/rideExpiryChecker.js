import Ride from "../models/ride.model.js";

/**
 * Background job to check and mark expired rides
 * Runs periodically to update ride expiry status
 */
export const checkAndUpdateExpiredRides = async () => {
  try {
    const result = await Ride.updateMany(
      {
        expiryTime: { $lte: new Date() },
        expired: false,
      },
      {
        $set: { expired: true },
      }
    );

    if (result.modifiedCount > 0) {
      console.log(
        `[Expiry Checker] Marked ${result.modifiedCount} ride(s) as expired`
      );
    }

    return result;
  } catch (error) {
    console.error("[Expiry Checker] Error updating expired rides:", error);
    throw error;
  }
};

/**
 * Start the expiry checker background job
 * @param {number} intervalMinutes - Interval in minutes to check for expired rides
 */
export const startExpiryChecker = (intervalMinutes = 5) => {
  console.log(
    `[Expiry Checker] Starting background job (checking every ${intervalMinutes} minutes)`
  );

  // Run immediately on startup
  checkAndUpdateExpiredRides();

  // Then run at specified intervals
  const intervalMs = intervalMinutes * 60 * 1000;
  setInterval(checkAndUpdateExpiredRides, intervalMs);
};
