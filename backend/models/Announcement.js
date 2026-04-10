// backend/models/Announcement.js
const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  title:     { type: String, required: true },  // heading of the notice
  message:   { type: String, required: true },  // full announcement text
  postedBy:  { type: String, required: true },  // email of faculty/admin who posted
  target:    { type: String, enum: ["all", "student", "faculty"], default: "all" }
  // target = who can see it. "all" means everyone
}, { timestamps: true }); // auto adds date posted

module.exports = mongoose.model("Announcement", announcementSchema);