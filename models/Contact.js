const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({

    merchantId: {
        type: String,
        required: true,
        index: true
    },

    text: {
        type: Map,
        of: String,
        default: {}
    },
    email: {
        type: Map,
        of: String,
        default: {}
    },
    number: {
        type: Map,
        of: String,
        default: {}
    },
    textarea: {
        type: Map,
        of: String,
        default: {}
    },
    checkbox: {
        type: Map,
        of: String,
        default: {}
    },
    dropdown: {
        type: Map,
        of: String,
        default: {}
    },
    radio: {
        type: Map,
        of: String,
        default: {}
    },

    ipAddress: String,
    userAgent: String

}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", ContactSchema);