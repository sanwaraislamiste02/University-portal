const express = require("express");
const router  = express.Router();
const Result  = require("../models/Result");

// ADD RESULT
router.post("/add-result", async (req, res) => {
  try {
    const { studentEmail, subject, grade } = req.body;
    const result = new Result({ studentEmail, subject, grade });
    await result.save();
    res.json({ message: "Result added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL RESULTS
router.get("/results", async (req, res) => {
  try {
    const results = await Result.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;