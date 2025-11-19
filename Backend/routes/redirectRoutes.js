
const express = require("express");
const router = express.Router();
const { handleRedirect } = require("../Controllers/redirectController.js");


router.get("/:code", handleRedirect);

module.exports = router;
