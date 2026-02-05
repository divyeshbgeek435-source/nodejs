const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    label: String,
    value: String
}, {
    _id: true
});

const FieldSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    options: {
        type: [OptionSchema],
        default: []
    }
}, {
    timestamps: true
});

const FormTemplateSchema = new mongoose.Schema({
    merchantId: {
        type: String,
        required: true,
        index: true
    },

    name: {
        type: String,
        default: null
    },
    description: String,
    formSubmissionTitle: String,
    successdescription: String,

    fields: {
        type: [FieldSchema],
        default: []
    },

    meta: {
        createdBy: String,
        published: {
            type: Boolean,
            default: false
        }
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("FormTemplate", FormTemplateSchema);