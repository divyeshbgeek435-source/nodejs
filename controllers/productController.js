const   Product  = require("../models/Product.js");
const  fetchProductsFromShopify = require("../services/shopifyService.js");

  const saveProducts = async (req, res) => {
  try {
    const edges = await fetchProductsFromShopify(req);

    for (const item of edges) {
      const node = item.node;

      await Product.findOneAndUpdate(
        { productId: node.id },
        {
          productId: node.id,
          title: node.title,
          status: node.status,
          createdAt: node.createdAt,
          variants: node.variants.edges.map((v) => ({
            variantId: v.node.id,
            price: v.node.price,
            barcode: v.node.barcode,
            inventoryQuantity: v.node.inventoryQuantity,
          })),
        },
        { upsert: true }
      );
    }

    res.json({ message: "Products saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {saveProducts};