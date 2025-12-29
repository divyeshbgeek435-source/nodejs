const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
    merchantId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    storeName: {
        type: String,
        required: true
    },

    // Shopify store details
    name: String,
    contactEmail: String,
    myshopifyDomain: String,
    whatsappNumber: String,

    mailsent: {
        type: Boolean,
        default: false
    },

    primaryDomain: {
        url: String,
        host: String
    },

    plan: {
        displayName: String
    },

    currencyCode: String,
    timezoneOffset: Number,

    billingAddress: {
        address1: String,
        country: String,
        city: String,
        zip: String,
        province: String,
        company: String,
        phone: String
    },

    // 🔗 References to separate collections
    formTemplates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FormTemplate"
    }],

    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact"
    }],

    logs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreLog"
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model("Merchant", MerchantSchema);