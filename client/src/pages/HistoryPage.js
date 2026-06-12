import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getRecommendations, deleteRecommendation } from "../utils/api";

// Gemstone colour map for pills
const GEM_COLOR = {
  Ruby: "#E0115F", Emerald: "#10b981", Agate: "#6b7280",
  Pearl: "#9ca3af", Sapphire: "#0F52BA", Opal: "#06b6d4",
  Topaz: "#f59e0b", Turquoise: "#14b8a6", Garnet: "#722F37",
  Amethyst: "#9B59B6", Aquamarine: "#06b6d4",
};

const ZODIAC_EMOJI = {
  Aries:"♈", Taurus:"♉", Gemini:"♊", Cancer:"♋", Leo:"♌", Virgo:"♍",
  Libra:"♎", Scorpio:"♏", Sagittarius:"♐", Capricorn:"♑", Aquarius:"♒", Pisces:"♓",
};

const HistoryPage = () => {
  const { t } = useLang();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchHistory = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const res = await getRecommendations(page, 10);
      if (res.success) {
        setRecords(res.data);
        setPagination(res.pagination);
      }
    } catch (err) {
      setError(err.message || t("error"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { fetchHistory(1); }, [fetchHistory]);

  const handleDelete = async (id) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    setDeletingId(id);
    try {
      await deleteRecommendation(id);
      // Refresh current page; if it empties, go back one
      const newPage = records.length === 1 && pagination.page > 1
        ? pagination.page - 1
        : pagination.page;
      fetchHistory(newPage);
    } catch (err) {
      alert(err.message || t("error"));
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="history-page">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: 4 }}>
                📜 {t("historyTitle")}
              </h1>
              <p style={{ color: "var(--text-secondary)" }}>{t("historySubtitle")}</p>
            </div>
            {pagination.total > 0 && (
              <div
                style={{
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.2)",
                  borderRadius: "var(--radius-full)",
                  padding: "6px 18px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--gem-purple)",
                }}
              >
                {pagination.total} readings
              </div>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-container">
            <div className="spinner spinner-lg" />
            <p style={{ color: "var(--text-muted)" }}>{t("loading")}</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            style={{
              background: "rgba(244,63,94,0.08)",
              border: "1px solid rgba(244,63,94,0.2)",
              borderRadius: "var(--radius-md)",
              padding: "20px",
              color: "var(--gem-rose)",
              textAlign: "center",
            }}
          >
            ❌ {error}
            <br />
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }} onClick={() => fetchHistory(1)}>
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && records.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔮</div>
            <h3>{t("noHistory")}</h3>
            <p style={{ marginBottom: 24 }}>{t("noHistorySubtitle")}</p>
            <button className="btn btn-primary" onClick={() => navigate("/recommend")}>
              ✨ Get First Recommendation
            </button>
          </div>
        )}

        {/* Table */}
        {!loading && !error && records.length > 0 && (
          <>
            <div className="history-table-wrap card">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{t("name")}</th>
                    <th>{t("zodiac")}</th>
                    <th>{t("gemstone")}</th>
                    <th>{t("date")}</th>
                    <th>{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => (
                    <tr key={rec._id}>
                      <td style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                        {(pagination.page - 1) * 10 + idx + 1}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                          {rec.name}
                        </span>
                        {rec.gender && rec.gender !== "" && (
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: 6 }}>
                            ({rec.gender})
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="zodiac-cell">
                          <span style={{ fontSize: "1.2rem" }}>{ZODIAC_EMOJI[rec.zodiacSign]}</span>
                          <span>{rec.zodiacSign}</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className="gemstone-pill"
                          style={{ background: GEM_COLOR[rec.gemstoneName] || "#7c3aed" }}
                        >
                          💎 {rec.gemstoneName}
                        </span>
                      </td>
                      <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        {formatDate(rec.createdAt)}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => navigate(`/result/${rec._id}`)}
                          >
                            {t("viewDetails")}
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(rec._id)}
                            disabled={deletingId === rec._id}
                          >
                            {deletingId === rec._id ? "…" : "🗑"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => fetchHistory(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  ‹
                </button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`page-btn ${p === pagination.page ? "active" : ""}`}
                    onClick={() => fetchHistory(p)}
                  >
                    {p}
                  </button>
                ))}
                <button
                  className="page-btn"
                  onClick={() => fetchHistory(pagination.page + 1)}
                  disabled={pagination.page >= pagination.pages}
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
