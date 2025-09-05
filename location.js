// models/location.js
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["music", "food", "sports", "tech", "other"],
      default: "other",
    },
    date: { type: Date, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
        validate: {
          validator: function (arr) {
            return (
              Array.isArray(arr) &&
              arr.length === 2 &&
              arr[0] >= -180 &&
              arr[0] <= 180 &&
              arr[1] >= -90 &&
              arr[1] <= 90
            );
          },
          message: "location.coordinates must be [longitude, latitude]",
        },
      },
      address: { type: String, default: "" },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Add userId field
  },
  { timestamps: true }
);

locationSchema.index({ location: "2dsphere" });

const Location = mongoose.model("Location", locationSchema, "locations");

export default Location;
