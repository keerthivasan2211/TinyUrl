import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

const API = "http://localhost:5000/api/links";

export default function Stats() {
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/${code}`)
      .then((res) => setLink(res.data))
      .catch(() => setLink(false));
  }, [code]);

  if (link === null)
    return (
      <div className="stats-container">
        <div className="stats-card loading-box">Loading...</div>
      </div>
    );

  if (link === false)
    return (
      <div className="stats-container">
        <div className="stats-card error-box">Link Not Found</div>
        <a href="/" className="back-link">← Back to Dashboard</a>
      </div>
    );

  return (
    <div className="stats-container">
      <h1 className="stats-title">Stats for <span>{code}</span></h1>

      <div className="stats-card">
        <div className="stats-row">
          <label>Long URL</label>
          <p className="stats-value long-url">{link.long_url}</p>
        </div>

        <div className="stats-row">
          <label>Total Clicks</label>
          <p className="stats-value">{link.total_clicks}</p>
        </div>

        <div className="stats-row">
          <label>Last Clicked</label>
          <p className="stats-value">
            {link.last_clicked
              ? new Date(link.last_clicked).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
              : "Never"}
          </p>
        </div>

        <div className="stats-row">
          <label>Created At</label>
          <p className="stats-value">
            {new Date(link.created_at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
          </p>
        </div>
      </div>

      <a href="/" className="back-link">← Back to Dashboard</a>
    </div>
  );
}
