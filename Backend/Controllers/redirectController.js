
const pool = require("../DataBase/Db.js");


exports.handleRedirect = async (req, res) => {
  const { code } = req.params;

  const result = await pool.query("SELECT * FROM links WHERE code=$1", [code]);

  if (result.rowCount === 0) {
    return res.status(404).send("Not Found");
  }

  const link = result.rows[0];

 
  await pool.query(
    "UPDATE links SET total_clicks = total_clicks + 1, last_clicked = NOW() WHERE code=$1",
    [code]
  );

  return res.redirect(302, link.long_url);
};
