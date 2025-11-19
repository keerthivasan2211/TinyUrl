const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection
pool.query("SELECT NOW()")
  .then(() => console.log("Connected to Neon Postgres"))
  .catch(err => console.error("Neon Connection Error:", err.message));

module.exports = pool;
