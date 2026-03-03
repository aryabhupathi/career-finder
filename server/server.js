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

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("API Running");
});

// API Routes
app.use("/api/questions", questionsRoute);
app.use("/api/answers", assessmentRoute);
app.use("/api/results", resultsRoute);

// Serve React Build
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// REQUIRED FIX FOR REPLIT
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
