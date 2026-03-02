const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  trait: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 1,
  },
});
module.exports = mongoose.model("Question", questionSchema, "questions");
