// backend/models/Course.js
// Adding an enrolledStudents array to track who joined each course
// It stores a list of student emails — e.g. ["alice@uni.com", "bob@uni.com"]
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  instructor:       { type: String, required: true },
  description:      { type: String, default: "" },
  enrolledStudents: { type: [String], default: [] } // list of student emails
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);