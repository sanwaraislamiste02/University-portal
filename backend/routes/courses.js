// backend/routes/courses.js
const express = require("express");
const router  = express.Router();
const Course  = require("../models/Course");

// GET all courses (optionally filter by ?department=CSE)
router.get("/", async (req, res) => {
  try {
    const filter = req.query.department ? { department: req.query.department } : {};
    const courses = await Course.find(filter).sort({ department: 1, code: 1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Student enrols
router.post("/enrol", async (req, res) => {
  try {
    const { courseId, studentEmail } = req.body;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    if (course.enrolledStudents.includes(studentEmail))
      return res.status(400).json({ message: "Already enrolled" });
    course.enrolledStudents.push(studentEmail);
    await course.save();
    res.json({ message: "Enrolled successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin adds a course
router.post("/add", async (req, res) => {
  try {
    const { name, code, department, instructor, instructorEmail, description, credits } = req.body;
    const course = await Course.create({ name, code, department, instructor, instructorEmail, description, credits: credits || 3 });
    res.status(201).json({ message: "Course added", course });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin deletes a course
router.delete("/:id", async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
