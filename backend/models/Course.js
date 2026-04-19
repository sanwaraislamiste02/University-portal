// ============================================================
// THIS FILE GOES IN:
// D:\University-portal\backend\models\Course.js
// ============================================================
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  code:             { type: String, required: true, unique: true },
  department:       { type: String, required: true },
  instructor:       { type: String, default: "" },
  instructorEmail:  { type: String, default: "" },
  description:      { type: String, default: "" },
  credits:          { type: Number, default: 3 },
  enrolledStudents: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);