const express = require("express");
const {
    addUser,
    getUsers,
    getMerchantUsers,
    updateMerchant,
    createMerchant,
    saveFormTemplate,
    getForms,
    deleteForm,
    updateForm,
    orderCreateWebhook,
    getContactsByDay,
    deleteField,
    updateField,
    saveSingleField,
    reorderFields
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/add-user", addUser);
router.post("/createMerchant", createMerchant);
router.put("/updateMerchant/:id", updateMerchant);
// router.get("/users", getUsers);
router.get("/users/:merchantId", getMerchantUsers);


// new

router.post("/merchant/:merchantId/form", saveFormTemplate);

// Get all forms
router.get("/merchant/:merchantId/forms", getForms);

// Delete form
router.delete("/merchant/:merchantId/form", deleteForm); //form deleted

// Update form
router.put("/merchant/:merchantId/form", updateForm); //form full updated



router.post("/merchant/:merchantId/form/field", saveSingleField); //single field saved


router.put("/merchant/:merchantId/form/field/:fieldId", updateField); //field updated

router.delete("/merchant/:merchantId/form/field/:fieldId", deleteField); //field deleted

router.post("/webhooks/order-create", orderCreateWebhook);


// new

// pipeline

router.get("/pipeline/contacts/:merchantId", getContactsByDay);




// NEW: Reorder fields
router.put('/merchant/:merchantId/form/fields/reorder', reorderFields);


module.exports = router;