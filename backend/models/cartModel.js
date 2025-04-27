import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the Redeem Code Variants model
    required: true,
  },
  cart: {
    type: [
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
      },
    ],
    default: [],
  }
});

export const cartModel = mongoose.model("Carts", cartSchema);

