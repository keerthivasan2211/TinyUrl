import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API = `https://tinyurl-6mak.onrender.com/api/links`;

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState({ longUrl: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLinks = async () => {
    try {
      setLoadingTable(true);
      const res = await axios.get(API);
      setLinks(res.data);
    } catch {
      toast.error("Failed to load links. Check backend connection.");
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.longUrl) return toast.error("URL is required");

    try {
      new URL(form.longUrl);
    } catch {
      return toast.error("Invalid URL format");
    }

    try {
      setLoading(true);
      await axios.post(API, form);
      toast.success("Short link created!");
      setForm({ longUrl: "", code: "" });
      fetchLinks();
    } catch (error) {
      toast.error(error.response?.data?.error || "Error creating link");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (code) => {
    if (!confirm("Delete this link?")) return;

    try {
      await axios.delete(`${API}/${code}`);
      toast.success("Link deleted!");
      fetchLinks();
    } catch {
      toast.error("Failed to delete link");
    }
  };

  const copyLink = (code) => {
    const shortUrl = `https://tinyurl-6mak.onrender.com/${code}`;
    navigator.clipboard.writeText(shortUrl);
    toast.info("Copied to clipboard!");
  };

  const formatDate = (value) => {
    if (!value) return "—";
    const dateObj = new Date(value);
    if (isNaN(dateObj)) return "—";
    return dateObj.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };


  const filteredLinks = links.filter((l) => {
    const term = search.toLowerCase();
    return (
      l.code.toLowerCase().includes(term) ||
      l.long_url.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container">

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={form.longUrl}
          onChange={(e) => setForm({ ...form, longUrl: e.target.value })}
        />

        <input
          type="text"
          placeholder="Custom code (optional)"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />

        <button className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Short Link"}
        </button>
      </form>

    
      <input
        type="text"
        placeholder="Search by code or URL"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: "10px" }}
      />

   
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>URL</th>
              <th>Clicks</th>
              <th>Last Click</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          
            {loadingTable ? (
              <tr>
                <td colSpan="5" className="no-data">Loading...</td>
              </tr>
            ) : filteredLinks.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No links found</td>
              </tr>
            ) : (
              filteredLinks.map((l) => (
                <tr key={l.code}>
                  <td>{l.code}</td>
                  <td className="link-url">{l.long_url}</td>
                  <td>{l.total_clicks}</td>
                  <td>{formatDate(l.last_clicked)}</td>

                  <td className="actions">
                    <a
                      href={`/code/${l.code}`}
                      className="stats-link"
                      style={{ color: "green" }}
                    >
                      Stats
                    </a>

                    <button className="copy-btn" onClick={() => copyLink(l.code)}>
                      Copy
                    </button>

                    <button className="delete-btn" onClick={() => deleteLink(l.code)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
