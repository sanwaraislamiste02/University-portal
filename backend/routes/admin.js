const express = require("express");
const router  = express.Router();
const User    = require("../models/Users");
const bcrypt  = require("bcryptjs");

// GET ALL USERS
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE USER — with name and hashed password
router.post("/create-user", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE USER — path is /users/:id
// since server.js mounts this at /admin
// full path becomes /admin/users/:id
router.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;