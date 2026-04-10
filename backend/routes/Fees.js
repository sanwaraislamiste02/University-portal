const express = require("express");
const router  = express.Router();
const Fee     = require("../models/Fee");

// GET fees for a student
router.get("/:email", async (req, res) => {
  try {
    const fees = await Fee.find({ studentEmail: req.params.email });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark a fee as paid
router.put("/pay/:id", async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      { status: "paid", paidAt: new Date() },
      { new: true }
    );
    res.json({ message: "Payment successful", fee });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: add a fee for a student
router.post("/add", async (req, res) => {
  try {
    const { studentEmail, description, amount } = req.body;
    const fee = await Fee.create({ studentEmail, description, amount });
    res.status(201).json({ message: "Fee added", fee });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;