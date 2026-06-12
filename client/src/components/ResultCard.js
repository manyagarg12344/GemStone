import React, { useRef } from "react";
import { useLang } from "../context/LanguageContext";
import { generatePDF } from "../utils/pdfGenerator";
import GemVisual from "./GemVisual";

// ── Gemstone emoji mapping ────────────────────────────────────────────────────
const GEM_EMOJI = {
  Ruby: "🔴", Emerald: "💚", Agate: "🪨", Pearl: "⚪",
  Sapphire: "🔵", Opal: "🌈", Topaz: "🟠", Turquoise: "🩵",
  Garnet: "🟣", Amethyst: "💜", Aquamarine: "🩶",
};

// ── Colour mapping for gemstone pills ────────────────────────────────────────
const GEM_BG = {
  Ruby: "#E0115F", Emerald: "#10b981", Agate: "#6b7280",
  Pearl: "#9ca3af", Sapphire: "#0F52BA", Opal: "#7dd3fc",
  Topaz: "#f59e0b", Turquoise: "#14b8a6", Garnet: "#722F37",
  Amethyst: "#9B59B6", Aquamarine: "#06b6d4",
};

/**
 * ResultCard — renders the complete recommendation result.
 * Receives the full data object returned by the API.
 */
const ResultCard = ({ data, onBack }) => {
  const { t } = useLang();
  const cardRef = useRef(null);

  const {
    name, dob, zodiacSign, zodiacInfo,
    gemstoneName, gemstoneInfo, luckyInfo, aiAdvice,
  } = data;

  const gemColor = gemstoneInfo?.color || "#7c3aed";
  const gemEmoji = GEM_EMOJI[gemstoneName] || "💎";

  const handleDownload = () => generatePDF(data);

  const dobFormatted = dob
    ? new Date(dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "";

  return (
    <div ref={cardRef}>
      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div className="result-hero">
        <div className="result-hero-content">
          <span className="result-zodiac-emoji">{zodiacInfo?.emoji}</span>
          <h1>✨ {name}</h1>
          <p>{t("yourSign")}: <strong>{zodiacSign}</strong> &nbsp;•&nbsp; {dobFormatted}</p>
        </div>
      </div>

      <div className="result-grid">

        {/* ── Gemstone Showcase ────────────────────────────── */}
        <div className="card result-main animate-fade-in">
          <div className="card-body">
            <div className="gemstone-showcase">
              {/* Visual */}
              <div className="gemstone-visual">
                <GemVisual
                  color={gemColor}
                  size={160}
                  emoji={gemEmoji}
                  name={gemstoneName}
                />
                <div className="gemstone-name-badge">
                  <span
                    className="gemstone-color-dot"
                    style={{ background: gemColor }}
                  />
                  {gemstoneInfo?.colorName}
                </div>
              </div>

              {/* Info */}
              <div className="gemstone-info" style={{ flex: 1 }}>
                <div className="zodiac-badge">
                  {zodiacInfo?.emoji} {zodiacSign} &nbsp;→&nbsp; {gemstoneName}
                </div>
                <h2>{gemstoneName}</h2>
                <p className="gemstone-description">{gemstoneInfo?.description}</p>

                <div className="gemstone-meta">
                  <span className="meta-chip">🌍 {gemstoneInfo?.origin}</span>
                  <span className="meta-chip">💎 {gemstoneInfo?.hardness}</span>
                  <span className="meta-chip">🧘 {gemstoneInfo?.chakra}</span>
                  <span className="meta-chip">🌿 {zodiacInfo?.element}</span>
                  <span className="meta-chip">🪐 {zodiacInfo?.planet}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Benefits ─────────────────────────────────────── */}
        <div className="card animate-fade-in animate-delay-1">
          <div className="card-body">
            <h3 className="section-title">✨ {t("benefits")}</h3>
            <ul className="benefits-list">
              {(gemstoneInfo?.benefits || []).map((b, i) => (
                <li key={i} className="benefit-item">
                  <span className="benefit-icon">◆</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Lucky Elements ───────────────────────────────── */}
        <div className="card animate-fade-in animate-delay-1">
          <div className="card-body">
            <h3 className="section-title">🍀 {t("luckyElements")}</h3>
            <div className="lucky-grid">
              <div className="lucky-item">
                <span className="lucky-icon">🔢</span>
                <span className="lucky-label">{t("luckyNumber")}</span>
                <span className="lucky-value">{luckyInfo?.number}</span>
              </div>
              <div className="lucky-item">
                <span className="lucky-icon">🎨</span>
                <span className="lucky-label">{t("luckyColor")}</span>
                <span className="lucky-value">{luckyInfo?.color}</span>
              </div>
              <div className="lucky-item">
                <span className="lucky-icon">📅</span>
                <span className="lucky-label">{t("luckyDay")}</span>
                <span className="lucky-value">{luckyInfo?.day}</span>
              </div>
              <div className="lucky-item">
                <span className="lucky-icon">🌸</span>
                <span className="lucky-label">Flower</span>
                <span className="lucky-value">{luckyInfo?.flower}</span>
              </div>
              <div className="lucky-item">
                <span className="lucky-icon">⚙️</span>
                <span className="lucky-label">Metal</span>
                <span className="lucky-value">{luckyInfo?.metal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Who Should Wear + Zodiac ─────────────────────── */}
        <div className="card animate-fade-in animate-delay-2">
          <div className="card-body">
            <h3 className="section-title">👤 {t("whoShouldWear")}</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 24 }}>
              {gemstoneInfo?.whoShouldWear}
            </p>

            <h3 className="section-title">🌟 Zodiac Insight</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {zodiacInfo?.description}
            </p>
          </div>
        </div>

        {/* ── Care Instructions ────────────────────────────── */}
        <div className="card animate-fade-in animate-delay-2">
          <div className="card-body">
            <h3 className="section-title">🧼 {t("careInstructions")}</h3>
            <div
              style={{
                background: "var(--bg-primary)",
                borderRadius: "var(--radius-md)",
                padding: "16px",
                borderLeft: "3px solid var(--gem-emerald)",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                fontSize: "0.9rem",
              }}
            >
              {gemstoneInfo?.careInstructions}
            </div>
          </div>
        </div>

        {/* ── AI Advice (conditional) ──────────────────────── */}
        {aiAdvice && (
          <div className="card ai-advice-card animate-fade-in animate-delay-3" style={{ gridColumn: "1 / -1" }}>
            <div className="card-body">
              <div className="ai-badge">🤖 AI Powered</div>
              <h3 className="section-title">{t("aiAdvice")}</h3>
              <p className="ai-advice-text">"{aiAdvice}"</p>
            </div>
          </div>
        )}

        {/* ── Actions ─────────────────────────────────────── */}
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", padding: "8px 0 24px" }}>
          <button className="btn btn-primary btn-lg pdf-report-btn" onClick={handleDownload}>
            📄 {t("downloadPdf")}
          </button>
          <button className="btn btn-secondary btn-lg" onClick={onBack}>
            🔮 {t("newRecommendation")}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultCard;
