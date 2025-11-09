import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    restaurant: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    MinSpent: {
      type: Number,
      required: true,
      index: true,
    },
    Offer: [{
        ispercentage: Boolean,
        amount: Number
    }],
    currentParticipants: {
      type: Number,
      required: true,
      default: 1,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    expiryTime: {
      type: Date,
      required: true,
      index: true,
    },
    expired: {
      type: Boolean,
      default: false,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching rides
rideSchema.index({ to: 1, expiryTime: 1 });

// Virtual for checking if ride is full
rideSchema.virtual("isFull").get(function () {
  return this.currentSeats >= this.maxSeats;
});

// Virtual for checking if ride is expired
rideSchema.virtual("isExpired").get(function () {
  return new Date() > this.expiryTime;
});

// Method to calculate split amount (for frontend display)
rideSchema.methods.calculateSplit = function () {
  const totalParticipants = this.participants.length + 1; // +1 for creator
  return this.totalPrice / totalParticipants;
};

// Pre-find middleware to mark expired rides
rideSchema.pre(/^find/, async function (next) {
  // Update all rides that have passed expiryTime but are not marked as expired
  await this.model.updateMany(
    {
      expiryTime: { $lte: new Date() },
      expired: false,
    },
    {
      $set: { expired: true },
    }
  );
  next();
});

// Method to check and mark ride as expired
rideSchema.methods.checkAndUpdateExpiry = async function () {
  if (!this.expired && new Date() > this.expiryTime) {
    this.expired = true;
    await this.save();
  }
  return this.expired;
};

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
