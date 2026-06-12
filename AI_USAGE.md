# 🤖 AI Usage Documentation

This file explains how Artificial Intelligence is used in the Gemstone Recommendation App,
in compliance with academic integrity guidelines and project submission requirements.

---

## Overview

The app integrates **Google Gemini Pro** (via `@google/generative-ai`) as an **optional**,
additive feature. All core recommendation logic is deterministic and rule-based; the AI
only supplements it with personalised prose.

---

## What the AI Does

### Feature: Personalised Gemstone Advice

**Trigger:** After the core recommendation is generated, if a valid `GEMINI_API_KEY` is set
in `server/.env`, the backend sends a structured prompt to Gemini Pro.

**Input to AI:**
```
User name, zodiac sign, recommended gemstone, and preferred language (EN or HI)
```

**Prompt template (from `server/controllers/recommendationController.js`):**
```
You are a wise astrologer and gemstone expert.
[Language instruction]

Give a personalized, warm, and insightful gemstone recommendation for:
- Name: {name}
- Zodiac Sign: {zodiacSign}
- Recommended Gemstone: {gemstone}

Include:
1. Why this gemstone is perfect for their zodiac sign
2. One specific life area where this gemstone will help them most
3. The best way to wear or use this gemstone
4. A brief spiritual message or affirmation for them

Keep it warm, personal, and under 200 words. Address them by name.
```

**Output:** A 100–200 word personalised paragraph stored in `aiAdvice` field of the MongoDB
document and displayed in a dedicated card on the result page.

---

## What the AI Does NOT Do

| Task | Handled By |
|------|-----------|
| Zodiac sign calculation | Pure JavaScript date logic |
| Gemstone mapping | Hardcoded lookup table |
| Lucky number / color / day | Static data in `gemstoneData.js` |
| Benefits & descriptions | Curated static data |
| PDF generation | Client-side jsPDF |
| Form validation | React + Express |
| Database storage | Mongoose / MongoDB |

The app is **fully functional without an AI key**. When `GEMINI_API_KEY` is absent or
invalid, the `aiAdvice` field is `null` and the AI card is hidden from the UI.

---

## Graceful Degradation

```javascript
// server/controllers/recommendationController.js
try {
  aiAdvice = await getGeminiAdvice(...);
} catch (aiError) {
  console.error("Gemini AI error (non-critical):", aiError.message);
  // Continue without AI advice — aiAdvice stays null
}
```

The API call is wrapped in a try/catch so a Gemini failure never breaks the recommendation.

---

## Model Used

- **Model name:** `gemini-pro`
- **Provider:** Google AI Studio / Google Cloud Vertex AI
- **API version:** `@google/generative-ai` v0.2.x
- **Max tokens:** 1000 per request
- **Cost:** Free tier available at [Google AI Studio](https://makersuite.google.com/)

---

## Privacy Considerations

- No user data is sent to any third party except Google Gemini (when AI key is set).
- Only `name`, `zodiacSign`, and `gemstoneName` are included in the Gemini prompt.
- Date of birth and gender are **never** sent to external APIs.
- All data is stored in your own MongoDB instance.

---

## How to Enable / Disable AI

**Enable:**
```env
# server/.env
GEMINI_API_KEY=AIzaSy...your_real_key_here
```

**Disable (no AI calls):**
```env
# server/.env
GEMINI_API_KEY=your_gemini_api_key_here   # placeholder = AI disabled
```

Or remove the line entirely. The check in `recommendationController.js`:
```javascript
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here") {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
}
```

---

## Academic Integrity Statement

This AI integration was designed and implemented by the project author. The AI is used as a
**tool** (similar to a spell-checker or calculator) to generate supplementary text content.
All architecture, code, logic, data structures, and UI were written by the developer.
The Gemini API is properly attributed and its usage documented here.
