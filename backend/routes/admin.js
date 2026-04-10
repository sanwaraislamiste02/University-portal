const express = require("express");
const router = express.Router();
const User = require("../models/Users");

//  GET ALL USERS
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// CREATE FACULTY / ADMIN
router.post("/create-user", async (req, res) => {
  const { email, password, role } = req.body;

  const user = new User({ email, password, role });
  await user.save();

  res.json({ message: "User created" });
});

module.exports = router;