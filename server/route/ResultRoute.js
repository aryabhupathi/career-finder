const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Result = require("../model/Result");
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid result ID" });
    }
    const result = await Result.findById(id).lean();
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch result",
      error: error.message,
    });
  }
});
module.exports = router;
