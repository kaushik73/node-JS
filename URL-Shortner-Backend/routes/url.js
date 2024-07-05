const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAllShortURL,
  handleGetURLByID,
  handleGetAnalyticsByID,
} = require("../controllers/url");
const router = express.Router();
console.log("inside route");
router.post("/", handleGenerateNewShortURL);
router.get("/", handleGetAllShortURL);
router.get("/:shortId", handleGetURLByID);
router.get("/analytics/:shortId", handleGetAnalyticsByID);

module.exports = router;
