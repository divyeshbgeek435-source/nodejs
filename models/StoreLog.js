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
}, {
    timestamps: true
});

StoreLogSchema.index({
    createdAt: 1
}, {
    expireAfterSeconds: 2592000
}); // 30 days = 2592000 seconds            60 * 60 * 24 * 30 = 2592000 seconds  


module.exports = mongoose.model("StoreLog", StoreLogSchema);