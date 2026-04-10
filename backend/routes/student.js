const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// ✅ GET STUDENT RESULTS
router.get("/results/:email", async (req, res) => {
  const results = await Result.find({ studentEmail: req.params.email });
  res.json(results);
});

module.exports = router;