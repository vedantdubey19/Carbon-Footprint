# 🌿 EcoTrace — Carbon Footprint Awareness Platform

> **PromptWars Submission** — A full-stack web app that helps individuals understand, track, and reduce their personal carbon footprint.

## 🔗 Live Demo

<!-- Replace with your deployed URL after pushing to GitHub + deploying on Render -->
**Deployed at:** _[your-render-url].onrender.com_

---

## 📋 Features

| Screen | What it does |
|--------|-------------|
| **Onboarding** | 4-question quiz computes your annual CO₂ baseline with live preview |
| **Dashboard** | Animated SVG score ring (grade A–D), monthly bar chart, category breakdown |
| **Log Activity** | 16 real-emission-factor activities across 4 categories, persisted via localStorage |
| **Insights** | 3 AI-style impact cards + comparison bar chart (You / India / Global / 2°C target) |
| **Actions** | 5 recommended actions with difficulty tags, toggleable checkmarks, points toast |
| **Community** | Leaderboard, rank stats, 3 live challenges with join + progress animation |

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES2022)
- **Storage:** `localStorage` for baseline, activity log, completed actions, joined challenges
- **No build step required** — open `index.html` directly or serve with any static host

## 🎨 Design System

- Color palette: `#639922` (brand green), `#D85A30` (coral/high), `#BA7517` (amber/medium), `#1D9E75` (teal/offsets), `#378ADD` (blue/energy)
- Clean flat UI · 0.5px borders · `border-radius: 8px/12px` · system sans-serif
- Fully responsive (mobile-first breakpoints at 600px and 400px)
- Toast notifications on every user action

## 🚀 Deployment on Render

1. Push this repo to a **public GitHub repository**
2. Go to [render.com](https://render.com) → **New → Static Site**
3. Connect your GitHub repo
4. Set **Publish directory** to `.` (root)
5. Click **Create Static Site** → done!

## 📂 Project Structure

```
EcoTrace/
├── index.html      # All 6 screen structures + navbar + toast container
├── style.css       # Complete design system (831 lines)
├── app.js          # All logic, rendering, state management (817 lines)
└── README.md       # This file
```

## 🌍 Emission Factors Used

| Activity | Factor |
|----------|--------|
| Car (petrol) | 0.21 kg CO₂/km |
| Electric vehicle | 0.05 kg CO₂/km |
| Bus | 0.089 kg CO₂/km |
| Metro | 0.041 kg CO₂/km |
| Short-haul flight | 0.255 kg CO₂/km |
| Beef | 27 kg CO₂/kg |
| Chicken | 5.9 kg CO₂/kg |
| Grid electricity | 0.82 kg CO₂/kWh |
| Natural gas | 2.04 kg CO₂/m³ |
| New laptop | 600 kg CO₂/item |

## 📸 Screenshots

> Dashboard with animated score ring and monthly emissions chart

---

Built with ❤️ for PromptWars — helping people understand their environmental impact.
