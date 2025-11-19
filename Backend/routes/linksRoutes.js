
const express = require("express");
const router = express.Router();

const {
  createLink,
  getLinks,
  getSingleLink,
  deleteLink
} = require("../Controllers/linksController.js");


router.post("/", createLink);
router.get("/", getLinks);
router.get("/:code", getSingleLink);
router.delete("/:code", deleteLink);

module.exports = router;
