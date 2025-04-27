import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  status: {
    type: String,
    enum: ["Success", "Failed", "Pending"],
    required: true
  },
  items: [
    {
      variant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Variants",
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      priceINR: {
        type: Number,
        required: true,
      },
      priceUSDT: {
        type: Number,
        required: true,
      },
      codes: [],
    }
  ],
  paymentMethod: String,
  totalINR: Number,
  totalUSDT: Number,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

export const orderModel = mongoose.model("Orders", orderSchema)
