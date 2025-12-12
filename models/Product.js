const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  variantId: String,
  price: String,
  barcode: String,
  inventoryQuantity: Number,
});

const productSchema = new mongoose.Schema({
  productId: String,
  title: String,
  status: String,
  createdAt: String,
  variants: [variantSchema],
});
 
module.exports = mongoose.model("Product", productSchema);