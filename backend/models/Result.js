// models/Result.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentEmail: String,
  subject: String,
  grade: String
});

module.exports = mongoose.model("Result", resultSchema);