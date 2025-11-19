import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} TinyLink — Built by Keerthivasan</p>
    </footer>
  );
}
