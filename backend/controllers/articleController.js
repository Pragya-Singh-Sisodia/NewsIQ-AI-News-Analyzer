const db = require("../config/db");

// CREATE ARTICLE
exports.createArticle = (req, res) => {
  const { title, url, original_text } = req.body;

  const sql =
    "INSERT INTO articles (title, url, original_text) VALUES (?, ?, ?)";

  db.query(sql, [title, url, original_text], (err, result) => {
    if (err) {
      return res.status(500).send("Error saving article");
    }

    res.send({
      message: "Article saved successfully",
      articleId: result.insertId,
    });
  });
};

// GET ARTICLES
exports.getArticles = (req, res) => {
  db.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching articles");
      }

      res.send(results);
    }
  );
};


exports.getInsights = (req, res) => {
  const sql = `
    SELECT 
      insights.id,
      insights.summary,
      insights.key_points,
      insights.why_matters,
      insights.exam_notes,
      insights.simplified,
      insights.bias,
      insights.relevance_score,
      insights.created_at,
      articles.title
    FROM insights
    JOIN articles ON insights.article_id = articles.id
    ORDER BY insights.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching insights");
    }

    res.send(results);
  });
};

exports.getInsights = (req, res) => {
  const sql = `
    SELECT 
      insights.id,
      insights.summary,
      insights.key_points,
      insights.why_matters,
      insights.exam_notes,
      insights.simplified,
      insights.bias,
      insights.relevance_score,
      insights.created_at,
      articles.title
    FROM insights
    JOIN articles ON insights.article_id = articles.id
    ORDER BY insights.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching insights");
    }

    res.send(results);
  });
};