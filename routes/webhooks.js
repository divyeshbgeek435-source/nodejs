// const express = require("express");
// const crypto = require("crypto");

// const router = express.Router();

// // IMPORTANT: raw body ONLY for webhooks
// router.use(express.raw({ type: "application/json" }));


// function verifyWebhook(req, res, next) {
//   try {
//     const hmacHeader = req.get("X-Shopify-Hmac-Sha256");

//     if (!hmacHeader) {
//       return res.sendStatus(401);
//     }

//     const generatedHash = crypto
//       .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
//       .update(req.body)
//       .digest("base64");

//     const isValid = crypto.timingSafeEqual(
//       Buffer.from(generatedHash),
//       Buffer.from(hmacHeader)
//     );

//     if (!isValid) {
//       console.log("❌ Shopify HMAC mismatch");
//       return res.sendStatus(401);
//     }

//     next();
//   } catch (err) {
//     console.error("Webhook verification error:", err);
//     return res.sendStatus(401);
//   }
// }

// // Mandatory Shopify webhooks (minimal)
// router.post("/customers/data_request", verifyWebhook, (req, res) => {
//   res.sendStatus(200);
// });

// router.post("/customers/redact", verifyWebhook, (req, res) => {
//   res.sendStatus(200);
// });

// router.post("/shop/redact", verifyWebhook, (req, res) => {
//   res.sendStatus(200);
// });

// router.post("/app/uninstalled", verifyWebhook, (req, res) => {
//   console.log("App uninstalled");
//   res.sendStatus(200);
// });

// router.post("/app/scopes_update", verifyWebhook, (req, res) => {
//   console.log("App scopes updated");
//   res.sendStatus(200);
// });

// module.exports = router;






























// const express = require("express");
// const crypto = require("crypto");

// const router = express.Router();

// /**
//  * Verify Shopify Webhook
//  */
// function verifyWebhook(req, res, next) {
//   const hmac = req.headers["x-shopify-hmac-sha256"];
//   if (!hmac) return res.sendStatus(401);

//   const digest = crypto
//     .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
//     .update(req.body)
//     .digest("base64");

//   const hmacBuffer = Buffer.from(hmac, "base64");
//   const digestBuffer = Buffer.from(digest, "base64");

//   if (
//     hmacBuffer.length !== digestBuffer.length ||
//     !crypto.timingSafeEqual(digestBuffer, hmacBuffer)
//   ) {
//     return res.sendStatus(401);
//   }

//   next();
// }

// // ---------------- GDPR ----------------

// router.post(
//   "/customers/data_request",
//   express.raw({ type: "application/json" }),
//   verifyWebhook,
//   (req, res) => res.sendStatus(200)
// );

// router.post(
//   "/customers/redact",
//   express.raw({ type: "application/json" }),
//   verifyWebhook,
//   (req, res) => res.sendStatus(200)
// );

// router.post(
//   "/shop/redact",
//   express.raw({ type: "application/json" }),
//   verifyWebhook,
//   (req, res) => res.sendStatus(200)
// );

// // ---------------- APP EVENTS ----------------

// router.post(
//   "/app/uninstalled",
//   express.raw({ type: "application/json" }),
//   (req, res) => {

//     try {

//       // ⭐ VERIFY FIRST
//       const hmac = req.headers["x-shopify-hmac-sha256"];
//       if (!hmac) return res.sendStatus(401);

//       const crypto = require("crypto");

//       const digest = crypto
//         .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
//         .update(req.body)
//         .digest("base64");

//       const hmacBuffer = Buffer.from(hmac, "base64");
//       const digestBuffer = Buffer.from(digest, "base64");

//       if (
//         hmacBuffer.length !== digestBuffer.length ||
//         !crypto.timingSafeEqual(digestBuffer, hmacBuffer)
//       ) {
//         return res.sendStatus(401);
//       }

//       // ⭐ Respond immediately (VERY IMPORTANT)
//       res.sendStatus(200);

//       // ⭐ Background logic
//       setImmediate(() => {
//         try {
//           const data = JSON.parse(req.body.toString());
//           console.log("App uninstalled for shop:", data.shop);
          
//           // TODO → DB cleanup here
          
//         } catch (err) {
//           console.error("Cleanup error:", err);
//         }
//       });

//     } catch (err) {
//       console.error("Webhook crash:", err);
//       res.sendStatus(200); // Shopify retry avoid
//     }
//   }
// );



// router.post(
//   "/app/scopes_update",
//   express.raw({ type: "application/json" }),
//   verifyWebhook,
//   (req, res) => {
//     console.log("🔁 App scopes updated");
//     res.sendStatus(200);
//   }
// );

// module.exports = router;





















const express = require("express");
const crypto = require("crypto");

const router = express.Router();

/**
 * RAW BODY middleware (Shopify safe)
 */
const rawBody = express.raw({ type: "*/*" });

/**
 * Shopify Webhook Verification Middleware
 */
function verifyWebhook(req, res, next) {
  try {
    const hmac = req.headers["x-shopify-hmac-sha256"];
    if (!hmac) return res.sendStatus(401);

    const digest = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(req.body)
      .digest("base64");

    const hmacBuffer = Buffer.from(hmac, "base64");
    const digestBuffer = Buffer.from(digest, "base64");

    if (
      hmacBuffer.length !== digestBuffer.length ||
      !crypto.timingSafeEqual(digestBuffer, hmacBuffer)
    ) {
      return res.sendStatus(401);
    }

    next();
  } catch (err) {
    console.error("Webhook verification error:", err);
    return res.sendStatus(401);
  }
}

/**
 * Helper → Safe JSON Parse
 */
function parseBody(req) {
  try {
    return JSON.parse(req.body.toString());
  } catch {
    return null;
  }
}

/* =====================================================
   GDPR WEBHOOKS
===================================================== */

router.post(
  "/customers/data_request",
  rawBody,
  verifyWebhook,
  (req, res) => {
    res.sendStatus(200);

    const data = parseBody(req);
    console.log("📩 Customer data request:", data?.shop_id);

    // TODO → Provide customer data if required
  }
);

router.post(
  "/customers/redact",
  rawBody,
  verifyWebhook,
  (req, res) => {
    res.sendStatus(200);

    const data = parseBody(req);
    console.log("🧹 Customer redact:", data?.shop_id);

    // TODO → Delete customer data
  }
);

router.post(
  "/shop/redact",
  rawBody,
  verifyWebhook,
  (req, res) => {
    res.sendStatus(200);

    const data = parseBody(req);
    console.log("🏪 Shop redact:", data?.shop_id);

    // TODO → Delete shop data
  }
);

/* =====================================================
   APP EVENTS
===================================================== */

router.post(
  "/app/uninstalled",
  rawBody,
  verifyWebhook,
  (req, res) => {
    res.sendStatus(200);

    setImmediate(() => {
      try {
        const data = parseBody(req);
        console.log("❌ App uninstalled:", data?.shop);

        // TODO → Delete shop tokens
        // TODO → Delete shop DB data
        // TODO → Cancel billing
      } catch (err) {
        console.error("Uninstall cleanup error:", err);
      }
    });
  }
);

router.post(
  "/app/scopes_update",
  rawBody,
  verifyWebhook,
  (req, res) => {
    res.sendStatus(200);

    const data = parseBody(req);
    console.log("🔄 App scopes updated:", data?.shop);
  }
);

module.exports = router;

