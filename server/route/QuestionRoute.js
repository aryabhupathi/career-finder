const express = require("express");
const router = express.Router();
const Question = require("../model/Questions");
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().lean();
    res.json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
});
module.exports = router;
