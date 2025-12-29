const express = require("express");
const router = express.Router();

const {
  createMerchant,
  updateMerchant,
  getMerchantUsers,
  getUsers
} = require("../controllers/userController");

/* ================= MERCHANT ================= */

// Create merchant
router.post("/create", createMerchant);   //done

// Update merchant by ID
router.put("/update/:id", updateMerchant);   //done  
 
// Get merchant by merchantId (with all related data)
router.get("/users/:merchantId", getMerchantUsers);       //done

// Get all merchants
router.get("/all", getUsers);

module.exports = router;
