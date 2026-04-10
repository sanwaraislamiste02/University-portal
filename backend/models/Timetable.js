// backend/models/Timetable.js
// Each document = one class slot in the schedule
// e.g. "Math, Monday, 9:00 AM, Room 101, taught by dr@uni.com"
const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  subject:      { type: String, required: true },
  day:          { type: String, required: true }, // Monday, Tuesday etc
  time:         { type: String, required: true }, // e.g. "9:00 AM"
  room:         { type: String, required: true },
  facultyEmail: { type: String, required: true }, // which faculty teaches it
}, { timestamps: true });

module.exports = mongoose.model("Timetable", timetableSchema);