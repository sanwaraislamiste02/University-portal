const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:        { type: String, default: "" },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  role:        { type: String, enum: ["student","faculty","admin"], default: "student" },
  profilePic:  { type: String, default: "" },
  phone:       { type: String, default: "" },
  age:         { type: String, default: "" },
  department:  { type: String, default: "" },
  address:     { type: String, default: "" },
  dob:         { type: String, default: "" },
  gender:      { type: String, default: "" },
  blood:       { type: String, default: "" },
  nationality: { type: String, default: "" },
  studentId:   { type: String, default: "" },
  program:     { type: String, default: "" },
  year:        { type: String, default: "" },
  batch:       { type: String, default: "" },
  rollNo:      { type: String, default: "" },
  admDate:     { type: String, default: "" },
  designation: { type: String, default: "" },
  officeRoom:  { type: String, default: "" },
  expertise:   { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);