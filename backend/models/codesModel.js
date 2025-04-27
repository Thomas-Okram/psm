import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  variant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variants", // Reference to the Redeem Code Variants model
    required: true,
  },
  redeemCode: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["available", "hold", "sold"],
    default: "available",
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  soldAt: Date,
});

export const codesModel = mongoose.model("Codes", codeSchema);

