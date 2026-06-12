import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/RecommendPage";
import HistoryPage from "./pages/HistoryPage";
import ResultDetailPage from "./pages/ResultDetailPage";
import "./index.css";

/**
 * Root application component.
 * Wraps the app in ThemeProvider and LanguageProvider context,
 * sets up React Router, and renders the shared Navbar.
 */
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <Navbar />
          <main>
            <Routes>
              <Route path="/"            element={<HomePage />} />
              <Route path="/recommend"   element={<RecommendPage />} />
              <Route path="/history"     element={<HistoryPage />} />
              <Route path="/result/:id"  element={<ResultDetailPage />} />
              {/* 404 fallback */}
              <Route
                path="*"
                element={
                  <div style={{ paddingTop: 120, textAlign: "center", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: "4rem" }}>🔮</div>
                    <h2 style={{ margin: "16px 0 8px", color: "var(--text-primary)" }}>Page Not Found</h2>
                    <p>The stars couldn't find this page.</p>
                    <a href="/" className="btn btn-primary" style={{ marginTop: 24, display: "inline-flex" }}>
                      Return Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Toast notifications */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "12px",
                fontFamily: "var(--font-body)",
              },
              success: { iconTheme: { primary: "#10b981", secondary: "#fff" } },
              error: { iconTheme: { primary: "#f43f5e", secondary: "#fff" } },
            }}
          />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
