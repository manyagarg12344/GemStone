const express = require("express");
const router = express.Router();
const {
  createRecommendation,
  getAllRecommendations,
  getRecommendationById,
  deleteRecommendation,
  getStats,
} = require("../controllers/recommendationController");

/**
 * @route   POST /api/recommendations
 * @desc    Create a new gemstone recommendation
 * @access  Public
 */
router.post("/", createRecommendation);

/**
 * @route   GET /api/recommendations
 * @desc    Get all recommendations (history) with pagination
 * @access  Public
 * @query   page, limit
 */
router.get("/", getAllRecommendations);

/**
 * @route   GET /api/recommendations/stats
 * @desc    Get recommendation statistics
 * @access  Public
 */
router.get("/stats", getStats);

/**
 * @route   GET /api/recommendations/:id
 * @desc    Get a single recommendation by ID
 * @access  Public
 */
router.get("/:id", getRecommendationById);

/**
 * @route   DELETE /api/recommendations/:id
 * @desc    Delete a recommendation by ID
 * @access  Public
 */
router.delete("/:id", deleteRecommendation);

module.exports = router;
