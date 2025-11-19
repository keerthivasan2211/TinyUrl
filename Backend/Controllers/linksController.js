
const pool = require("../DataBase/Db.js");


function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


function isValidCode(code) {
  return /^[A-Za-z0-9]{6,8}$/.test(code);
}


exports.createLink = async (req, res) => {
  const { longUrl, code: customCode } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }


  try {
    new URL(longUrl);
  } catch {
    return res.status(400).json({ error: "Invalid URL" });
  }

  let code = customCode || generateCode();


  if (customCode && !isValidCode(code)) {
    return res.status(400).json({ error: "Code must be 6-8 alphanumeric characters" });
  }

 
  const exists = await pool.query("SELECT 1 FROM links WHERE code=$1", [code]);
  if (exists.rowCount > 0) {
    return res.status(409).json({ error: "Code already exists" });
  }

 
  await pool.query(
    "INSERT INTO links (code, long_url) VALUES ($1, $2)",
    [code, longUrl]
  );

  return res.status(201).json({
    message: "Link created",
    code,
    shortUrl: `${process.env.BASE_URL}/${code}`
  });
};


exports.getLinks = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM links ORDER BY id DESC");
    // console.log(rows)
    res.json(rows);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getSingleLink = async (req, res) => {
  const { code } = req.params;

  const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(result.rows[0]);
};


exports.deleteLink = async (req, res) => {
  const { code } = req.params;

  const result = await pool.query(
    "DELETE FROM links WHERE code=$1 RETURNING *",
    [code]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({ message: "Link deleted" });
};



