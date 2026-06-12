/**
 * Complete gemstone and zodiac data mapping.
 * Contains zodiac date ranges, gemstone details, lucky elements, and benefits.
 */

const ZODIAC_DATA = {
  Aries: {
    dateRange: "March 21 – April 19",
    emoji: "♈",
    element: "Fire",
    planet: "Mars",
    description:
      "Bold and ambitious, Aries dives headfirst into even the most challenging situations.",
  },
  Taurus: {
    dateRange: "April 20 – May 20",
    emoji: "♉",
    element: "Earth",
    planet: "Venus",
    description:
      "Taurus is an earth sign represented by the bull and is known for its tenacity and love of beauty.",
  },
  Gemini: {
    dateRange: "May 21 – June 20",
    emoji: "♊",
    element: "Air",
    planet: "Mercury",
    description:
      "Gemini is spontaneous, playful, and endlessly curious — a social butterfly craving new experiences.",
  },
  Cancer: {
    dateRange: "June 21 – July 22",
    emoji: "♋",
    element: "Water",
    planet: "Moon",
    description:
      "Cancer is deeply intuitive and sentimental, fiercely loyal and protective of loved ones.",
  },
  Leo: {
    dateRange: "July 23 – August 22",
    emoji: "♌",
    element: "Fire",
    planet: "Sun",
    description:
      "Leo is vivacious, theatrical, and passionate, loves to bask in the spotlight and celebrate themselves.",
  },
  Virgo: {
    dateRange: "August 23 – September 22",
    emoji: "♍",
    element: "Earth",
    planet: "Mercury",
    description:
      "Virgo is logical, practical, and systematic in their approach to life with a deep sense of humanity.",
  },
  Libra: {
    dateRange: "September 23 – October 22",
    emoji: "♎",
    element: "Air",
    planet: "Venus",
    description:
      "Libra is obsessed with symmetry and strives to create equilibrium in all areas of life.",
  },
  Scorpio: {
    dateRange: "October 23 – November 21",
    emoji: "♏",
    element: "Water",
    planet: "Pluto",
    description:
      "Scorpio is one of the most misunderstood signs — fiercely independent, mysterious, and magnetic.",
  },
  Sagittarius: {
    dateRange: "November 22 – December 21",
    emoji: "♐",
    element: "Fire",
    planet: "Jupiter",
    description:
      "Sagittarius is the last fire sign, represented by the archer, and is always on a quest for knowledge.",
  },
  Capricorn: {
    dateRange: "December 22 – January 19",
    emoji: "♑",
    element: "Earth",
    planet: "Saturn",
    description:
      "Capricorn is the last earth sign, represented by the sea-goat — skilled at navigating material and emotional realms.",
  },
  Aquarius: {
    dateRange: "January 20 – February 18",
    emoji: "♒",
    element: "Air",
    planet: "Uranus",
    description:
      "Aquarius is the most humanitarian sign, advanced, self-reliant, clever, exceptional, and optimistic.",
  },
  Pisces: {
    dateRange: "February 19 – March 20",
    emoji: "♓",
    element: "Water",
    planet: "Neptune",
    description:
      "Pisces is the most intuitive, sensitive, and empathetic sign of the entire zodiac — highly perceptive.",
  },
};

const GEMSTONE_DATA = {
  Ruby: {
    color: "#E0115F",
    colorName: "Deep Red",
    description:
      "Ruby is the king of gemstones, symbolizing passion, protection, and prosperity.",
    benefits: [
      "Boosts confidence and courage",
      "Enhances vitality and energy",
      "Attracts love and passion",
      "Promotes leadership qualities",
      "Strengthens heart and blood circulation",
    ],
    whoShouldWear:
      "Ideal for leaders, entrepreneurs, and those seeking to ignite their inner fire and passion.",
    careInstructions:
      "Clean with warm soapy water. Avoid harsh chemicals and ultrasonic cleaners.",
    origin: "Myanmar, Thailand, Sri Lanka",
    hardness: "9 (Mohs scale)",
    chakra: "Root Chakra",
  },
  Emerald: {
    color: "#50C878",
    colorName: "Vivid Green",
    description:
      "Emerald symbolizes growth, renewal, and prosperity — the stone of successful love.",
    benefits: [
      "Enhances mental clarity and focus",
      "Promotes harmony in relationships",
      "Attracts abundance and wealth",
      "Improves eyesight and healing",
      "Calms emotions and reduces stress",
    ],
    whoShouldWear:
      "Perfect for artists, healers, and those seeking abundance and harmonious relationships.",
    careInstructions:
      "Clean gently with a soft cloth. Avoid direct sunlight and extreme temperatures.",
    origin: "Colombia, Brazil, Zambia",
    hardness: "7.5–8 (Mohs scale)",
    chakra: "Heart Chakra",
  },
  Agate: {
    color: "#B0C4DE",
    colorName: "Banded Multi-color",
    description:
      "Agate is a stabilizing stone that promotes balance, perception, and analytical thinking.",
    benefits: [
      "Improves communication skills",
      "Enhances intellectual abilities",
      "Balances yin and yang energies",
      "Boosts concentration and memory",
      "Provides emotional stability",
    ],
    whoShouldWear:
      "Excellent for students, writers, and communicators seeking mental agility.",
    careInstructions:
      "Safe to clean with water. Charge in moonlight for best results.",
    origin: "Brazil, India, Morocco",
    hardness: "6.5–7 (Mohs scale)",
    chakra: "Third Eye Chakra",
  },
  Pearl: {
    color: "#F5F5F0",
    colorName: "Lustrous White",
    description:
      "Pearl represents purity, wisdom, and emotional transformation — a gift of the sea.",
    benefits: [
      "Calms and soothes emotions",
      "Enhances intuition and wisdom",
      "Promotes loyalty and integrity",
      "Brings emotional balance",
      "Connects to lunar energies",
    ],
    whoShouldWear:
      "Ideal for those seeking emotional healing, wisdom, and a deeper connection to intuition.",
    careInstructions:
      "Wipe with soft cloth after wearing. Keep away from chemicals and perfumes.",
    origin: "Japan, China, Persian Gulf",
    hardness: "2.5–4 (Mohs scale)",
    chakra: "Crown Chakra",
  },
  Sapphire: {
    color: "#0F52BA",
    colorName: "Royal Blue",
    description:
      "Sapphire is the stone of wisdom, royalty, and divine favor — promoting truth and loyalty.",
    benefits: [
      "Enhances wisdom and intelligence",
      "Promotes focus and mental clarity",
      "Attracts prosperity and blessings",
      "Strengthens intuition",
      "Calms overactive minds",
    ],
    whoShouldWear:
      "Best for academics, philosophers, and those seeking spiritual growth and wisdom.",
    careInstructions:
      "Clean with warm water and mild soap. Safe for ultrasonic cleaning.",
    origin: "Sri Lanka, Kashmir, Myanmar",
    hardness: "9 (Mohs scale)",
    chakra: "Third Eye Chakra",
  },
  Opal: {
    color: "#A8C5DA",
    colorName: "Iridescent Multi-color",
    description:
      "Opal amplifies traits, emotions, and desires — the stone of inspiration and creativity.",
    benefits: [
      "Sparks creativity and imagination",
      "Enhances emotional expression",
      "Brings balance and harmony",
      "Amplifies positive traits",
      "Encourages freedom of spirit",
    ],
    whoShouldWear:
      "Perfect for artists, diplomats, and peace-seekers who value beauty and balance.",
    careInstructions:
      "Store away from other gems. Avoid heat and dry conditions. Wipe gently.",
    origin: "Australia, Ethiopia, Mexico",
    hardness: "5.5–6.5 (Mohs scale)",
    chakra: "Crown Chakra",
  },
  Topaz: {
    color: "#FF8C00",
    colorName: "Golden Amber",
    description:
      "Topaz is a stone of love and fortune, promoting honesty, clarity, and deep emotional attachments.",
    benefits: [
      "Boosts self-confidence",
      "Promotes honesty and openness",
      "Attracts luck and abundance",
      "Enhances passion and creativity",
      "Provides emotional healing",
    ],
    whoShouldWear:
      "Ideal for those undergoing transformation and seeking clarity in complex situations.",
    careInstructions:
      "Avoid sudden temperature changes. Clean with mild soap and water.",
    origin: "Brazil, Russia, Sri Lanka",
    hardness: "8 (Mohs scale)",
    chakra: "Solar Plexus Chakra",
  },
  Turquoise: {
    color: "#40E0D0",
    colorName: "Sky Blue-Green",
    description:
      "Turquoise is one of the oldest known gemstones, symbolizing wisdom, tranquility, and protection.",
    benefits: [
      "Promotes spiritual attunement",
      "Enhances communication",
      "Provides protection during travel",
      "Brings good fortune",
      "Promotes self-realization",
    ],
    whoShouldWear:
      "Great for travelers, teachers, and free spirits seeking adventure and truth.",
    careInstructions:
      "Avoid water and chemicals. Polish gently with a dry cloth.",
    origin: "Iran, USA, China",
    hardness: "5–6 (Mohs scale)",
    chakra: "Throat Chakra",
  },
  Garnet: {
    color: "#722F37",
    colorName: "Deep Crimson",
    description:
      "Garnet is a stone of commitment, passion, and regeneration — energizing the soul.",
    benefits: [
      "Promotes success in business",
      "Enhances devotion and loyalty",
      "Boosts energy and stamina",
      "Protects during travel",
      "Strengthens survival instincts",
    ],
    whoShouldWear:
      "Perfect for business professionals, athletes, and those seeking long-term success.",
    careInstructions:
      "Clean with warm soapy water. Avoid steam cleaning and harsh chemicals.",
    origin: "India, Sri Lanka, Russia",
    hardness: "6.5–7.5 (Mohs scale)",
    chakra: "Root Chakra",
  },
  Amethyst: {
    color: "#9B59B6",
    colorName: "Royal Purple",
    description:
      "Amethyst is a powerful protective stone known for its stunning beauty and spiritual properties.",
    benefits: [
      "Promotes calm and clarity",
      "Enhances spiritual awareness",
      "Aids in meditation",
      "Reduces anxiety and stress",
      "Improves sleep quality",
    ],
    whoShouldWear:
      "Ideal for meditators, innovators, and those seeking higher consciousness and peace.",
    careInstructions:
      "Clean with mild soap. Keep away from prolonged sunlight to prevent fading.",
    origin: "Brazil, Uruguay, Africa",
    hardness: "7 (Mohs scale)",
    chakra: "Crown Chakra",
  },
  Aquamarine: {
    color: "#7FFFD4",
    colorName: "Sea Blue",
    description:
      "Aquamarine evokes the purity of crystal-clear water and the eternal rolling of the ocean.",
    benefits: [
      "Enhances clear communication",
      "Promotes compassion and tolerance",
      "Reduces stress and anxiety",
      "Brings clarity to emotions",
      "Supports artistic expression",
    ],
    whoShouldWear:
      "Best for empaths, healers, and artists who need to express their emotions clearly.",
    careInstructions:
      "Clean with warm water. Safe for ultrasonic cleaning. Avoid harsh chemicals.",
    origin: "Brazil, Pakistan, Mozambique",
    hardness: "7.5–8 (Mohs scale)",
    chakra: "Throat Chakra",
  },
};

const LUCKY_DATA = {
  Aries: {
    number: 9,
    color: "Red",
    day: "Tuesday",
    flower: "Honeysuckle",
    metal: "Iron",
  },
  Taurus: {
    number: 6,
    color: "Green",
    day: "Friday",
    flower: "Poppy",
    metal: "Copper",
  },
  Gemini: {
    number: 5,
    color: "Yellow",
    day: "Wednesday",
    flower: "Lavender",
    metal: "Mercury",
  },
  Cancer: {
    number: 2,
    color: "Silver",
    day: "Monday",
    flower: "White Rose",
    metal: "Silver",
  },
  Leo: {
    number: 1,
    color: "Gold",
    day: "Sunday",
    flower: "Sunflower",
    metal: "Gold",
  },
  Virgo: {
    number: 5,
    color: "Navy Blue",
    day: "Wednesday",
    flower: "Chrysanthemum",
    metal: "Mercury",
  },
  Libra: {
    number: 6,
    color: "Pink",
    day: "Friday",
    flower: "Rose",
    metal: "Copper",
  },
  Scorpio: {
    number: 9,
    color: "Crimson",
    day: "Tuesday",
    flower: "Geranium",
    metal: "Iron",
  },
  Sagittarius: {
    number: 3,
    color: "Purple",
    day: "Thursday",
    flower: "Carnation",
    metal: "Tin",
  },
  Capricorn: {
    number: 8,
    color: "Brown",
    day: "Saturday",
    flower: "Pansy",
    metal: "Lead",
  },
  Aquarius: {
    number: 4,
    color: "Electric Blue",
    day: "Saturday",
    flower: "Orchid",
    metal: "Uranium",
  },
  Pisces: {
    number: 7,
    color: "Sea Green",
    day: "Thursday",
    flower: "Water Lily",
    metal: "Tin",
  },
};

const ZODIAC_GEMSTONE_MAP = {
  Aries: "Ruby",
  Taurus: "Emerald",
  Gemini: "Agate",
  Cancer: "Pearl",
  Leo: "Ruby",
  Virgo: "Sapphire",
  Libra: "Opal",
  Scorpio: "Topaz",
  Sagittarius: "Turquoise",
  Capricorn: "Garnet",
  Aquarius: "Amethyst",
  Pisces: "Aquamarine",
};

/**
 * Calculates the zodiac sign based on a given date of birth.
 * @param {Date} dob - The date of birth
 * @returns {string} - The zodiac sign name
 */
const getZodiacSign = (dob) => {
  const date = new Date(dob);
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return "Aquarius";
  return "Pisces";
};

/**
 * Builds a complete recommendation object for a given user.
 * @param {string} name - User's name
 * @param {Date} dob - User's date of birth
 * @param {string} gender - User's gender (optional)
 * @returns {Object} - Complete recommendation data
 */
const buildRecommendation = (name, dob, gender) => {
  const zodiacSign = getZodiacSign(dob);
  const gemstoneName = ZODIAC_GEMSTONE_MAP[zodiacSign];
  const zodiacInfo = ZODIAC_DATA[zodiacSign];
  const gemstoneInfo = GEMSTONE_DATA[gemstoneName];
  const luckyInfo = LUCKY_DATA[zodiacSign];

  return {
    name,
    dob,
    gender,
    zodiacSign,
    zodiacInfo,
    gemstoneName,
    gemstoneInfo,
    luckyInfo,
  };
};

module.exports = {
  ZODIAC_DATA,
  GEMSTONE_DATA,
  LUCKY_DATA,
  ZODIAC_GEMSTONE_MAP,
  getZodiacSign,
  buildRecommendation,
};
