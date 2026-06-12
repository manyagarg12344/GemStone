import React from "react";

/**
 * Renders an SVG gemstone shape with a glow effect.
 * The gem color is derived from the gemstone's hex color.
 *
 * @param {string} color  - Hex color of the gemstone
 * @param {number} size   - Size in pixels (default 120)
 * @param {string} emoji  - Emoji to render inside (default 💎)
 */
const GemVisual = ({ color = "#7c3aed", size = 120, emoji = "💎", name = "" }) => {
  // const id = `gem-${name.replace(/\s/g, "")}`;
  // const half = size / 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35) 0%, ${color}cc 50%, ${color} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        boxShadow: `0 0 ${size * 0.3}px ${color}88, 0 0 ${size * 0.6}px ${color}33, inset 0 0 ${size * 0.2}px rgba(255,255,255,0.2)`,
        border: `2px solid ${color}66`,
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        "--gem-glow": `${color}88`,
        animation: "pulse-gem 3s ease-in-out infinite",
      }}
      role="img"
      aria-label={name || "Gemstone"}
    >
      {/* Shimmer highlight */}
      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "18%",
          width: "30%",
          height: "25%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
          filter: "blur(4px)",
          transform: "rotate(-30deg)",
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{emoji}</span>
    </div>
  );
};

export default GemVisual;
