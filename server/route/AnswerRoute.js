const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require("../model/Questions");
const Result = require("../model/Result");
router.post("/", async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ message: "Invalid answers format" });
    }
    const questionIds = Object.keys(answers);
    if (!questionIds.length) {
      return res.status(400).json({ message: "No answers submitted" });
    }
    const validIds = questionIds.filter((id) =>
      mongoose.Types.ObjectId.isValid(id),
    );
    const questions = await Question.find({
      _id: { $in: validIds },
    });
    if (!questions.length) {
      return res.status(404).json({ message: "Questions not found" });
    }
    const rawScores = {};
    const maxScores = {};
    questions.forEach((q) => {
      const value = Number(answers[q._id]);
      if (isNaN(value) || value < 1 || value > 5) return;
      if (!rawScores[q.trait]) {
        rawScores[q.trait] = 0;
        maxScores[q.trait] = 0;
      }
      rawScores[q.trait] += value * q.weight;
      maxScores[q.trait] += 5 * q.weight;
    });
    const normalizedScores = {};
    Object.keys(rawScores).forEach((trait) => {
      normalizedScores[trait] = Math.round(
        (rawScores[trait] / maxScores[trait]) * 100,
      );
    });
    const savedResult = await Result.create({
      traitScores: normalizedScores,
      answers,
    });
    res.status(201).json({
      resultId: savedResult._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Assessment submission failed",
      error: error.message,
    });
  }
});
module.exports = router;
