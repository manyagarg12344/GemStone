import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

// All 12 zodiac signs for the floating visual
const ZODIAC = [
  { s: "♈", l: "Aries" }, { s: "♉", l: "Taurus" }, { s: "♊", l: "Gemini" },
  { s: "♋", l: "Cancer" }, { s: "♌", l: "Leo" }, { s: "♍", l: "Virgo" },
  { s: "♎", l: "Libra" }, { s: "♏", l: "Scorpio" }, { s: "♐", l: "Sagittarius" },
  { s: "♑", l: "Capricorn" }, { s: "♒", l: "Aquarius" }, { s: "♓", l: "Pisces" },
];

// Feature cards for the info section
const FEATURES = [
  { icon: "🔮", title: "Zodiac Analysis", desc: "Accurate sign calculation from your birth date using classical astrology." },
  { icon: "💎", title: "Sacred Gemstone", desc: "Discover the gemstone the cosmos has aligned with your zodiac energy." },
  { icon: "✨", title: "AI Insights", desc: "Optional Gemini AI generates deeply personalised advice just for you." },
  { icon: "📄", title: "PDF Report", desc: "Download a beautifully formatted report to keep or share." },
  { icon: "🌟", title: "Lucky Elements", desc: "Uncover your lucky number, colour, day, flower and metal." },
  { icon: "📜", title: "History", desc: "Every reading is saved — revisit past recommendations any time." },
];

const HomePage = () => {
  const { t } = useLang();

  // Positions for floating zodiac dots around the orb
  const floatPositions = [
    { top: "8%",  left: "10%", dur: "5s",  delay: "0s"    },
    { top: "15%", left: "78%", dur: "4s",  delay: "0.5s"  },
    { top: "40%", left: "5%",  dur: "6s",  delay: "1s"    },
    { top: "60%", left: "85%", dur: "4.5s",delay: "0.3s"  },
    { top: "75%", left: "15%", dur: "5.5s",delay: "0.8s"  },
    { top: "80%", left: "70%", dur: "4s",  delay: "1.5s"  },
  ];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-content">
          {/* Left: text */}
          <div className="hero-text">
            <div className="hero-eyebrow">{t("heroEyebrow")}</div>
            <h1 className="hero-title">
              {t("heroTitle")}{" "}
              <span className="highlight">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="hero-subtitle">{t("heroSubtitle")}</p>
            <div className="hero-cta">
              <Link to="/recommend" className="btn btn-primary btn-lg">
                {t("heroCta")} →
              </Link>
              <Link to="/history" className="btn btn-outline btn-lg">
                {t("heroCtaSecondary")}
              </Link>
            </div>
          </div>

          {/* Right: animated gem orb */}
          <div className="gem-visual">
            {/* Orbiting rings */}
            <div className="gem-orbit gem-orbit-1">
              <div className="orbit-dot orbit-dot-1" />
            </div>
            <div className="gem-orbit gem-orbit-2">
              <div className="orbit-dot orbit-dot-2" />
            </div>
            <div className="gem-orbit gem-orbit-3">
              <div className="orbit-dot orbit-dot-3" />
            </div>

            {/* Central orb */}
            <div className="gem-orb">
              <div className="gem-orb-inner">🔮</div>
            </div>

            {/* Floating zodiac badges */}
            {floatPositions.map((pos, i) => (
              <div
                key={i}
                className="zodiac-float"
                style={{ top: pos.top, left: pos.left, "--dur": pos.dur, "--delay": pos.delay }}
                title={ZODIAC[i].l}
              >
                {ZODIAC[i].s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "2rem", marginBottom: 12, color: "var(--text-primary)" }}>
              Everything You Need to Know
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>
              From ancient zodiac wisdom to AI-powered personalisation — all in one place.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {FEATURES.map((f) => (
              <div key={f.title} className="card" style={{ cursor: "default" }}>
                <div className="card-body">
                  <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>{f.icon}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      marginBottom: 8,
                      color: "var(--text-primary)",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Zodiac Strip ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)" }}>
              All 12 Zodiac Signs
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
              gap: 12,
            }}
          >
            {ZODIAC.map((z) => (
              <div
                key={z.l}
                style={{
                  textAlign: "center",
                  padding: "16px 8px",
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-color)",
                  cursor: "default",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "var(--gem-purple)";
                  e.currentTarget.style.boxShadow = "0 8px 24px var(--shadow-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: 6 }}>{z.s}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                  {z.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section style={{ background: "var(--gradient-hero)", padding: "80px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "2.2rem", color: "white", marginBottom: 16 }}>
            Ready to Discover Your Stone?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32, fontSize: "1.1rem" }}>
            It takes under a minute. The cosmos has been waiting.
          </p>
          <Link to="/recommend" className="btn btn-primary btn-lg">
            🔮 Get My Gemstone Recommendation
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer
        style={{
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border-color)",
          padding: "32px 24px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
        }}
      >
        <p>🔮 GemStone App</p>
        <p style={{ marginTop: 6, opacity: 0.7 }}>
          © {new Date().getFullYear()} · Cosmic Gemstone Recommendations
        </p>
      </footer>
    </>
  );
};

export default HomePage;
