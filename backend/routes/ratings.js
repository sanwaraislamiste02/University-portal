const express = require("express");
const router  = express.Router();
const Rating  = require("../models/Rating");

// Student submits rating
router.post("/", async (req, res) => {
  try {
    const { facultyEmail, studentEmail, rating, comment } = req.body;
    const existing = await Rating.findOne({ facultyEmail, studentEmail });
    if (existing) {
      existing.rating  = rating;
      existing.comment = comment;
      await existing.save();
      return res.json({ message: "Rating updated!" });
    }
    await Rating.create({ facultyEmail, studentEmail, rating, comment });
    res.status(201).json({ message: "Rating submitted!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get average rating for a faculty
router.get("/:email", async (req, res) => {
  try {
    const ratings = await Rating.find({ facultyEmail: req.params.email });
    if (ratings.length === 0) return res.json({ average: 0, total: 0, comments: [] });
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    res.json({
      average:  avg.toFixed(1),
      total:    ratings.length,
      comments: ratings.map(r => ({ comment: r.comment, rating: r.rating }))
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;