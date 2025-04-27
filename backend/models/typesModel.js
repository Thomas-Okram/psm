import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  flag: {
    type: String,
    required: true
  }
});

export const typesModel = mongoose.model("Types", typeSchema);
