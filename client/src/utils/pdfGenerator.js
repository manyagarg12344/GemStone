import jsPDF from "jspdf";

/**
 * Generates and downloads a styled PDF report for a gemstone recommendation.
 * Uses jsPDF to draw directly — no DOM capture needed, works reliably cross-browser.
 *
 * @param {Object} data - Full recommendation data object from the API
 */
export const generatePDF = (data) => {
  const {
    name,
    dob,
    zodiacSign,
    zodiacInfo,
    gemstoneName,
    gemstoneInfo,
    luckyInfo,
    aiAdvice,
  } = data;

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();   // 210mm
  const H = doc.internal.pageSize.getHeight();  // 297mm
  const margin = 20;
  const col = W - margin * 2;
  let y = 0; // current Y cursor

  // ── Helper: hex to [r,g,b] ─────────────────────────────────────
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  };

  const gemColor = gemstoneInfo?.color || "#7c3aed";
  const [gr, gg, gb] = hexToRgb(gemColor);

  // ── Cover gradient background ─────────────────────────────────
  doc.setFillColor(26, 5, 51);
  doc.rect(0, 0, W, 80, "F");

  // Decorative circle
  doc.setFillColor(gr, gg, gb);
  doc.setGState(new doc.GState({ opacity: 0.15 }));
  doc.circle(W - 30, 20, 50, "F");
  doc.setGState(new doc.GState({ opacity: 1 }));

  // App title
  y = 22;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(180, 150, 255);
  doc.text("🔮 GEMSTONE RECOMMENDATION REPORT", W / 2, y, { align: "center" });

  // Gemstone emoji stand-in (large colored circle)
  y += 10;
  doc.setFillColor(gr, gg, gb);
  doc.setGState(new doc.GState({ opacity: 0.9 }));
  doc.circle(W / 2, y + 12, 14, "F");
  doc.setGState(new doc.GState({ opacity: 1 }));
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(gemstoneName?.[0] || "G", W / 2, y + 14.5, { align: "center" });

  // Gemstone name
  y += 32;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(gemstoneName || "Gemstone", W / 2, y, { align: "center" });

  // User name
  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(200, 180, 240);
  doc.text(`Prepared for ${name}`, W / 2, y, { align: "center" });

  // Date
  y += 7;
  doc.setFontSize(9);
  doc.setTextColor(160, 140, 200);
  doc.text(`Generated on ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}`, W / 2, y, { align: "center" });

  // ── White content area ────────────────────────────────────────
  y = 84;
  doc.setFillColor(248, 244, 255);
  doc.rect(0, y, W, H - y, "F");

  // ── Section helper ────────────────────────────────────────────
  const sectionTitle = (title, iconChar = "●") => {
    y += 8;
    doc.setFillColor(gr, gg, gb);
    doc.setGState(new doc.GState({ opacity: 0.12 }));
    doc.roundedRect(margin, y - 5, col, 10, 2, 2, "F");
    doc.setGState(new doc.GState({ opacity: 1 }));
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(gr, gg, gb);
    doc.text(`${iconChar}  ${title}`, margin + 4, y + 2);
    y += 10;
  };

  const bodyText = (text, indent = 0) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(70, 50, 110);
    const lines = doc.splitTextToSize(text, col - indent - 4);
    doc.text(lines, margin + indent + 2, y);
    y += lines.length * 5 + 2;
  };

  const twoCol = (label, value) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120, 90, 160);
    doc.text(label + ":", margin + 2, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(40, 20, 80);
    doc.text(String(value), margin + 40, y);
    y += 6;
  };

  // ── Zodiac & User Info ────────────────────────────────────────
  sectionTitle("Zodiac & Personal Details", "◆");
  twoCol("Name", name);
  twoCol("Date of Birth", new Date(dob).toLocaleDateString("en-IN", { dateStyle: "long" }));
  twoCol("Zodiac Sign", `${zodiacInfo?.emoji || ""} ${zodiacSign}`);
  twoCol("Date Range", zodiacInfo?.dateRange || "");
  twoCol("Element", zodiacInfo?.element || "");
  twoCol("Ruling Planet", zodiacInfo?.planet || "");

  // ── Gemstone Details ──────────────────────────────────────────
  sectionTitle("Your Sacred Gemstone", "◈");
  twoCol("Gemstone", gemstoneName);
  twoCol("Color", gemstoneInfo?.colorName || "");
  twoCol("Hardness", gemstoneInfo?.hardness || "");
  twoCol("Origin", gemstoneInfo?.origin || "");
  twoCol("Chakra", gemstoneInfo?.chakra || "");
  y += 2;
  bodyText(gemstoneInfo?.description || "");

  // ── Benefits ──────────────────────────────────────────────────
  sectionTitle("Crystal Benefits", "★");
  (gemstoneInfo?.benefits || []).forEach((b, i) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(70, 50, 110);
    doc.setFillColor(gr, gg, gb);
    doc.circle(margin + 4, y - 1, 1.2, "F");
    const lines = doc.splitTextToSize(b, col - 12);
    doc.text(lines, margin + 8, y);
    y += lines.length * 5 + 1;
  });

  // ── Lucky Elements ────────────────────────────────────────────
  sectionTitle("Lucky Elements", "✦");
  if (luckyInfo) {
    twoCol("Lucky Number", luckyInfo.number);
    twoCol("Lucky Color", luckyInfo.color);
    twoCol("Lucky Day", luckyInfo.day);
    twoCol("Lucky Metal", luckyInfo.metal);
  }

  // ── Who Should Wear ───────────────────────────────────────────
  sectionTitle("Who Should Wear It", "♦");
  bodyText(gemstoneInfo?.whoShouldWear || "");

  // ── Care Instructions ─────────────────────────────────────────
  sectionTitle("Care Instructions", "◉");
  bodyText(gemstoneInfo?.careInstructions || "");

  // ── AI Advice (if present) ────────────────────────────────────
  if (aiAdvice) {
    // New page if near bottom
    if (y > H - 60) { doc.addPage(); y = 20; }
    sectionTitle("AI Personalised Advice", "✨");
    bodyText(aiAdvice);
  }

  // ── Footer ────────────────────────────────────────────────────
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(160, 140, 200);
    doc.text(
      `🔮 Gemstone App  •  Page ${i} of ${pageCount}  •  gemstoneapp.com`,
      W / 2,
      H - 8,
      { align: "center" }
    );
    // top border line on pages > 1
    if (i > 1) {
      doc.setDrawColor(gr, gg, gb);
      doc.setLineWidth(0.5);
      doc.line(margin, 12, W - margin, 12);
    }
  }

  // ── Save ──────────────────────────────────────────────────────
  const filename = `gemstone-report-${name.replace(/\s+/g, "-").toLowerCase()}.pdf`;
  doc.save(filename);
};
