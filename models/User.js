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


                                // ------

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
  
    // text: {
    //     type: String,
    //     default: null
    // },
    // email: {
    //     type: String,
    //     default: null
    // },
    // number: {
    //     type: String,
    //     default: null
    // },
    // textarea: {
    //     type: String,
    //     default: null
    // },
    // checkbox: {
    //     type: String,
    //     default: null
    // },
    // dropdown: {
    //     type: String,
    //     default: null
    // },
    // radio: {
    //     type: String,
    //     default: null
    // },


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
     mailsent: {
      type: Boolean,
      default: false   // false by default
    },
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