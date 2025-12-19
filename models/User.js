// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   message: { type: String, required: true },
// });


// module.exports = mongoose.model("User", userSchema);


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     message: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);



// const mongoose = require("mongoose");

// const ContactSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     phone: String,
//     message: String,
//   },
//   { timestamps: true }
// );

// const MerchantSchema = new mongoose.Schema(
//   {
//     merchantId: { type: String, required: true, unique: true },
//     storeName: { type: String, required: true ,unique: true},

//     // Multiple Contact Form submissions here
//     contacts: [ContactSchema],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Merchant", MerchantSchema);



const mongoose = require("mongoose");


// new

// const OptionSchema = new mongoose.Schema({
//         label: {
//             type: String,
//             required: true
//         },
//         value: {
//             type: String,
//             required: true
//         }
//     }, {
//         _id: true
//     } // auto-generated _id for each option
// );


// const FieldSchema = new mongoose.Schema({
//     id: {
//         type: String
//     },
//     label: {
//         type: String,
//         required: true
//     },
//     type: {
//         type: String,
//         required: true
//     },
//     placeholder: {
//         type: String,
//         default: ''
//     },
//     required: {
//         type: Boolean,
//         default: false
//     },
//     options: {
//         type: [OptionSchema],
//         default: []
//     }
// }, {
//     _id: true
// });

// const FormStylesSchema = new mongoose.Schema({
//     bgColor: String,
//     labelColor: String,
//     inputBg: String,
//     inputBorder: String,
//     inputText: String,
//     buttonBg: String,
//     buttonText: String,
//     buttonRadius: Number,
//     inputRadius: Number,
//     fontFamily: String,
//     fontSize: Number,
//     shadow: String,
//     transition: String
// }, {
//     _id: false
// });

// const SubmitButtonSchema = new mongoose.Schema({
//     text: String,
//     icon: String
// }, {
//     _id: false
// });



// const FormTemplateSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         default: 'Untitled Form'
//     },
//     description: {
//         type: String,
//         default: ''
//     },
//     formSubmissionTitle: {
//         type: String,
//         default: ""
//     },
//     successdescription: {
//         type: String,
//         default: ""
//     },
//     fields: {
//         type: [FieldSchema],
//         default: []
//     },
//     meta: {
//         createdBy: {
//             type: String,
//             default: null
//         },
//         published: {
//             type: Boolean,
//             default: false
//         }
//     }
// }, {
//     timestamps: true
// });



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
    name: {
        type: String,
        default: 'Untitled Form'
    },
    description: {
        type: String,
        default: ''
    },
    formSubmissionTitle: {
        type: String,
        default: ""
    },
    successdescription: {
        type: String,
        default: ""
    },
    fields: {
        type: [FieldSchema],
        default: []
    },
    meta: {
        createdBy: {
            type: String,
            default: null
        },
        published: {
            type: Boolean,
            default: false
        }
    }
}, {
    timestamps: true
});







const ContactSchema = new mongoose.Schema({
    // name: String,
    // email: String,
    // phone: String,
    // message: String,

    // country: String,
    // subject: String,
    // dropdown: String,
    // checkbox: String,
    // radio: String,
    // textarea: String,

    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    textarea: {
        type: String,
        default: null
    },
    checkbox: {
        type: String,
        default: null
    },
    dropdown: {
        type: String,
        default: null
    },
    radio: {
        type: String,
        default: null
    },

    // name: {
    //     type: [String],
    //     default: []
    // },
    // email: {
    //     type: [String],
    //     default: []
    // },
    // phone: {
    //     type: [String],
    //     default: []
    // },
    // message: {
    //     type: [String],
    //     default: []
    // },

    // country: {
    //     type: [String],
    //     default: []
    // },
    // subject: {
    //     type: [String],
    //     default: []
    // },
    // dropdown: {
    //     type: [String],
    //     default: []
    // },
    // checkbox: {
    //     type: [String],
    //     default: []
    // },
    // radio: {
    //     type: [String],
    //     default: []
    // },
    // textarea: {
    //     type: [String],
    //     default: []
    // },


    ipAddress: String, // user IP
    userAgent: String, // device browser info
}, {
    timestamps: true
});

const StoreLogSchema = new mongoose.Schema({
    event: String, // "install", "uninstall", "form_submitted", etc.
    ipAddress: String,
    details: String, // extra message
}, {
    timestamps: true
});

const MerchantSchema = new mongoose.Schema({
    merchantId: {
        type: String,
        required: true,
        unique: true
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
    primaryDomain: {
        url: String,
        host: String,
    },
    plan: {
        displayName: String,
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
        phone: String,
    },

    // FORM Submissions
    contacts: {
        type: [ContactSchema],
        default: [],
    },

    formTemplates: {
        type: FormTemplateSchema,
        default: null
    },
    // formTemplates: {
    //     type: [FormTemplateSchema],
    //     default: []
    // },

    // TRACK INSTALL/UNINSTALL ACTIVITY
    logs: {
        type: [StoreLogSchema],
        default: [],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Merchant", MerchantSchema);