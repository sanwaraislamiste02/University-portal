const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const bcrypt  = require("bcryptjs");
const User    = require("../models/Users");

const SECRET  = "mysecretkey";

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name: name || "", email,
      password: hashedPassword,
      role: role || "student"
    });
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token, role: user.role, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET PROFILE
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email })
      .select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE PROFILE
router.put("/profile/update", async (req, res) => {
  try {
    const { email, name, phone, age, department, address,
            dob, gender, blood, nationality, profilePic,
            studentId, program, year, batch, rollNo, admDate,
            designation, officeRoom, expertise } = req.body;

    await User.findOneAndUpdate({ email }, {
      name, phone, age, department, address,
      dob, gender, blood, nationality, profilePic,
      studentId, program, year, batch, rollNo, admDate,
      designation, officeRoom, expertise
    });
    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CHANGE PASSWORD
router.put("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;