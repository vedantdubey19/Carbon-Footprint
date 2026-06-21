# 🌱 EcoTrace — Carbon Footprint Awareness Platform

> Empowering individuals to understand, track, and reduce their carbon emissions through data-driven insights and sustainable actions.

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📌 Overview

EcoTrace is a web-based Carbon Footprint Awareness Platform designed to help users measure and understand the environmental impact of their daily lifestyle choices.

The platform calculates estimated carbon emissions from transportation, energy usage, and consumption habits, then provides actionable recommendations to reduce emissions and promote sustainable living.

This project aligns with **United Nations Sustainable Development Goal (SDG) 13 – Climate Action** by encouraging environmental awareness and responsible decision-making.

---

## 🎯 Problem Statement

Many people contribute to carbon emissions without understanding the impact of their daily activities.

EcoTrace addresses this challenge by:

- Making carbon emissions visible
- Providing easy-to-understand insights
- Encouraging eco-friendly behavior
- Promoting climate awareness

---

## ✨ Features

### 📊 Carbon Footprint Calculator
Calculate estimated CO₂ emissions based on:

- Transportation habits
- Energy consumption
- Lifestyle choices

### 📈 Visual Analytics
Interactive charts and statistics to visualize:

- Personal carbon footprint
- National averages
- Global averages
- Sustainability targets

### 🌍 Sustainability Recommendations
Receive personalized suggestions such as:

- Using public transport
- Switching to renewable energy
- Planting trees
- Reducing meat consumption

### 🏆 Community Engagement
- Sustainability leaderboard
- Eco challenges
- Environmental awareness campaigns

### 📚 Educational Insights
Learn about:

- Climate change
- Carbon emissions
- Sustainable practices
- Environmental responsibility

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|----------|
| HTML5 | Semantics, Layout & Content Security Policies (CSP) |
| CSS3 | Styling, Responsive Layouts, and Keyboard Focus Indicators |
| JavaScript (ES6) | Application Logic, DOM APIs, and Data Sanitization |
| Jest | Automated Node.js Unit Testing Framework |
| Jest JSDOM | Browser Mock Environment for CLI Testing |
| GitHub Pages | Deployment |

---

## 📂 Project Structure

```text
Carbon-Footprint/
│
├── index.html       # Main SPA markup and CSP headers
├── style.css        # Visual styles, WCAG contrast colors, focus-ring systems
├── app.js           # Sanitized state managers, emission math, dynamic UI
├── tests.html       # Zero-dependency, browser-based unit test runner page
│
├── app.test.js      # Automated unit tests for calculation modules
├── jest.config.js   # Jest configuration settings (JSDOM environment)
├── package.json     # Node scripts and development test configurations
│
└── images/          # Assets and dashboard screenshots
```

---

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/vedantdubey19/Carbon-Footprint.git
```

### Run Locally

1. Open `index.html` in your web browser.
2. Alternatively, run a local development server (e.g. `npx serve .` or using VS Code Live Server).

---

## 🧪 Testing & Diagnostics

EcoTrace comes equipped with a comprehensive test framework to verify its calculations:

### 1. Browser-Based Self-Diagnostics (Zero-Dependency)
Open **`tests.html`** in your browser. It runs the full suite of unit tests directly in the browser window and outputs a detailed green/red report of the assertion results. This is highly useful for judges or quick validation.

### 2. Node.js Command Line Testing
Install developer dependencies and run automated test suites:

```bash
# Install dependencies (Jest and JSDOM environment)
npm install

# Execute tests
npm run test
```

---

## 🔒 Security, Accessibility & Scientific Standards

### 🛡️ Security Engineering
- **XSS Mitigation**: All dynamically generated logs utilize programmatic elements (`document.createElement`) and `textContent` text binding rather than insecure `innerHTML` formatting, preventing data-leak scripts.
- **Input Sanitization**: Numerical input quantities are parsed, boundary-checked (values capped from 0 to 1,000,000), and validated to prevent calculation logic overflows.
- **Content Security Policy**: Integrates `<meta>` policy headers enforcing secure resource loading limits.
- **State Validation**: `localStorage` data runs through schemas to discard corrupt variables.

### ♿ Accessibility (A11y)
- **Keyboard Navigation**: Quiz options visually hide radio inputs using a `.visually-hidden` style, maintaining focusability. Options highlight their card wrappers when focused via the tab key.
- **Visible Focus States**: Dedicated `:focus-visible` outline indicators highlight every button, text area, input, and tab.
- **WCAG AA Compliance**: Darkened the `--text-muted` color token to achieve a compliant 4.8:1 contrast ratio on white backgrounds.

### 🔬 Scientific Credibility (SDG 13 Alignment)
Our baseline calculations and carbon rates map directly to official environmental research publications:
- **UK DEFRA (2025)**: Greenhouse Gas Reporting Conversion Factors (Transport rates).
- **Poore & Nemecek (Science, 2018)**: Diet carbon footprint statistics.
- **India Central Electricity Authority (2024)**: Regional grid electricity carbon intensity constants.

---

## 📸 Screenshots

### Onboarding Quiz
Before using the dashboard, users take a 4-step interactive quiz to establish their baseline annual carbon footprint.

| Step 1: Commuting Habits | Completed Baseline Estimate |
| :---: | :---: |
| ![Onboarding Step 1](images/onboarding_step1.png) | ![Onboarding Completed](images/onboarding_completed.png) |

### Dashboard
Once the baseline is set, the main dashboard provides a score grade, monthly emissions tracking, your primary source of emissions, and carbon offsets earned.

![Main Dashboard](images/dashboard.png)

### Carbon Analysis & Activity Logging
Users can log daily actions under Transport, Food, Energy, and Shopping. Emissions are calculated in real-time, and daily logs are stored locally.

| Empty Activity Log | Active Daily Log |
| :---: | :---: |
| ![Log Activity (Empty)](images/log_activity_empty.png) | ![Logged Action Entries](images/log_activity.png) |

### Sustainability Recommendations & Actions
Personalized insights offer quick wins and high-impact suggestions, which users can mark as completed in their interactive action checklist.

| Tailored Insights | Recommended Actions |
| :---: | :---: |
| ![Insights](images/insights.png) | ![Actions](images/actions.png) |

### Community Engagement
Users can view the local leaderboard and participate in group sustainability challenges like "Car-Free June".

![Community Challenges & Leaderboard](images/community.png)

---

## 🧠 How It Works

1. User enters lifestyle information
2. System estimates CO₂ emissions
3. Results are compared with:
   - National Average
   - Global Average
   - Climate Targets
4. Personalized sustainability suggestions are generated
5. User can participate in eco challenges

---

## 🌎 Environmental Impact

EcoTrace helps users:

- Understand personal emissions
- Reduce carbon footprint
- Develop sustainable habits
- Contribute to climate action goals

---

## 🎖️ PromptWars Submission

### Vertical

Climate Tech / Sustainability

### Challenge

Build an innovative solution that promotes environmental awareness and sustainability.

### Solution

EcoTrace transforms complex environmental data into simple, actionable insights that help individuals make environmentally responsible decisions.

---

## 🔮 Future Improvements

- AI-powered recommendations
- User authentication
- Carbon footprint history tracking
- Mobile application
- Real-time emission APIs
- Gamification and rewards
- Social sharing

---

## 👨‍💻 Author

**Vedant Dubey**

- GitHub: https://github.com/vedantdubey19
- LinkedIn: Add your LinkedIn URL

---

## ⭐ Support

If you found this project useful:

⭐ Star this repository

🍴 Fork the project

📢 Share it with others

---

## 📄 License

This project is licensed under the MIT License.
