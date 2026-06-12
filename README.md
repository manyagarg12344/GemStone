# 🔮 Gemstone Recommendation App

> A full-stack MERN application that recommends sacred gemstones based on your zodiac sign, powered by astrology logic and optional Google Gemini AI.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-7c3aed?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)

---

## ✨ Features

| Category | Feature |
|---|---|
| **Core** | Zodiac sign calculator from DOB |
| **Core** | Gemstone recommendation (12 signs → 12 gems) |
| **Core** | Animated landing page with floating zodiac orb |
| **Core** | Form validation with user-friendly errors |
| **Intermediate** | Gemstone benefits, color, chakra, care instructions |
| **Intermediate** | Lucky number, color, day, flower & metal |
| **Intermediate** | Responsive mobile-first design |
| **Advanced** | MongoDB history — save & view past readings |
| **Advanced** | PDF report download (jsPDF, no external service) |
| **Advanced** | Google Gemini AI personalised advice |
| **Advanced** | Dark / Light mode toggle |
| **Advanced** | English / Hindi multi-language support |

---

## 🗂️ Folder Structure

```
gemstone-recommendation-app/
├── package.json                  ← root scripts (concurrently)
│
├── server/                       ← Node.js + Express backend
│   ├── index.js                  ← Entry point
│   ├── .env.example              ← Environment variable template
│   ├── config/
│   │   ├── db.js                 ← MongoDB connection
│   │   └── gemstoneData.js       ← Zodiac + gemstone data & logic
│   ├── models/
│   │   └── Recommendation.js     ← Mongoose schema
│   ├── controllers/
│   │   └── recommendationController.js
│   ├── routes/
│   │   └── recommendationRoutes.js
│   └── middleware/
│       └── errorHandler.js
│
└── client/                       ← React frontend
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js              ← React entry
        ├── App.js                ← Router + providers
        ├── index.css             ← Global design system
        ├── context/
        │   ├── ThemeContext.js   ← Dark/light mode
        │   └── LanguageContext.js← EN/HI i18n
        ├── utils/
        │   ├── api.js            ← Axios service
        │   └── pdfGenerator.js   ← jsPDF report builder
        ├── components/
        │   ├── Navbar.js
        │   ├── RecommendForm.js
        │   ├── ResultCard.js
        │   └── GemVisual.js
        └── pages/
            ├── HomePage.js
            ├── RecommendPage.js
            ├── HistoryPage.js
            └── ResultDetailPage.js
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 18
- MongoDB (local) **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) free-tier cluster
- (Optional) Google Gemini API key from [Google AI Studio](https://makersuite.google.com/)

---

### 1 — Clone & install

```bash
git clone https://github.com/yourname/gemstone-app.git
cd gemstone-app
npm run install-all
```

This installs dependencies for the root, server, and client in one command.

---

### 2 — Configure environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gemstone-app
GEMINI_API_KEY=your_gemini_api_key_here   # optional
NODE_ENV=development
```

---

### 3 — Start MongoDB (local)

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu / WSL
sudo systemctl start mongod

# Or use MongoDB Atlas — paste the connection string into MONGODB_URI
```

---

### 4 — Run the app

```bash
# From project root — starts both server (port 5000) and React (port 3000)
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `POST` | `/recommendations` | Create new recommendation |
| `GET` | `/recommendations` | List history (pagination: `?page=1&limit=10`) |
| `GET` | `/recommendations/stats` | Aggregated statistics |
| `GET` | `/recommendations/:id` | Get single recommendation |
| `DELETE` | `/recommendations/:id` | Delete a recommendation |

### POST `/recommendations` — Request Body

```json
{
  "name": "Arjun Sharma",
  "dob": "1998-07-15",
  "gender": "male",
  "language": "en"
}
```

### Sample Response

```json
{
  "success": true,
  "message": "Recommendation generated successfully!",
  "data": {
    "id": "657a1b2c3d4e5f6a7b8c9d0e",
    "name": "Arjun Sharma",
    "zodiacSign": "Cancer",
    "zodiacInfo": {
      "emoji": "♋",
      "element": "Water",
      "planet": "Moon",
      "dateRange": "June 21 – July 22"
    },
    "gemstoneName": "Pearl",
    "gemstoneInfo": {
      "color": "#F5F5F0",
      "colorName": "Lustrous White",
      "description": "Pearl represents purity, wisdom, and emotional transformation.",
      "benefits": ["Calms and soothes emotions", "..."],
      "chakra": "Crown Chakra"
    },
    "luckyInfo": {
      "number": 2,
      "color": "Silver",
      "day": "Monday"
    },
    "aiAdvice": "Arjun, as a Cancer ruled by the Moon...",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

## 🗄️ MongoDB Schema

```javascript
{
  name:        String,   // required, 2–50 chars
  dob:         Date,     // required
  gender:      String,   // enum: male | female | other | ""
  zodiacSign:  String,   // one of 12 signs
  gemstoneName:String,
  aiAdvice:    String,   // null if Gemini not configured
  language:    String,   // "en" | "hi"
  createdAt:   Date,     // auto (timestamps: true)
  updatedAt:   Date
}
```

---

## 💎 Zodiac → Gemstone Mapping

| Zodiac | Gemstone | Color |
|--------|----------|-------|
| ♈ Aries | Ruby | Deep Red |
| ♉ Taurus | Emerald | Vivid Green |
| ♊ Gemini | Agate | Banded Multi-color |
| ♋ Cancer | Pearl | Lustrous White |
| ♌ Leo | Ruby | Deep Red |
| ♍ Virgo | Sapphire | Royal Blue |
| ♎ Libra | Opal | Iridescent |
| ♏ Scorpio | Topaz | Golden Amber |
| ♐ Sagittarius | Turquoise | Sky Blue-Green |
| ♑ Capricorn | Garnet | Deep Crimson |
| ♒ Aquarius | Amethyst | Royal Purple |
| ♓ Pisces | Aquamarine | Sea Blue |

---

## 🌙 Dark Mode & 🌐 Language

- **Dark Mode**: click the moon/sun icon in the navbar; preference persists via `localStorage`.
- **Language**: toggle EN / हि in the navbar; affects all UI text and the AI-generated advice language.

---

## 📄 PDF Report

Click **"Download Report"** on any result page. The PDF is generated client-side using **jsPDF** — no server round-trip, no external service. It includes:
- Cover page with gemstone colour branding
- Zodiac & personal details
- Gemstone info (color, hardness, origin, chakra)
- Benefits list
- Lucky elements
- Who should wear it & care instructions
- AI advice section (if available)

---

## 🏗️ Architecture

```
React (port 3000)  ──HTTP──▶  Express (port 5000)  ──Mongoose──▶  MongoDB
        ▲                           │
        │                     Gemini API (optional)
        └── jsPDF (client-side PDF generation)
```

The backend follows **MVC**:
- **Model** — `server/models/Recommendation.js`
- **View** — JSON API responses
- **Controller** — `server/controllers/recommendationController.js`
- **Route** — `server/routes/recommendationRoutes.js`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6, Context API |
| Styling | Custom CSS (design system with CSS variables, dark mode) |
| HTTP | Axios |
| PDF | jsPDF |
| Backend | Node.js 18, Express 4 |
| Database | MongoDB, Mongoose 8 |
| AI | Google Gemini Pro (optional) |
| Dev Tools | nodemon, concurrently |

---

## 🎓 College Submission Notes

- Follows **MVC architecture** on the backend
- **REST API** design with proper status codes
- **Input validation** both client-side and server-side
- **Error handling** middleware for consistent API responses
- **Responsive design** — tested on mobile, tablet, desktop
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigation
- **Clean, commented code** throughout
- **Scalable** — easy to add more zodiac traditions, gemstone databases, or user auth

---

## 📝 License

MIT — free to use for academic and personal projects.
