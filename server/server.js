require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionsRoute = require("./route/QuestionRoute");
const assessmentRoute = require("./route/AnswerRoute");
const resultsRoute = require("./route/ResultRoute");
const app = express();
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/api/questions", questionsRoute);
app.use("/api/answers", assessmentRoute);
app.use("/api/results", resultsRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
