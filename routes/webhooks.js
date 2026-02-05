const express = require("express");
const crypto = require("crypto");

const router = express.Router();

// IMPORTANT: raw body ONLY for webhooks
router.use(express.raw({ type: "application/json" }));


function verifyWebhook(req, res, next) {
  try {
    const hmacHeader = req.get("X-Shopify-Hmac-Sha256");

    if (!hmacHeader) {
      return res.sendStatus(401);
    }

    const generatedHash = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(req.body)
      .digest("base64");

    const isValid = crypto.timingSafeEqual(
      Buffer.from(generatedHash),
      Buffer.from(hmacHeader)
    );

    if (!isValid) {
      console.log("❌ Shopify HMAC mismatch");
      return res.sendStatus(401);
    }

    next();
  } catch (err) {
    console.error("Webhook verification error:", err);
    return res.sendStatus(401);
  }
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
