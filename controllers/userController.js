// const  User = require("../models/User.js");

//  const addUser = async (req, res) => {
//   try {
//     const { name, email, phone,message } = req.body;

//     const user = await User.create({ name, email, phone,message });

//     res.status(201).json({
//       success: true,
//       message: "User Created Successfully",
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Error occurred" });
//   }
// };

//  const getUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };



// module.exports = {addUser,getUsers};


// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// const addUser = async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !phone || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     console.log(name, email, phone, message);

//     // Save to MongoDB
//     const user = await User.create({ name, email, phone, message });

//     // Send email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "divyeshbgeek435@gmail.com",       // Change here
//         pass: "vjdtvgmtcrgweqjz",         // Gmail App Password
//       },
//     });

//     const mailOptions = {
//       from: "yourgmail@gmail.com",
//       to: "divyeshbgeek435@gmail.com",
//       subject: "New Contact Form Lead",
//       text: `
//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone}
//         Message: ${message}
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(201).json({
//       success: true,
//       message: "Data saved & Email sent successfully",
//       data: user,
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };


// const addUser = async (req, res) => {
//   try {
//     const { merchantId, storeName, name, email, phone, message } = req.body;

//     if (!merchantId || !storeName) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check merchant exists
//     let merchant = await User.findOne({ merchantId });

//     if (!merchant) {
//       merchant = new User({
//         merchantId,
//         storeName,
//         contacts: [],
//       });
//     }

//     // Push contact data into array
//     merchant.contacts.push({ name, email, phone, message });

//     await merchant.save();

//     // Email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "divyeshbgeek435@gmail.com",
//         pass: "vjdtvgmtcrgweqjz",
//       },
//     });

//     await transporter.sendMail({
//       from: "divyeshbgeek435@gmail.com",
//       to: "divyeshbgeek435@gmail.com",
//       subject: `New Lead from ${storeName}`,
//       text: `
//         Store: ${storeName}
//         Merchant ID: ${merchantId}
//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone}
//         Message: ${message}
//       `,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Form submitted & grouped under merchant",
//       data: merchant,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };






// const User = require("../models/User.js");
// const nodemailer = require("nodemailer");

// const createMerchant = async (req, res) => {
//   try {
//     const { merchantId, storeName } = req.body;

//     if (!merchantId || !storeName) {
//       return res.status(400).json({
//         success: false,
//         message: "merchantId & storeName both required",
//       });
//     }

//     // Check unique merchant
//     const existing = await User.findOne({ merchantId });
//     if (existing) {
//       return res.status(409).json({
//         success: false,
//         message: "Merchant already exists",
//       });
//     }

//     const merchant = await User.create({
//       merchantId,
//       storeName,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Merchant created successfully",
//       data: merchant,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// const addUser = async (req, res) => {
//   try {
//     const { merchantId, storeName, name, email, phone, message } = req.body;

//     // Field validation (empty check)
//     if (!merchantId || !storeName ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Check if merchant already exists
//     let merchant = await User.findOne({ merchantId, storeName });

//     // If merchant not exists create new
//     if (!merchant) {
//       console.log("New merchant created");
//       merchant = new User({
//         merchantId,
//         storeName,
//         contacts: [],
//       });
//       await merchant.save();
//     }

//     // Check Duplicate Contact (optional)
//     const existingContact = merchant.contacts.find(
//       (c) => c.email === email && c.phone === phone
//     );

//     if (existingContact) {
//       return res.status(409).json({
//         success: false,
//         message: "This contact already exists under this merchant.",
//       });
//     }

//     // Add new contact
//     merchant.contacts.push({ name, email, phone, message });
//     await merchant.save();

//     // Email send
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "divyeshbgeek435@gmail.com",
//         pass: "vjdtvgmtcrgweqjz",
//       },
//     });

//     await transporter.sendMail({
//       from: "divyeshbgeek435@gmail.com",
//       to: "divyeshbgeek435@gmail.com",
//       subject: `New Lead from ${storeName}`,
//       text: `
//         Store: ${storeName}
//         Merchant ID: ${merchantId}
//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone}
//         Message: ${message}
//       `,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Form submitted & grouped under merchant",
//       data: merchant,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// const getMerchantUsers = async (req, res) => {
//   const { merchantId } = req.params;

//   const merchant = await Merchant.findOne({ merchantId });

//   res.json(merchant.contacts);
// };

// const getUsers = async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// };

// module.exports = { addUser, getUsers ,getMerchantUsers ,createMerchant};



const Merchant = require("../models/User.js");
const nodemailer = require("nodemailer");

// ======================= CREATE MERCHANT (ON APP INSTALL) =======================
const createMerchant = async (req, res) => {
    try {
        const {
            merchantId,
            storeName,
            name,
            whatsappNumber,
            contactEmail,
            myshopifyDomain,
            primaryDomain,
            plan,
            currencyCode,
            timezoneOffset,
            billingAddress,
            ipAddress,
            userAgent
        } = req.body;

        if (!merchantId || !storeName) {
            return res.status(400).json({
                success: false,
                message: "merchantId & storeName are required",
            });
        }

        // Check merchant exists
        const existing = await Merchant.findOne({
            merchantId
        });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Merchant already exists",
            });
        }

        // Create merchant with full Shopify store info
        const merchant = await Merchant.create({
            merchantId,
            storeName,
            name,
            whatsappNumber,
            contactEmail,
            myshopifyDomain,
            primaryDomain,
            plan,
            currencyCode,
            timezoneOffset,
            billingAddress,
            logs: [{
                event: "install",
                ipAddress,
                details: "App Installed",
                userAgent
            }]
        });

        res.status(201).json({
            success: true,
            message: "Merchant created successfully",
            data: merchant,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const updateMerchant = async (req, res) => {
    try {
        const {
            id
        } = req.params; // /merchant/update/:id

        const {
            storeName,
            name,
            whatsappNumber,
            contactEmail,
            myshopifyDomain,
            primaryDomain,
            plan,
            currencyCode,
            timezoneOffset,
            billingAddress,
            ipAddress,
            userAgent
        } = req.body;

        // Check _id exists
        const existing = await Merchant.findById(id);
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        // Update merchant
        const updatedMerchant = await Merchant.findByIdAndUpdate(
            id, {
                storeName,
                name,
                contactEmail,
                myshopifyDomain,
                whatsappNumber,
                primaryDomain,
                plan,
                currencyCode,
                timezoneOffset,
                billingAddress,
                $push: {
                    logs: {
                        event: "update",
                        ipAddress,
                        userAgent,
                        details: "Merchant updated",
                        date: new Date(),
                    }
                },
            }, {
                new: true
            } // return updated doc
        );

        res.status(200).json({
            success: true,
            message: "Merchant updated successfully",
            data: updatedMerchant,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


// ======================= ADD CONTACT FORM SUBMISSION =======================
const addUser = async (req, res) => {
    try {
        const {
            merchantId,
            storeName,
            name,
            email,
            phone,
            message,
            ipAddress,
            userAgent
        } = req.body;

        if (!merchantId || !storeName) {
            return res.status(400).json({
                success: false,
                message: "merchantId and storeName required",
            });
        }

        // Check merchant
        let merchant = await Merchant.findOne({
            merchantId
        });

        // if merchant not exists create new one temporarily
        if (!merchant) {
            merchant = await Merchant.create({
                merchantId,
                storeName,
                contacts: [],
            });
        }

        // Optional duplicate check


        // Add contact
        merchant.contacts.push({
            name,
            email,
            phone,
            message,
            ipAddress,
            userAgent
        });

        // Add log record
        merchant.logs.push({
            event: "form_submitted",
            ipAddress,
            details: `${name} submitted contact form`
        });

        await merchant.save();

        // EMAIL SEND
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "divyeshbgeek435@gmail.com",
                pass: "vjdtvgmtcrgweqjz",
            },
        });

        await transporter.sendMail({
            from: "divyeshbgeek435@gmail.com",
            to: "divyeshbgeek435@gmail.com",
            subject: `New Lead from ${storeName}`,
            text: `
        Store: ${storeName}
        Merchant ID: ${merchantId}
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
        IP: ${ipAddress}
      `,
        });

        res.status(201).json({
            success: true,
            message: "Contact added successfully",
            data: merchant,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// ======================= GET ALL CONTACTS OF ONE MERCHANT =======================
const getMerchantUsers = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        // Extract numeric ID
        const cleanId = merchantId.split("/").pop();

        // Find merchant using full or numeric id
        const merchant = await Merchant.findOne({
            $or: [{
                    merchantId: merchantId
                }, // full gid://shopify/Shop/xxxx
                {
                    merchantId: `gid://shopify/Shop/${cleanId}`
                } // convert number to full id
            ]
        });

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Merchant data fetched successfully",
            data: merchant
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};



// ======================= GET ALL MERCHANTS =======================
const getUsers = async (req, res) => {
    const users = await Merchant.find();
    res.json(users);
};


// new


// const saveFormTemplate = async (req, res) => {
//     try {
//         const {
//             merchantId
//         } = req.params;
//         const {
//             storeName,
//             formData
//         } = req.body;

//         if (!storeName || !formData) {
//             return res.status(400).json({
//                 success: false,
//                 message: "storeName and formData are required",
//             });
//         }

//         console.log(merchantId, storeName,
//             formData)

//         let merchantIddata = "gid://shopify/Shop/" + merchantId;

//         console.log(merchantIddata)

//         // Validate Merchant
//         const merchant = await Merchant.findOne({
//             merchantId: merchantIddata,
//             storeName
//         });

//         console.log(merchant, "rbhferhf")

//         if (!merchant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Invalid merchantId or storeName",
//             });
//         }

//         // Push new form
//         merchant.formTemplates.push(formData);

//         await merchant.save();

//         res.json({
//             success: true,
//             message: "Form template saved successfully",
//             formTemplates: merchant.formTemplates,
//         });
//     } catch (error) {
//         console.error("SAVE FORM ERROR:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//         });
//     }
// };


const saveFormTemplate = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;
        const {
            storeName,
            formData
        } = req.body;

        if (!storeName || !formData) {
            return res.status(400).json({
                success: false,
                message: "storeName and formData are required",
            });
        }

        const merchantIddata = "gid://shopify/Shop/" + merchantId;

        const merchant = await Merchant.findOne({
            merchantId: merchantIddata,
            storeName
        });

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        console.log(merchant, "merchant")

        merchant.formTemplates = formData; // store single object

        await merchant.save();

        res.json({
            success: true,
            message: "Form template saved",
            formTemplate: merchant.formTemplates
        });

    } catch (error) {
        console.error("SAVE FORM ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =============================
// GET ALL FORMS BY MERCHANT
// =============================
// const getForms = async (req, res) => {
//     try {
//         const {
//             merchantId
//         } = req.params;

//         const merchant = await Merchant.findOne({
//             merchantId
//         });

//         if (!merchant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Merchant not found",
//             });
//         }

//         res.json({
//             success: true,
//             forms: merchant.formTemplates,
//         });
//     } catch (error) {
//         console.error("GET FORMS ERROR:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };

const getForms = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        const merchantIddata = "gid://shopify/Shop/" + merchantId;

        const merchant = await Merchant.findOne({
            merchantId: merchantIddata
        });

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        res.json({
            success: true,
            formTemplate: merchant.formTemplates,
        });

    } catch (error) {
        console.error("GET FORM ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =============================
// DELETE A FORM
// =============================
// const deleteForm = async (req, res) => {
//     try {
//         const {
//             merchantId,
//             formId
//         } = req.params;


//         const merchant = await Merchant.findOne({
//             merchantId: merchantIddata
//         });

//         if (!merchant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Merchant not found",
//             });
//         }

//         merchant.formTemplates = merchant.formTemplates.filter(
//             (f) => f._id.toString() !== formId
//         );

//         await merchant.save();

//         res.json({
//             success: true,
//             message: "Form deleted successfully",
//         });
//     } catch (err) {
//         console.error("DELETE FORM ERROR:", err);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };

const deleteForm = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        const merchantIddata = "gid://shopify/Shop/" + merchantId;

        const merchant = await Merchant.findOne({
            merchantId: merchantIddata
        });

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        merchant.formTemplates = null; // reset

        await merchant.save();

        res.json({
            success: true,
            message: "Form template deleted",
        });

    } catch (error) {
        console.error("DELETE FORM ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// =============================
// UPDATE A FORM TEMPLATE
// =============================
// const updateForm = async (req, res) => {
//     try {
//         const {
//             merchantId,
//             formId
//         } = req.params;
//         const {
//             formData
//         } = req.body;

//         const merchant = await Merchant.findOne({
//             merchantId
//         });

//         if (!merchant) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Merchant not found",
//             });
//         }

//         let form = merchant.formTemplates.id(formId);
//         if (!form) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Form not found",
//             });
//         }

//         Object.assign(form, formData);

//         await merchant.save();

//         res.json({
//             success: true,
//             message: "Form updated successfully",
//             form,
//         });
//     } catch (error) {
//         console.error("UPDATE FORM ERROR:", error);
//         res.status(500).json({
//             success: false,
//             message: "Server error"
//         });
//     }
// };


const updateForm = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;
        const {
            formData
        } = req.body;

        const merchantIddata = "gid://shopify/Shop/" + merchantId;

        const merchant = await Merchant.findOne({
            merchantId: merchantIddata
        });

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found",
            });
        }

        if (!merchant.formTemplates) {
            return res.status(404).json({
                success: false,
                message: "No form template exists to update",
            });
        }

        Object.assign(merchant.formTemplates, formData);

        await merchant.save();

        res.json({
            success: true,
            message: "Form updated successfully",
            formTemplate: merchant.formTemplates,
        });

    } catch (error) {
        console.error("UPDATE FORM ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


// new



module.exports = {
    addUser,
    getUsers,
    getMerchantUsers,
    createMerchant,
    updateMerchant,
    saveFormTemplate,
    getForms,
    deleteForm,
    updateForm
};