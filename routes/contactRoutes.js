const express = require("express");
const router = express.Router();

const {
  addUser,
  getContactsByDay,
  // orderCreateWebhook
} = require("../controllers/userController");

/* ================= CONTACTS ================= */

// Save contact / form submission
router.post("/add-user", addUser);    // done

// Pipeline
router.get("/pipeline/:merchantId", getContactsByDay);   //done 
 
// Shopify webhook
// router.post("/webhooks/order-create", orderCreateWebhook);  //done

module.exports = router;
