const express = require("express");
const router = express.Router();

const merchantRoutes = require("./merchantRoutes");
const formRoutes = require("./formRoutes");
const contactRoutes = require("./contactRoutes");

router.use("/merchant", merchantRoutes);
router.use("/form", formRoutes);
router.use("/contact", contactRoutes);

module.exports = router;
