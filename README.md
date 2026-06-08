# 🌿 EcoTrace — Carbon Footprint Awareness Platform

> **PromptWars · Challenge 3 Submission** | Vertical: **Climate Tech / Sustainability**

---

## 1. Chosen Vertical

**Climate Tech & Environmental Awareness**

EcoTrace addresses the United Nations Sustainable Development Goal 13 (Climate Action) by making personal carbon emissions visible, measurable, and actionable for everyday users. The platform targets the gap between abstract climate statistics and individual behaviour change — helping users connect their daily choices (commuting, eating, energy use, shopping) to their real CO₂ impact.

---

## 2. Approach & Logic

### Architecture Decision
Built as a **zero-dependency, single-page application** using vanilla HTML5, CSS3, and ES2022 JavaScript. No build toolchain, no external libraries — chosen to maximise:
- **Efficiency**: no framework overhead, instant load, no network requests at runtime
- **Security**: no third-party scripts, no data leaves the device, no API keys exposed
- **Accessibility**: full semantic HTML with ARIA roles, keyboard navigation, live regions

### State Management
All user data is persisted via `localStorage` using a centralised `State` object with explicit `load()` / `save()` lifecycle methods. This gives offline-first persistence without a backend.

### Emission Factor Sources
Real-world CO₂ emission factors are used throughout, sourced from:
- **IPCC AR6** (diet emissions)
- **DEFRA 2023** (transport, energy)
- **IEA 2023** (grid electricity: 0.82 kg/kWh for Indian grid)
- **Lifecycle Assessment studies** (electronics manufacturing)

---

## 3. How the Solution Works

### Screen Flow

```
Onboarding Quiz → Dashboard → Log Activity → Insights → Actions → Community
      ↓                ↑
  localStorage  ←──────┘  (baseline + log entries persist across sessions)
```

### Screen-by-Screen

| Screen | Logic |
|--------|-------|
| **Onboarding** | 4 progressive quiz questions, each selection adds to a running CO₂ sum. Auto-advances to next question on selection. Saves `baseline` (tonnes/year) to localStorage. |
| **Dashboard** | Reads baseline from localStorage. SVG ring progress = `footprint / 15t` (max scale). Letter grade: A (<3t), B (3–5t), C (5–8t), D (>8t). Compares vs global avg (4.7t) and India avg (1.9t). |
| **Log Activity** | 16 activities across 4 categories with real emission factors. `CO₂ = rate × quantity`. Live preview shows kg and car-km equivalency (`kg / 0.21`). Entries prepended to log array in localStorage. |
| **Insights** | 3 insight cards with impact severity badges. Horizontal comparison chart renders 4 bars (You / India / Global / 2°C target) with CSS transition animations. |
| **Actions** | 5 recommended actions with difficulty + savings tags. Toggle state persisted in `Set` serialised to localStorage. Toast fires on every toggle. |
| **Community** | Static leaderboard with "You" row highlighted. 3 challenges — joinable ones animate their progress bar from 0→5% on join and persist state. |

### Key Technical Patterns
- **Deferred rendering**: screens are rendered on first navigation, not on load — avoids blocking the initial paint
- **Animation**: SVG `stroke-dashoffset` transitions for the score ring; CSS `width` transitions for bar fills; triggered via double `requestAnimationFrame` to ensure DOM is painted first
- **Toast system**: dynamically created DOM nodes, CSS class-toggled opacity + transform transitions, auto-removed after `transitionend`

---

## 4. Assumptions Made

1. **Emission factors are averages** — individual results will vary by region, vehicle efficiency, and diet composition
2. **Indian electricity grid** factor (0.82 kg/kWh) used as default; renewable sources modelled at 0.04 kg/kWh
3. **Monthly data** on the dashboard uses representative sample values (Jan–Jun) to demonstrate the chart UI
4. **Community leaderboard** uses static data; in a production system this would connect to a real-time backend
5. **No backend required** — all data is local to the user's browser, which is appropriate for a privacy-first carbon tracker
6. **Screen width ≥ 320px** assumed as minimum supported viewport

---

## 5. Evaluation Criteria Addressed

### ✅ Code Quality
- Centralised `State` object for all data operations — single source of truth
- Separate concerns: data constants → state → rendering → event handlers
- Consistent naming conventions (`camelCase` functions, `UPPER_SNAKE` constants)
- No `var`, no global leakage — all logic inside module-pattern IIFE via `'use strict'`

### ✅ Security
- **Zero external network requests** at runtime — no CDN scripts, no analytics, no tracking
- All user data stays in `localStorage` on the user's own device
- No `innerHTML` used with unsanitised user input — only structured data constants are interpolated
- No API keys, secrets, or credentials anywhere in the codebase
- Input validation on quantity field (must be numeric and > 0) before any computation

### ✅ Efficiency
- **No dependencies** — 0 npm packages, 0 frameworks, instant cold start
- Deferred rendering: only the active screen's DOM is built; other screens render on first visit
- Animations use CSS transitions (GPU-composited `transform` and `opacity`) not JS `setInterval`
- `requestAnimationFrame` used for SVG ring animation to sync with browser paint cycle
- Total asset size: ~60 KB (unminified) — well under the 10 MB repo limit

### ✅ Testing / Validation
- **Input guard**: `addLogEntry()` validates selection and quantity before appending — shows error toast if invalid
- **State integrity**: `State.load()` wraps localStorage reads in `try/catch` to handle corrupted data gracefully
- **Null safety**: all `getElementById` results are null-checked before DOM manipulation
- **Idempotent renders**: `renderActions()`, `renderLeaderboard()`, `renderChallenges()` check `children.length` before re-rendering to prevent duplicate DOM nodes

### ✅ Accessibility
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<button>` used correctly throughout
- All `<section>` elements have `aria-label` attributes
- Tab navigation uses `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-labelledby`
- Quiz options use `role="radiogroup"` with hidden native `<input type="radio">` for screen reader compatibility
- Toast container uses `aria-live="polite"` and `aria-atomic="false"` for screen reader announcements
- Action checkboxes have `aria-label` and `aria-pressed` state attributes
- Bar charts have `aria-label` on containers; individual bars have `title` attributes for tooltip text
- Colour is never the **sole** indicator of meaning — labels accompany all colour-coded elements
- Focus styles preserved (browser defaults not overridden without replacement)

---

## 🚀 Running Locally

No installation required:

```bash
# Option 1: Open directly
open index.html

# Option 2: Serve with Python (avoids any file:// restrictions)
python3 -m http.server 8080
# → visit http://localhost:8080
```

---

## 📂 File Structure

```
ecotrace/
├── index.html      # All 6 screen structures, navbar, toast container (335 lines)
├── style.css       # Design system, tokens, all component styles (831 lines)
├── app.js          # Data constants, state, rendering, event handlers (817 lines)
└── README.md       # This file
```

---

## 🌍 Emission Factors Reference

| Activity | Factor | Source |
|----------|--------|--------|
| Car (petrol) | 0.21 kg CO₂/km | DEFRA 2023 |
| Electric vehicle | 0.05 kg CO₂/km | DEFRA 2023 |
| Bus | 0.089 kg CO₂/km | DEFRA 2023 |
| Metro | 0.041 kg CO₂/km | DEFRA 2023 |
| Short-haul flight | 0.255 kg CO₂/km | IPCC AR6 |
| Beef | 27 kg CO₂/kg | Poore & Nemecek 2018 |
| Chicken | 5.9 kg CO₂/kg | Poore & Nemecek 2018 |
| Vegetarian meal | 2.0 kg CO₂/meal | Our World in Data |
| Grid electricity (India) | 0.82 kg CO₂/kWh | IEA 2023 |
| Natural gas | 2.04 kg CO₂/m³ | DEFRA 2023 |
| Solar PV | 0.04 kg CO₂/kWh | IPCC lifecycle |
| New laptop | 600 kg CO₂/item | Apple/Dell LCAs |
| New smartphone | 33 kg CO₂/item | Apple iPhone LCA |
| Clothing | 2.1 kg CO₂/item | WRAP 2022 |

---

*Built for PromptWars Challenge 3 — helping individuals take climate action one tracked choice at a time.*
