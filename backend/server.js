/*const db = require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("NewsIQ Backend Running");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).send("Database query failed");
    }
    res.send("Database connection successful");
  });
});

app.get("/articles", (req, res) => {
  db.query(
    "SELECT * FROM articles ORDER BY created_at DESC",
    (err, results) => {
      if (err) {
        return res.status(500).send("Error fetching articles");
      }
      res.send(results);
    }
  );
});

app.post("/articles", (req, res) => {
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
});

// Start server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const articleRoutes = require("./routes/articleRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/articles", articleRoutes);
app.use("/analyze", aiRoutes);
// Base route
app.get("/", (req, res) => {
  res.send("NewsIQ Backend Running");
});

// Test DB route
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      return res.status(500).send("Database query failed");
    }
    res.send("Database connection successful");
  });
});

// Use article routes
app.use("/articles", articleRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});