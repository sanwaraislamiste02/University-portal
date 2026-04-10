const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  description:  { type: String, required: true },
  amount:       { type: Number, required: true },
  status:       { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
  paidAt:       { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);