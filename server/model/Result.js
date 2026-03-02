const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
  {
    traitScores: {
      type: Map,
      of: Number,
      required: true,
    },
    answers: {
      type: Map,
      of: Number,
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Result", resultSchema, "results");
