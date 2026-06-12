import React, { createContext, useContext, useState } from "react";

// ─── Translation Strings ──────────────────────────────────────────────────────
const translations = {
  en: {
    // Navbar
    home: "Home",
    getRecommendation: "Get Recommendation",
    history: "History",
    // Hero
    heroEyebrow: "✨ Cosmic Gemstone Guide",
    heroTitle: "Discover Your",
    heroTitleHighlight: "Sacred Gemstone",
    heroSubtitle:
      "Unlock the ancient wisdom of astrology. Enter your birth date and reveal the gemstone the cosmos has aligned for you.",
    heroCta: "Find My Gemstone",
    heroCtaSecondary: "View History",
    // Form
    formTitle: "Your Cosmic Profile",
    formSubtitle: "Fill in your details to receive a personalised gemstone recommendation.",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    dobLabel: "Date of Birth",
    genderLabel: "Gender (Optional)",
    genderOptions: {
      "": "Prefer not to say",
      male: "Male ♂",
      female: "Female ♀",
      other: "Other",
    },
    languageLabel: "Recommendation Language",
    submitBtn: "Reveal My Gemstone ✨",
    submitting: "Reading the stars…",
    // Errors
    nameRequired: "Name is required.",
    nameShort: "Name must be at least 2 characters.",
    dobRequired: "Date of birth is required.",
    dobFuture: "Date of birth cannot be in the future.",
    // Results
    yourSign: "Your Zodiac Sign",
    yourGemstone: "Your Sacred Gemstone",
    benefits: "Crystal Benefits",
    luckyElements: "Lucky Elements",
    luckyNumber: "Lucky Number",
    luckyColor: "Lucky Color",
    luckyDay: "Lucky Day",
    whoShouldWear: "Who Should Wear It",
    gemDetails: "Gemstone Details",
    origin: "Origin",
    hardness: "Hardness",
    chakra: "Chakra",
    careInstructions: "Care Instructions",
    aiAdvice: "✨ AI Personalised Advice",
    downloadPdf: "Download Report",
    newRecommendation: "New Recommendation",
    // History
    historyTitle: "Past Recommendations",
    historySubtitle: "A record of all gemstone readings.",
    noHistory: "No recommendations yet.",
    noHistorySubtitle: "Be the first to discover your gemstone!",
    name: "Name",
    date: "Date",
    zodiac: "Zodiac",
    gemstone: "Gemstone",
    actions: "Actions",
    viewDetails: "View",
    deleteConfirm: "Delete this recommendation?",
    // Misc
    loading: "Consulting the stars…",
    error: "Something went wrong. Please try again.",
    back: "← Back",
    element: "Element",
    planet: "Ruling Planet",
  },
  hi: {
    home: "होम",
    getRecommendation: "सिफारिश पाएं",
    history: "इतिहास",
    heroEyebrow: "✨ कॉस्मिक रत्न मार्गदर्शिका",
    heroTitle: "अपना",
    heroTitleHighlight: "पवित्र रत्न खोजें",
    heroSubtitle:
      "ज्योतिष की प्राचीन विद्या को अनलॉक करें। अपनी जन्म तिथि डालें और जानें कि ब्रह्मांड ने आपके लिए कौन सा रत्न निर्धारित किया है।",
    heroCta: "मेरा रत्न खोजें",
    heroCtaSecondary: "इतिहास देखें",
    formTitle: "आपकी कॉस्मिक प्रोफाइल",
    formSubtitle: "व्यक्तिगत रत्न सिफारिश के लिए अपना विवरण भरें।",
    nameLabel: "पूरा नाम",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    dobLabel: "जन्म तिथि",
    genderLabel: "लिंग (वैकल्पिक)",
    genderOptions: {
      "": "बताना पसंद नहीं",
      male: "पुरुष ♂",
      female: "महिला ♀",
      other: "अन्य",
    },
    languageLabel: "सिफारिश भाषा",
    submitBtn: "मेरा रत्न जानें ✨",
    submitting: "तारों से पूछ रहे हैं…",
    nameRequired: "नाम आवश्यक है।",
    nameShort: "नाम कम से कम 2 अक्षर का होना चाहिए।",
    dobRequired: "जन्म तिथि आवश्यक है।",
    dobFuture: "जन्म तिथि भविष्य में नहीं हो सकती।",
    yourSign: "आपकी राशि",
    yourGemstone: "आपका पवित्र रत्न",
    benefits: "रत्न के लाभ",
    luckyElements: "शुभ तत्व",
    luckyNumber: "शुभ अंक",
    luckyColor: "शुभ रंग",
    luckyDay: "शुभ दिन",
    whoShouldWear: "कौन पहनें",
    gemDetails: "रत्न विवरण",
    origin: "उत्पत्ति",
    hardness: "कठोरता",
    chakra: "चक्र",
    careInstructions: "देखभाल निर्देश",
    aiAdvice: "✨ AI व्यक्तिगत सलाह",
    downloadPdf: "रिपोर्ट डाउनलोड करें",
    newRecommendation: "नई सिफारिश",
    historyTitle: "पिछली सिफारिशें",
    historySubtitle: "सभी रत्न रीडिंग का रिकॉर्ड।",
    noHistory: "अभी तक कोई सिफारिश नहीं।",
    noHistorySubtitle: "पहले अपना रत्न खोजें!",
    name: "नाम",
    date: "तारीख",
    zodiac: "राशि",
    gemstone: "रत्न",
    actions: "कार्य",
    viewDetails: "देखें",
    deleteConfirm: "इस सिफारिश को हटाएं?",
    loading: "तारों से परामर्श कर रहे हैं…",
    error: "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
    back: "← वापस",
    element: "तत्व",
    planet: "शासक ग्रह",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem("gemstone-lang") || "en"
  );

  const switchLang = (l) => {
    setLang(l);
    localStorage.setItem("gemstone-lang", l);
  };

  const t = (key) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
