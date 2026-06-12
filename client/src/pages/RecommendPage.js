import React, { useState } from "react";
import { useLang } from "../context/LanguageContext";
import RecommendForm from "../components/RecommendForm";
import ResultCard from "../components/ResultCard";

const RecommendPage = () => {
  const { t } = useLang();
  const [result, setResult] = useState(null);

  const handleSuccess = (data) => {
    setResult(data);
    // Scroll to top to show result hero
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    return (
      <div className="result-page">
        <ResultCard data={result} onBack={handleReset} />
      </div>
    );
  }

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-page-header">
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔮</div>
          <h1>{t("formTitle")}</h1>
          <p>{t("formSubtitle")}</p>
        </div>

        <div className="form-card card">
          <div className="card-body">
            <RecommendForm onSuccess={handleSuccess} />
          </div>
        </div>

        {/* Informational note below form */}
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            marginTop: 20,
            maxWidth: 400,
            margin: "20px auto 0",
          }}
        >
          🔒 Your data is stored only for history purposes and never shared.
        </p>
      </div>
    </div>
  );
};

export default RecommendPage;
