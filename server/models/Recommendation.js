const mongoose = require("mongoose");

/**
 * Schema for storing user gemstone recommendation history.
 * Captures user info, zodiac data, and AI-generated insights.
 */
const recommendationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer not to say", ""],
      default: "",
    },
    zodiacSign: {
      type: String,
      required: true,
      enum: [
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces",
      ],
    },
    gemstoneName: {
      type: String,
      required: true,
    },
    aiAdvice: {
      type: String,
      default: null,
    },
    language: {
      type: String,
      enum: ["en", "hi"],
      default: "en",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Index for faster queries on zodiac sign and creation date
recommendationSchema.index({ zodiacSign: 1, createdAt: -1 });
recommendationSchema.index({ name: 1 });

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = Recommendation;
