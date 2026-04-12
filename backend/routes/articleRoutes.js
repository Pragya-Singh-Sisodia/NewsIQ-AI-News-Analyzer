const express = require("express");
const router = express.Router();

const {
  createArticle,
  getArticles,
  getInsights
} = require("../controllers/articleController");


router.get("/insights/all", getInsights);
// POST /articles
router.post("/", createArticle);

// GET /articles
router.get("/", getArticles);



module.exports = router;