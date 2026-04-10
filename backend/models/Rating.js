const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  facultyEmail:  { type: String, required: true },
  studentEmail:  { type: String, required: true },
  rating:        { type: Number, min: 1, max: 5, required: true },
  comment:       { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Rating", ratingSchema);