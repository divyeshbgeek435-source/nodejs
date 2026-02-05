const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// IMPORTANT: raw body ONLY for webhooks
router.use(express.raw({ type: "application/json" }));

function verifyWebhook(req, res, next) {
  // Check if API secret is configured
  if (!process.env.SHOPIFY_API_SECRET) {
    console.error("❌ SHOPIFY_API_SECRET is not set in environment variables");
    return res.status(500).json({ error: "Server configuration error" });
  }

  // Check if HMAC header exists
  const hmac = req.headers["x-shopify-hmac-sha256"];
  if (!hmac) {
    console.error("❌ Missing x-shopify-hmac-sha256 header");
    console.log("Available headers:", Object.keys(req.headers));
    return res.status(401).json({ error: "Missing HMAC signature" });
  }

  // Verify the body is a Buffer (raw body)
  if (!Buffer.isBuffer(req.body)) {
    console.error("❌ Request body is not a Buffer. Body type:", typeof req.body);
    return res.status(500).json({ error: "Body parsing error" });
  }

  // Calculate HMAC
  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(req.body)
    .digest("base64");

  // Compare HMACs
  if (hash !== hmac) {
    console.error("❌ HMAC verification failed");
    console.log("Expected:", hash);
    console.log("Received:", hmac);
    console.log("Shop:", req.headers["x-shopify-shop-domain"] || "unknown");
    return res.status(401).json({ error: "Invalid HMAC signature" });
  }

  console.log("✅ Webhook verified successfully for:", req.headers["x-shopify-shop-domain"] || "unknown");
  next();
}

// Mandatory Shopify webhooks (minimal)
router.post("/customers/data_request", verifyWebhook, (req, res) => {
  res.sendStatus(200);
});

router.post("/customers/redact", verifyWebhook, (req, res) => {
  res.sendStatus(200);
});

router.post("/shop/redact", verifyWebhook, (req, res) => {
  res.sendStatus(200);
});

router.post("/app/uninstalled", verifyWebhook, (req, res) => {
  console.log("App uninstalled");
  res.sendStatus(200);
});

router.post("/app/scopes_update", verifyWebhook, (req, res) => {
  console.log("App scopes updated");
  res.sendStatus(200);
});

module.exports = router;
