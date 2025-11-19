
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./DataBase/Db.js");
const redirectRoutes = require("./routes/redirectRoutes.js");
const checkDB = require("./Midlleware/checkDB.js");
const app = express();
const allowedOrigins = [
  "https://tinyurlfrontend-yhlm.onrender.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());
pool.query("SELECT NOW()")
  .then(() => console.log("DB Connected Successfully"))
  .catch(err => console.error("DB Connection Failed:", err.message));

app.get("/healthz", (req, res) => {
    console.log("Health check OK");
  res.status(200).json({ ok: true, version: "1.0" });
});


app.use("/api/links", checkDB, require("./routes/linksRoutes"));


app.use("/", redirectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
