const express = require("express");
const router = express.Router();

const { analyzeArticle } = require("../controllers/aiController");

router.post("/", analyzeArticle);

module.exports = router;