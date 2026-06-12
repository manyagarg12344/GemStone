import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { lang, switchLang, t } = useLang();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" style={{ boxShadow: scrolled ? "0 4px 24px var(--shadow-color)" : "none" }}>
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <span>🔮</span> GemStone
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
              {t("home")}
            </Link>
          </li>
          <li>
            <Link to="/recommend" className={`nav-link ${isActive("/recommend") ? "active" : ""}`}>
              {t("getRecommendation")}
            </Link>
          </li>
          <li>
            <Link to="/history" className={`nav-link ${isActive("/history") ? "active" : ""}`}>
              {t("history")}
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Language Toggle */}
          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => switchLang("en")}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              className={`lang-btn ${lang === "hi" ? "active" : ""}`}
              onClick={() => switchLang("hi")}
              aria-label="हिन्दी में बदलें"
            >
              हि
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Mobile Hamburger */}
          <button
            className="theme-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ display: "none" }}
            id="hamburger"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bg-glass)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-color)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {[
            { to: "/", label: t("home") },
            { to: "/recommend", label: t("getRecommendation") },
            { to: "/history", label: t("history") },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${isActive(to) ? "active" : ""}`}
              style={{ display: "block", padding: "12px 16px" }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile hamburger visibility via inline media query override */}
      <style>{`
        @media (max-width: 900px) {
          #hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
