const pool = require("../DataBase/Db");

module.exports = async function checkDB(req, res, next) {
  try {
    await pool.query("SELECT 1"); 
    next(); 
  } catch (err) {
    console.error("❌ Database is DOWN:", err.message);
    return res.status(500).json({
      ok: false,
      error: "Database connection failed. Try again later.",
    });
  }
};
