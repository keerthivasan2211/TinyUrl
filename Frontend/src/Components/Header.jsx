import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          TinyLink
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-item">Dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
