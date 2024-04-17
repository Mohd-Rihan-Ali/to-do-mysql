const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const port = 8800;

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rihan@4130",
  database: "todo_db",
  insecureAuth: true,
});

connection.connect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    connection.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hash],
      (error, results) => {
        if (error) {
          console.error("Error signing up:", error);
          return res.status(400).json({ error: "Username already exists" });
        }
        res.json({ message: "Signup successful" });
      }
    );
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
      bcrypt.compare(password, results[0].password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (!result) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        res.json({ message: "Login successful", userId: results[0].id });
      });
    }
  );
});

// Tasks routes
app.get("/tasks/:userId", (req, res) => {
  const userId = req.params.userId;
  connection.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [userId],
    (error, results) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.post("/task/:userId", (req, res) => {
  const { date, task } = req.body;
  const userId = req.params.userId;
  connection.query(
    "INSERT INTO tasks (date, task, user_id) VALUES (?, ?, ?)",
    [date, task, userId],
    (error, results) => {
      if (error) throw error;
      res.json({ id: results.insertId, date, task });
    }
  );
});

app.delete("/task/:userId/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  connection.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId],
    (error, results) => {
      if (error) throw error;
      res.json({ id });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
