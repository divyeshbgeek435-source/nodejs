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
    orderCreateWebhook
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
router.delete("/merchant/:merchantId/form", deleteForm);

// Update form
router.put("/merchant/:merchantId/form", updateForm);

router.post("/webhooks/order-create", orderCreateWebhook);


// new

module.exports = router;