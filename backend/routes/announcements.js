// backend/routes/announcements.js
const express = require("express");
const router  = express.Router();
const Announcement = require("../models/Announcement");

// GET — anyone logged in can fetch announcements
// When frontend calls GET /announcements, this runs
router.get("/", async (req, res) => {
  try {
    // find all, newest first
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST — only faculty/admin should call this to create one
// When frontend calls POST /announcements, this runs
router.post("/", async (req, res) => {
  try {
    const { title, message, target } = req.body;
    const postedBy = req.body.postedBy; // email from frontend

    const announcement = await Announcement.create({
      title, message, target, postedBy
    });
    res.status(201).json({ message: "Announcement posted!", announcement });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;