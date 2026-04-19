const express = require("express");
const router  = express.Router();
const Message = require("../models/Message");

// POST — student sends a message
router.post("/", async (req, res) => {
  try {
    const { fromEmail, toEmail, subject, message } = req.body;
    await Message.create({ fromEmail, toEmail, subject, message });
    res.status(201).json({ message: "Message sent!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST — faculty replies to a message
router.post("/reply/:id", async (req, res) => {
  try {
    const { reply } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { reply, read: true },
      { new: true }
    );
    res.json({ message: "Reply sent!", data: message });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT — mark message as read
router.put("/:id/read", async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET — messages sent BY a student (specific route — must be above /:email)
router.get("/sent/:email", async (req, res) => {
  try {
    const messages = await Message.find({ fromEmail: req.params.email })
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET — faculty inbox (dynamic route — must be LAST)
router.get("/:email", async (req, res) => {
  try {
    const messages = await Message.find({ toEmail: req.params.email })
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;