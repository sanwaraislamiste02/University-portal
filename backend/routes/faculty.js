const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// ✅ ADD RESULT
router.post("/add-result", async (req, res) => {
  const { studentEmail, subject, grade } = req.body;

  const result = new Result({ studentEmail, subject, grade });
  await result.save();

  res.json({ message: "Result added" });
});

module.exports = router;