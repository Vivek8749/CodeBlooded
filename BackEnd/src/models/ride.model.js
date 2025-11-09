import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    from: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    vehicleDetails: {
      type: String,
      trim: true,
    },
    maxSeats: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    currentSeats: {
      type: Number,
      required: true,
      default: 0,
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

const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
