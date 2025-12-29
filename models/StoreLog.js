const mongoose = require("mongoose");

const StoreLogSchema = new mongoose.Schema({
  merchantId: {
    type: String,
    required: true,
    index: true
  },
  event: {
    type: String,
    required: true
  },
  ipAddress: String,
  userAgent: String,
  details: String
}, { timestamps: true });

module.exports = mongoose.model("StoreLog", StoreLogSchema);
