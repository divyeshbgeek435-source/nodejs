const express = require("express");
const  {saveProducts}  = require("../controllers/productController.js");


const router = express.Router();

router.get("/save-products", saveProducts);

 
module.exports = router;
