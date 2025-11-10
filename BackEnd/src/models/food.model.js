import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
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
    Offer: [
      {
        isPercentage: Boolean,
        amount: Number,
      },
    ],
    currentParticipants: {
      type: Number,
      required: true,
      default: 1,
    },
    maxParticipants: {
      type: Number,
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
    deliveryLocation: {
      type: String,
      trim: true,
    },
    cuisine: {
      type: String,
      trim: true,
    },
    items: [
      {
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
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

// Index for searching food orders
foodSchema.index({ restaurant: 1, expiryTime: 1 });
foodSchema.index({ cuisine: 1 });
foodSchema.index({ deliveryLocation: 1 });

// Index for searching food orders
foodSchema.index({ restaurant: 1, expiryTime: 1 });
foodSchema.index({ cuisine: 1 });
foodSchema.index({ deliveryLocation: 1 });

// Virtual for checking if order is full
foodSchema.virtual("isFull").get(function () {
  if (!this.maxParticipants) return false;
  return this.currentParticipants >= this.maxParticipants;
});

// Virtual for checking if order is expired
foodSchema.virtual("isExpired").get(function () {
  return new Date() > this.expiryTime;
});

// Method to calculate split amount (for frontend display)
foodSchema.methods.calculateSplit = function () {
  return this.totalPrice / this.currentParticipants;
};

// Pre-find middleware to mark expired food orders
foodSchema.pre(/^find/, async function (next) {
  // Update all food orders that have passed expiryTime but are not marked as expired
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

// Method to check and mark food order as expired
foodSchema.methods.checkAndUpdateExpiry = async function () {
  if (!this.expired && new Date() > this.expiryTime) {
    this.expired = true;
    await this.save();
  }
  return this.expired;
};

const Food = mongoose.model("Food", foodSchema);
export default Food;
