const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  fromEmail: { type: String, required: true },
  toEmail:   { type: String, required: true },
  subject:   { type: String, required: true },
  message:   { type: String, required: true },
  read:      { type: Boolean, default: false },
  reply:     { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);