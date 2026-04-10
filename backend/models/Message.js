// backend/models/Message.js
// what a message looks like in the database
// text message — has a sender, receiver, and content
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  fromEmail: { type: String, required: true }, // student's email
  toEmail:   { type: String, required: true }, // faculty's email
  subject:   { type: String, required: true }, // subject line
  message:   { type: String, required: true }, // actual message
  read:      { type: Boolean, default: false } // has faculty read it?
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);