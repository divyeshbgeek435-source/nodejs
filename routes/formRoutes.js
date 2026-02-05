const express = require("express");
const router = express.Router();

const {
  saveFormTemplate,
  getForms,
  deleteForm,
  updateForm,
  saveSingleField,
  updateField,
  deleteField,
  reorderFields
} = require("../controllers/userController");

/* ================= FORMS ================= */

// Create form
router.post("/:merchantId", saveFormTemplate);

// Get all forms
router.get("/:merchantId", getForms);  //done

// Delete form
router.delete("/:merchantId", deleteForm);

// Update full form
router.put("/:merchantId", updateForm);

// Add single field
router.post("/:merchantId/field", saveSingleField);    //done

// Update field
router.put("/:merchantId/field/:fieldId", updateField); //done

// Delete field
router.delete("/:merchantId/field/:fieldId", deleteField); //done

// Reorder fields
router.put("/:merchantId/fields/reorder", reorderFields);   //done

module.exports = router;
