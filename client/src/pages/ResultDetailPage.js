import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { getRecommendationById } from "../utils/api";
import ResultCard from "../components/ResultCard";

const ResultDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getRecommendationById(id);
        if (res.success) setData(res.data);
        else setError(res.message || t("error"));
      } catch (err) {
        setError(err.message || t("error"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, t]);

  if (loading) {
    return (
      <div className="result-page">
        <div className="loading-container">
          <div className="spinner spinner-lg" />
          <p style={{ color: "var(--text-muted)" }}>{t("loading")}</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="result-page">
        <div className="container" style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>😔</div>
          <h2 style={{ color: "var(--text-primary)", marginBottom: 8 }}>Recommendation Not Found</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/history")}>
            ← Back to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="result-page">
      {/* Back link */}
      <div style={{ position: "relative", zIndex: 5 }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "12px 24px 0",
          }}
        >
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate("/history")}
            style={{ marginBottom: 4 }}
          >
            ← {t("history")}
          </button>
        </div>
      </div>
      <ResultCard data={data} onBack={() => navigate("/recommend")} />
    </div>
  );
};

export default ResultDetailPage;
