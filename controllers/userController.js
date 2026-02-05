const Merchant = require("../models/Merchant");
const FormTemplate = require("../models/FormTemplate");
const Contact = require("../models/Contact");
const StoreLog = require("../models/StoreLog");
const {
    formatMerchantId
} = require("../utils/merchantIdHelper");

/* =========================
   MERCHANT CONTROLLERS
========================= */

/**
 * Create Merchant (on app install)
 */
const createMerchant = async (req, res) => {
    try {
        const data = req.body;

        if (!data.merchantId || !data.storeName) {
            return res.status(400).json({
                success: false,
                message: "merchantId & storeName are required"
            });
        }

        // Format merchantId
        const formattedMerchantId = formatMerchantId(data.merchantId);

        // Check if merchant already exists
        const existing = await Merchant.findOne({
            merchantId: formattedMerchantId
        });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Merchant already exists"
            });
        }

        // Create merchant
        const merchant = await Merchant.create({
            ...data,
            merchantId: formattedMerchantId
        });

        // Create install log
        const installLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "install",
            ipAddress: data.ipAddress || req.ip,
            details: "App Installed",
            userAgent: data.userAgent || req.get('user-agent')
        });

        // Add log to merchant
        merchant.logs.push(installLog._id);
        await merchant.save();

        res.status(201).json({
            success: true,
            message: "Merchant created successfully",
            data: merchant
        });

    } catch (err) {
        console.error("CREATE MERCHANT ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Update Merchant
 */
const updateMerchant = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = req.body;

        // Format merchantId if provided
        if (data.merchantId) {
            data.merchantId = formatMerchantId(data.merchantId);
        }

        const merchant = await Merchant.findByIdAndUpdate(
            id,
            data, {
                new: true,
                runValidators: true
            }
        );

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        // Create update log
        const updateLog = await StoreLog.create({
            merchantId: merchant.merchantId,
            event: "update",
            ipAddress: data.ipAddress || req.ip,
            details: "Merchant updated",
            userAgent: data.userAgent || req.get('user-agent')
        });

        // Add log to merchant
        merchant.logs.push(updateLog._id);
        await merchant.save();

        res.json({
            success: true,
            message: "Merchant updated successfully",
            data: merchant
        });

    } catch (err) {
        console.error("UPDATE MERCHANT ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Get Merchant with all related data
 */
const getMerchantUsers = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const merchant = await Merchant.findOne({
                merchantId: formattedMerchantId
            })
            .populate("formTemplates")
            .populate("contacts")
            .populate("logs");

        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        res.json({
            success: true,
            message: "Merchant data fetched successfully",
            data: merchant
        });

    } catch (err) {
        console.error("GET MERCHANT ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Get All Merchants
 */
const getUsers = async (req, res) => {
    try {
        const merchants = await Merchant.find()
            .populate("formTemplates")
            .populate("contacts")
            .populate("logs");

        res.json({
            success: true,
            data: merchants
        });

    } catch (err) {
        console.error("GET USERS ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/* =========================
   FORM TEMPLATE CONTROLLERS
========================= */

/**
 * Save Form Template
 */
const saveFormTemplate = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;
        const {
            formData
        } = req.body;

        if (!formData) {
            return res.status(400).json({
                success: false,
                message: "formData is required"
            });
        }

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        // Check merchant exists
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });
        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        // Find or create form template
        let formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        const isNewForm = !formTemplate;

        if (formTemplate) {
            // Update existing form
            Object.assign(formTemplate, formData);
            await formTemplate.save();
        } else {
            // Create new form
            formTemplate = await FormTemplate.create({
                merchantId: formattedMerchantId,
                ...formData
            });

            // Add formId to merchant
            merchant.formTemplates.push(formTemplate._id);
            await merchant.save();
        }

        // Create form save log
        const formLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "form_saved",
            ipAddress: req.ip,
            details: isNewForm ? "Form template created" : "Form template updated",
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        merchant.logs.push(formLog._id);
        await merchant.save();

        res.json({
            success: true,
            message: "Form template saved successfully",
            data: formTemplate
        });

    } catch (err) {
        console.error("SAVE FORM TEMPLATE ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Get Form Template
 */
const getForms = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        if (!formTemplate) {
            return res.status(404).json({
                success: false,
                message: "Form template not found"
            });
        }

        res.json({
            success: true,
            data: formTemplate
        });

    } catch (err) {
        console.error("GET FORMS ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Update Form Template
 */
const updateForm = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;
        const {
            formData
        } = req.body;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        if (!formTemplate) {
            return res.status(404).json({
                success: false,
                message: "Form template not found"
            });
        }

        Object.assign(formTemplate, formData);
        await formTemplate.save();

        // Get merchant for log reference
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });

        // Create form update log
        const formLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "form_updated",
            ipAddress: req.ip,
            details: "Form template updated",
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        if (merchant) {
            merchant.logs.push(formLog._id);
            await merchant.save();
        }

        res.json({
            success: true,
            message: "Form updated successfully",
            data: formTemplate
        });

    } catch (err) {
        console.error("UPDATE FORM ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Delete Form Template
 */
const deleteForm = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        if (!formTemplate) {
            return res.status(404).json({
                success: false,
                message: "Form template not found"
            });
        }

        // Remove formId from merchant
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });
        if (merchant) {
            merchant.formTemplates = merchant.formTemplates.filter(
                id => id.toString() !== formTemplate._id.toString()
            );
            await merchant.save();
        }

        // Delete form template
        await FormTemplate.findByIdAndDelete(formTemplate._id);

        // Create form delete log
        const deleteLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "form_deleted",
            ipAddress: req.ip,
            details: "Form template deleted",
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        if (merchant) {
            merchant.logs.push(deleteLog._id);
            await merchant.save();
        }

        res.json({
            success: true,
            message: "Form template deleted successfully"
        });

    } catch (err) {
        console.error("DELETE FORM ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Save Single Field
 * If FormTemplate doesn't exist, creates it automatically with empty fields array
 */
const saveSingleField = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;
        const {
            fieldData
        } = req.body;

        if (!fieldData) {
            return res.status(400).json({
                success: false,
                message: "fieldData is required"
            });
        }

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        // Check merchant exists
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });
        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        // Find or create form template
        let formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        const isNewForm = !formTemplate;

        if (!formTemplate) {
            // Create new form template with empty fields array
            formTemplate = await FormTemplate.create({
                merchantId: formattedMerchantId,
                name: "",
                fields: [] // Empty fields array
            });

            // Add formId to merchant
            merchant.formTemplates.push(formTemplate._id);
            await merchant.save();
        }

        // Add new field to form template
        formTemplate.fields.push(fieldData);
        await formTemplate.save();

        // Create field save log
        const fieldLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "field_saved",
            ipAddress: req.ip,
            details: isNewForm ?
                `Form template created and field added: ${fieldData.label || 'New field'}` : `Field added: ${fieldData.label || 'New field'}`,
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        merchant.logs.push(fieldLog._id);
        await merchant.save();

        res.json({
            success: true,
            message: isNewForm ?
                "Form template created and field saved successfully" : "Field saved successfully",
            data: formTemplate.fields
        });

    } catch (err) {
        console.error("SAVE SINGLE FIELD ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Update Field
 */
const updateField = async (req, res) => {
    try {
        const {
            merchantId,
            fieldId
        } = req.params;
        const {
            fieldData
        } = req.body;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        if (!formTemplate) {
            return res.status(404).json({
                success: false,
                message: "Form template not found"
            });
        }

        const field = formTemplate.fields.id(fieldId);
        if (!field) {
            return res.status(404).json({
                success: false,
                message: "Field not found"
            });
        }

        Object.assign(field, fieldData);
        await formTemplate.save();

        // Get merchant for log reference
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });

        // Create field update log
        const fieldLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "field_updated",
            ipAddress: req.ip,
            details: `Field updated: ${field.label || fieldId}`,
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        if (merchant) {
            merchant.logs.push(fieldLog._id);
            await merchant.save();
        }

        res.json({
            success: true,
            message: "Field updated successfully",
            data: field
        });

    } catch (err) {
        console.error("UPDATE FIELD ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Delete Field
 */
const deleteField = async (req, res) => {
    try {
        const {
            merchantId,
            fieldId
        } = req.params;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        if (!formTemplate) {
            return res.status(404).json({
                success: false,
                message: "Form template not found"
            });
        }

        const field = formTemplate.fields.id(fieldId);
        if (!field) {
            return res.status(404).json({
                success: false,
                message: "Field not found"
            });
        }

        const fieldLabel = field.label || fieldId;
        field.deleteOne();
        await formTemplate.save();

        // Get merchant for log reference
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });

        // Create field delete log
        const fieldLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "field_deleted",
            ipAddress: req.ip,
            details: `Field deleted: ${fieldLabel}`,
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        if (merchant) {
            merchant.logs.push(fieldLog._id);
            await merchant.save();
        }

        res.json({
            success: true,
            message: "Field deleted successfully"
        });

    } catch (err) {
        console.error("DELETE FIELD ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Reorder Fields
 */
const reorderFields = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;
        const {
            fieldIds
        } = req.body;

        if (!fieldIds || !Array.isArray(fieldIds)) {
            return res.status(400).json({
                success: false,
                message: "fieldIds array is required"
            });
        }

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        const formTemplate = await FormTemplate.findOne({
            merchantId: formattedMerchantId
        });

        if (!formTemplate) {
            return res.status(404).json({
                success: false,
                message: "Form template not found"
            });
        }

        // Reorder fields based on fieldIds array
        const reorderedFields = fieldIds.map(fieldId => {
            return formTemplate.fields.id(fieldId);
        }).filter(Boolean);

        if (reorderedFields.length !== formTemplate.fields.length) {
            return res.status(400).json({
                success: false,
                message: "Invalid field IDs provided"
            });
        }

        formTemplate.fields = reorderedFields;
        await formTemplate.save();

        // Get merchant for log reference
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });

        // Create fields reorder log
        const reorderLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "fields_reordered",
            ipAddress: req.ip,
            details: `Fields reordered (${reorderedFields.length} fields)`,
            userAgent: req.get('user-agent')
        });

        // Add log to merchant
        if (merchant) {
            merchant.logs.push(reorderLog._id);
            await merchant.save();
        }

        res.json({
            success: true,
            message: "Fields reordered successfully",
            data: formTemplate.fields
        });

    } catch (err) {
        console.error("REORDER FIELDS ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/* =========================
   CONTACT CONTROLLERS
========================= */

/**
 * Add User / Contact (Form Submission)
 */
const addUser = async (req, res) => {
    try {
        const {
            merchantId,
            ...contactData
        } = req.body;

        console.log(req.body, "hello")

        if (!merchantId) {
            return res.status(400).json({
                success: false,
                message: "merchantId is required"
            });
        }

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        // Check merchant exists
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });
        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        // Create contact in separate collection
        const contact = await Contact.create({
            merchantId: formattedMerchantId,
            text: contactData.text || {},
            email: contactData.email || {},
            number: contactData.number || {},
            dropdown: contactData.dropdown || {},
            checkbox: contactData.checkbox || {},
            radio: contactData.radio || {},
            textarea: contactData.textarea || {},
            ipAddress: contactData.ipAddress || req.ip,
            userAgent: contactData.userAgent || req.get('user-agent')
        });

        // Add contactId to merchant
        merchant.contacts.push(contact._id);
        await merchant.save();

        // Create form submission log
        const submitLog = await StoreLog.create({
            merchantId: formattedMerchantId,
            event: "form_submitted",
            ipAddress: contactData.ipAddress || req.ip,
            details: "Contact form submitted",
            userAgent: contactData.userAgent || req.get('user-agent')
        });

        // Add log to merchant
        merchant.logs.push(submitLog._id);
        await merchant.save();

        res.status(201).json({
            success: true,
            message: "Contact added successfully",
            data: contact
        });

    } catch (err) {
        console.error("ADD USER ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/**
 * Get Contacts by Day (Pipeline/Analytics)
 */
const getContactsByDay = async (req, res) => {
    try {
        const {
            merchantId
        } = req.params;

        // Format merchantId
        const formattedMerchantId = formatMerchantId(merchantId);

        // Check merchant exists
        const merchant = await Merchant.findOne({
            merchantId: formattedMerchantId
        });
        if (!merchant) {
            return res.status(404).json({
                success: false,
                message: "Merchant not found"
            });
        }

        // Aggregate contacts by day
        const result = await Contact.aggregate([{
                $match: {
                    merchantId: formattedMerchantId
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                            timezone: "UTC"
                        }
                    },
                    totalForms: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        // Get total count
        const totalForms = await Contact.countDocuments({
            merchantId: formattedMerchantId
        });

        res.json({
            success: true,
            merchantId: formattedMerchantId,
            totalForms,
            graphData: result.map(d => ({
                date: d._id,
                totalForms: d.totalForms
            }))
        });

    } catch (err) {
        console.error("GET CONTACTS BY DAY ERROR:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
};

/* =========================
   WEBHOOK CONTROLLERS
========================= */

/**
 * Order Create Webhook (Shopify)
 */


/* =========================
   EXPORTS
========================= */

module.exports = {
    // Merchant
    createMerchant,
    updateMerchant,
    getMerchantUsers,
    getUsers,

    // Form Template
    saveFormTemplate,
    getForms,
    updateForm,
    deleteForm,
    saveSingleField,
    updateField,
    deleteField,
    reorderFields,

    // Contact
    addUser,
    getContactsByDay,

    // Webhook
    // orderCreateWebhook
};