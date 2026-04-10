// backend/routes/courses.js — create this file
// GET  /courses         — fetch all courses
// POST /courses/enrol   — student enrols in a course
// POST /courses/add     — admin/faculty adds a new course
const express = require("express");
const router  = express.Router();
const Course  = require("../models/Course");

// Fetch all courses
// Frontend calls this to show the courses list
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Student enrols in a course
// Adds their email to the enrolledStudents array if not already there
router.post("/enrol", async (req, res) => {
  try {
    const { courseId, studentEmail } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // check if already enrolled
    if (course.enrolledStudents.includes(studentEmail)) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(studentEmail);
    await course.save();

    res.json({ message: "Enrolled successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin or faculty adds a new course
router.post("/add", async (req, res) => {
  try {
    const { name, instructor, description } = req.body;
    const course = await Course.create({ name, instructor, description });
    res.status(201).json({ message: "Course added", course });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;