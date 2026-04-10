// backend/routes/messages.js
// Three doors:
// POST /messages        — student sends a message
// GET  /messages/:email — faculty sees messages sent to them
// PUT  /messages/:id    — mark a message as read
const express = require("express");
const router  = express.Router();
const Message = require("../models/Message");

// Student sends a message
router.post("/", async (req, res) => {
  try {
    const { fromEmail, toEmail, subject, message } = req.body;
    await Message.create({ fromEmail, toEmail, subject, message });
    res.status(201).json({ message: "Message sent!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Faculty fetches their inbox
router.get("/:email", async (req, res) => {
  try {
    const messages = await Message.find({ toEmail: req.params.email })
      .sort({ createdAt: -1 }); // newest first
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark message as read
router.put("/:id/read", async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;