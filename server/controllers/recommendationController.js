const Recommendation = require("../models/Recommendation");
const { buildRecommendation } = require("../config/gemstoneData");

// Conditionally import Gemini API
let genAI = null;
try {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
} catch (e) {
  console.log("Gemini AI not available");
}

/**
 * Generate a gemstone recommendation based on user input.
 * POST /api/recommendations
 */
const createRecommendation = async (req, res) => {
  try {
    const { name, dob, gender, language = "en" } = req.body;

    // Validation
    if (!name || !dob) {
      return res.status(400).json({
        success: false,
        message: "Name and date of birth are required.",
      });
    }

    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Please provide a valid date.",
      });
    }

    // Check if DOB is not in the future
    if (dobDate > new Date()) {
      return res.status(400).json({
        success: false,
        message: "Date of birth cannot be in the future.",
      });
    }

    // Build the recommendation data
    const recommendationData = buildRecommendation(name, dobDate, gender);

    // Try to get AI advice from Gemini (optional)
    let aiAdvice = null;
    if (genAI) {
      try {
        aiAdvice = await getGeminiAdvice(
          name,
          recommendationData.zodiacSign,
          recommendationData.gemstoneName,
          language
        );
      } catch (aiError) {
        console.error("Gemini AI error (non-critical):", aiError.message);
        // Continue without AI advice
      }
    }

    // Save to MongoDB
    const savedRecommendation = await Recommendation.create({
      name,
      dob: dobDate,
      gender: gender || "",
      zodiacSign: recommendationData.zodiacSign,
      gemstoneName: recommendationData.gemstoneName,
      aiAdvice,
      language,
    });

    return res.status(201).json({
      success: true,
      message: "Recommendation generated successfully!",
      data: {
        id: savedRecommendation._id,
        ...recommendationData,
        aiAdvice,
        createdAt: savedRecommendation.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating recommendation:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Get all past recommendations (history).
 * GET /api/recommendations
 */
const getAllRecommendations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Recommendation.countDocuments();
    const recommendations = await Recommendation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("name dob zodiacSign gemstoneName gender createdAt");

    return res.status(200).json({
      success: true,
      data: recommendations,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching history.",
    });
  }
};

/**
 * Get a single recommendation by ID.
 * GET /api/recommendations/:id
 */
const getRecommendationById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Recommendation.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found.",
      });
    }

    // Rebuild full recommendation data from stored fields
    const fullData = buildRecommendation(record.name, record.dob, record.gender);

    return res.status(200).json({
      success: true,
      data: {
        id: record._id,
        ...fullData,
        aiAdvice: record.aiAdvice,
        createdAt: record.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching recommendation.",
    });
  }
};

/**
 * Delete a recommendation by ID.
 * DELETE /api/recommendations/:id
 */
const deleteRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Recommendation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting recommendation.",
    });
  }
};

/**
 * Get statistics about recommendations.
 * GET /api/recommendations/stats
 */
const getStats = async (req, res) => {
  try {
    const total = await Recommendation.countDocuments();
    const byZodiac = await Recommendation.aggregate([
      { $group: { _id: "$zodiacSign", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byGemstone = await Recommendation.aggregate([
      { $group: { _id: "$gemstoneName", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return res.status(200).json({
      success: true,
      data: { total, byZodiac, byGemstone },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching stats." });
  }
};

/**
 * Generates personalized AI advice using Google Gemini.
 * @param {string} name - User name
 * @param {string} zodiacSign - Zodiac sign
 * @param {string} gemstone - Recommended gemstone
 * @param {string} language - Response language ('en' or 'hi')
 * @returns {string} - AI-generated advice text
 */
const getGeminiAdvice = async (name, zodiacSign, gemstone, language) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const languageInstruction =
    language === "hi" ? "Respond in Hindi." : "Respond in English.";

  const prompt = `You are a wise astrologer and gemstone expert. 
  ${languageInstruction}
  
  Give a personalized, warm, and insightful gemstone recommendation for:
  - Name: ${name}
  - Zodiac Sign: ${zodiacSign}
  - Recommended Gemstone: ${gemstone}
  
  Include:
  1. Why this gemstone is perfect for their zodiac sign
  2. One specific life area where this gemstone will help them most
  3. The best way to wear or use this gemstone
  4. A brief spiritual message or affirmation for them
  
  Keep it warm, personal, and under 200 words. Address them by name.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

module.exports = {
  createRecommendation,
  getAllRecommendations,
  getRecommendationById,
  deleteRecommendation,
  getStats,
};
