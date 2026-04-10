// backend/routes/timetable.js
// Two doors:
// GET  /timetable     — fetch all slots (students & faculty view)
// POST /timetable     — admin creates a new slot
// DELETE /timetable/:id — admin removes a slot
const express = require("express");
const router  = express.Router();
const Timetable = require("../models/Timetable");

// Fetch all timetable slots, sorted by day
router.get("/", async (req, res) => {
  try {
    const slots = await Timetable.find().sort({ day: 1, time: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin creates a new slot
router.post("/", async (req, res) => {
  try {
    const { subject, day, time, room, facultyEmail } = req.body;
    const slot = await Timetable.create({
      subject, day, time, room, facultyEmail
    });
    res.status(201).json({ message: "Slot added!", slot });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin deletes a slot
router.delete("/:id", async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.json({ message: "Slot removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;