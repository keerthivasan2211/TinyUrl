// routes/redirectRoutes.js
const express = require("express");
const router = express.Router();
const { handleRedirect } = require("../Controllers/redirectController.js");

// REDIRECT ROUTE (must come LAST)
router.get("/:code", handleRedirect);

module.exports = router;
