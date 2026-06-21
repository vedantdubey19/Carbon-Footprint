/* ─────────────────────────────────────────────────────────────
   EcoTrace — Application Logic
   ───────────────────────────────────────────────────────────── */

'use strict';

/* ══════════════════════════════════════════
   DATA DEFINITIONS
   ══════════════════════════════════════════ */

const ACTIVITY_DATA = {
  transport: [
    { id: 'car-petrol',  icon: '🚗', name: 'Car (petrol)',    rate: 0.21,  unit: 'km',  rateLabel: '0.21 kg/km' },
    { id: 'ev',          icon: '⚡',  name: 'Electric vehicle', rate: 0.05, unit: 'km',  rateLabel: '0.05 kg/km' },
    { id: 'bus',         icon: '🚌', name: 'Bus',              rate: 0.089, unit: 'km',  rateLabel: '0.089 kg/km' },
    { id: 'metro',       icon: '🚇', name: 'Metro',            rate: 0.041, unit: 'km',  rateLabel: '0.041 kg/km' },
    { id: 'flight',      icon: '✈️', name: 'Short-haul flight',rate: 0.255, unit: 'km',  rateLabel: '0.255 kg/km' },
    { id: 'walk-cycle',  icon: '🚲', name: 'Walk / cycle',     rate: 0,     unit: 'km',  rateLabel: '0 kg/km' },
  ],
  food: [
    { id: 'beef',     icon: '🥩', name: 'Beef',       rate: 27,  unit: 'kg',   rateLabel: '27 kg/kg' },
    { id: 'chicken',  icon: '🍗', name: 'Chicken',    rate: 5.9, unit: 'kg',   rateLabel: '5.9 kg/kg' },
    { id: 'veg-meal', icon: '🥗', name: 'Veg meal',   rate: 2.0, unit: 'meal', rateLabel: '2.0 kg/meal' },
    { id: 'lentils',  icon: '🫘', name: 'Dal / lentils', rate: 0.9, unit: 'kg', rateLabel: '0.9 kg/kg' },
  ],
  energy: [
    { id: 'grid-elec', icon: '🔌', name: 'Grid electricity', rate: 0.82, unit: 'kWh', rateLabel: '0.82 kg/kWh' },
    { id: 'nat-gas',   icon: '🔥', name: 'Natural gas',      rate: 2.04, unit: 'm³',  rateLabel: '2.04 kg/m³' },
    { id: 'solar',     icon: '☀️', name: 'Solar electricity', rate: 0.04, unit: 'kWh', rateLabel: '0.04 kg/kWh' },
  ],
  shopping: [
    { id: 'new-phone',   icon: '📱', name: 'New smartphone',  rate: 33,  unit: 'item', rateLabel: '33 kg/item' },
    { id: 'new-laptop',  icon: '💻', name: 'New laptop',       rate: 600, unit: 'item', rateLabel: '600 kg/item' },
    { id: 'clothing',    icon: '👕', name: 'Clothing',          rate: 2.1, unit: 'item', rateLabel: '2.1 kg/item' },
    { id: 'second-hand', icon: '♻️', name: 'Second-hand item',  rate: 0,   unit: 'item', rateLabel: '0 kg/item' },
  ],
};

const MONTHLY_DATA = [
  { month: 'Jan', actual: 285, target: 260 },
  { month: 'Feb', actual: 270, target: 255 },
  { month: 'Mar', actual: 295, target: 250 },
  { month: 'Apr', actual: 248, target: 245 },
  { month: 'May', actual: 262, target: 240 },
  { month: 'Jun', actual: 258, target: 235 },
];

const BREAKDOWN_DATA = [
  { name: 'Transport',   kg: 127, color: '#378ADD' },
  { name: 'Diet',        kg: 83,  color: '#639922' },
  { name: 'Home energy', kg: 62,  color: '#BA7517' },
  { name: 'Shopping',    kg: 38,  color: '#D85A30' },
];

const INSIGHTS_DATA = [
  {
    impact: 'high',
    badge: '🔴 High impact',
    title: 'Car commute is your top emission source',
    desc: 'Your daily petrol car commute accounts for nearly 41% of your monthly footprint. Switching to metro just 3 times a week could cut your transport emissions significantly.',
    saving: '43 kg/month',
    action: 'Take action →',
  },
  {
    impact: 'medium',
    badge: '🟡 Medium impact',
    title: 'Beef consumption has increased this month',
    desc: 'Beef produces up to 27 kg CO₂ per kilogram — more than most foods. Replacing just one beef meal per week with a plant-based alternative can make a real difference.',
    saving: '25 kg/month',
    action: 'Try plant-based →',
  },
  {
    impact: 'low',
    badge: '🟢 Quick win',
    title: 'Raise your AC setpoint by 2°C at night',
    desc: 'Setting your air conditioner 2°C higher at night reduces energy consumption without affecting comfort. This small change can also save ₹200 on your electricity bill each month.',
    saving: '8 kg/month',
    action: 'Learn more →',
  },
];

const COMPARISON_DATA = [
  { label: 'You',        value: 3.1, color: '#639922', max: 8 },
  { label: 'India avg',  value: 1.9, color: '#378ADD', max: 8 },
  { label: 'Global avg', value: 4.7, color: '#D85A30', max: 8 },
  { label: '2°C target', value: 2.0, color: '#1D9E75', max: 8 },
];

const ACTIONS_DATA = [
  { id: 'a1', icon: '🚇', color: '#EBF3FE', name: 'Take metro 3× this week', desc: 'Swap your daily car commute for metro three times a week to cut transport emissions fast.', difficulty: 'Easy',   saving: '−9 kg/week' },
  { id: 'a2', icon: '🥦', color: '#EAF3DE', name: 'Go meat-free 2 days',     desc: 'Choose plant-based meals on two days this week. A simple habit with outsized impact.', difficulty: 'Easy',   saving: '−12 kg/week' },
  { id: 'a3', icon: '💡', color: '#E6FAF3', name: 'Switch to green electricity', desc: 'Contact your energy provider about a renewable tariff or explore community solar options.', difficulty: 'Medium', saving: '−48 kg/month' },
  { id: 'a4', icon: '♻️', color: '#FEF3E2', name: 'Buy second-hand next purchase', desc: 'Choose pre-owned items on your next shopping trip to avoid manufacturing emissions entirely.', difficulty: 'Medium', saving: '−30–600 kg/item' },
  { id: 'a5', icon: '🌳', color: '#EAF3DE', name: 'Plant an offset tree', desc: 'Participate in a verified tree-planting programme to offset 21 kg of CO₂ over the tree\'s first year.', difficulty: 'Easy', saving: '−21 kg/year' },
];

const LEADERBOARD_DATA = [
  { rank: '🥇', initials: 'AR', name: 'Ananya R.',   city: 'Mumbai',    footprint: '1.2t' },
  { rank: '🥈', initials: 'PK', name: 'Pranav K.',   city: 'Bangalore', footprint: '1.5t' },
  { rank: '🥉', initials: 'SK', name: 'Sana K.',     city: 'Pune',      footprint: '1.8t' },
  { rank: '#142', initials: 'VD', name: 'You',        city: 'Your city', footprint: '3.1t', isYou: true },
];

const CHALLENGES_DATA = [
  { id: 'c1', title: 'Car-Free June',        participants: '1,240',  endDate: 'Jun 30', progress: 73, joinable: false },
  { id: 'c2', title: 'Plant-Based Week',     participants: '892',    endDate: 'Jun 15', progress: 0,  joinable: true  },
  { id: 'c3', title: 'Renewable Switch Drive', participants: '3,410', endDate: 'Jun 30', progress: 30, joinable: false },
];

/* ══════════════════════════════════════════
   CALCULATION & VALIDATION UTILITIES
   ══════════════════════════════════════════ */

/**
 * Calculates baseline annual carbon footprint from quiz answers.
 * @param {Object} answers 
 * @returns {number} tonnes CO2 / year
 */
function calculateAnnualBaseline(answers) {
  if (!answers || typeof answers !== 'object') return 0;
  return parseFloat(
    Object.values(answers)
      .reduce((sum, val) => sum + (parseFloat(val) || 0), 0)
      .toFixed(1)
  );
}

/**
 * Calculates emissions for a specific logged activity.
 * @param {number} rate - kg CO2 per unit
 * @param {number} qty - quantity
 * @returns {number} kg CO2
 */
function calculateEmission(rate, qty) {
  if (typeof rate !== 'number' || typeof qty !== 'number') return 0;
  return parseFloat((rate * qty).toFixed(2));
}

/**
 * Validates a user quantity input to prevent invalid numbers or overflows.
 * @param {any} value 
 * @returns {boolean}
 */
function validateQuantity(value) {
  const parsed = parseFloat(value);
  return !isNaN(parsed) && isFinite(parsed) && parsed > 0 && parsed <= 1000000;
}

/**
 * Validates the loaded state schema for robustness.
 * @param {Object} raw 
 * @returns {Object} validated state
 */
function validateStateSchema(raw) {
  const validated = {
    baseline: null,
    quizAnswers: {},
    logEntries: [],
    completedActions: new Set(),
    joinedChallenges: new Set()
  };

  if (raw && typeof raw === 'object') {
    // Baseline
    if (typeof raw.baseline === 'number' && isFinite(raw.baseline) && raw.baseline >= 0) {
      validated.baseline = parseFloat(raw.baseline.toFixed(1));
    }
    // Quiz Answers
    if (raw.quizAnswers && typeof raw.quizAnswers === 'object' && !Array.isArray(raw.quizAnswers)) {
      Object.entries(raw.quizAnswers).forEach(([qKey, val]) => {
        if (['q1', 'q2', 'q3', 'q4'].includes(qKey) && typeof val === 'number' && isFinite(val) && val >= 0) {
          validated.quizAnswers[qKey] = val;
        }
      });
    }
    // Log Entries
    if (Array.isArray(raw.logEntries)) {
      raw.logEntries.forEach(entry => {
        if (entry && typeof entry === 'object') {
          validated.logEntries.push({
            id: typeof entry.id === 'number' ? entry.id : Date.now(),
            icon: typeof entry.icon === 'string' ? entry.icon : '📝',
            name: typeof entry.name === 'string' ? entry.name : 'Unknown Activity',
            time: typeof entry.time === 'string' ? entry.time : '',
            qty: typeof entry.qty === 'number' ? entry.qty : 0,
            unit: typeof entry.unit === 'string' ? entry.unit : '',
            kg: typeof entry.kg === 'number' ? entry.kg : 0,
            isOffset: typeof entry.isOffset === 'boolean' ? entry.isOffset : false
          });
        }
      });
    }
    // Completed Actions
    if (Array.isArray(raw.completedActions)) {
      raw.completedActions.forEach(id => {
        if (typeof id === 'string') validated.completedActions.add(id);
      });
    }
    // Joined Challenges
    if (Array.isArray(raw.joinedChallenges)) {
      raw.joinedChallenges.forEach(id => {
        if (typeof id === 'string') validated.joinedChallenges.add(id);
      });
    }
  }

  return validated;
}

/* ══════════════════════════════════════════
   STATE MANAGEMENT
   ══════════════════════════════════════════ */
const State = {
  baseline: null,      // tonnes CO2 / year
  quizAnswers: {},     // { q1: val, q2: val, q3: val, q4: val }
  logEntries: [],      // array of log entry objects
  completedActions: new Set(),
  joinedChallenges: new Set(),
  selectedActivity: null,
  selectedCategory: 'transport',

  load() {
    try {
      const b = localStorage.getItem('eco_baseline');
      const qa = localStorage.getItem('eco_quiz_answers');
      const le = localStorage.getItem('eco_log_entries');
      const ca = localStorage.getItem('eco_completed_actions');
      const jc = localStorage.getItem('eco_joined_challenges');

      const raw = {
        baseline: b ? parseFloat(b) : null,
        quizAnswers: qa ? JSON.parse(qa) : {},
        logEntries: le ? JSON.parse(le) : [],
        completedActions: ca ? JSON.parse(ca) : [],
        joinedChallenges: jc ? JSON.parse(jc) : []
      };

      const validated = validateStateSchema(raw);

      this.baseline = validated.baseline;
      this.quizAnswers = validated.quizAnswers;
      this.logEntries = validated.logEntries;
      this.completedActions = validated.completedActions;
      this.joinedChallenges = validated.joinedChallenges;
    } catch (e) {
      console.warn('State load error, falling back to safe defaults', e);
      this.baseline = null;
      this.quizAnswers = {};
      this.logEntries = [];
      this.completedActions = new Set();
      this.joinedChallenges = new Set();
    }
  },

  save() {
    try {
      if (this.baseline !== null) {
        localStorage.setItem('eco_baseline', this.baseline.toString());
      }
      localStorage.setItem('eco_quiz_answers', JSON.stringify(this.quizAnswers));
      localStorage.setItem('eco_log_entries', JSON.stringify(this.logEntries));
      localStorage.setItem('eco_completed_actions', JSON.stringify([...this.completedActions]));
      localStorage.setItem('eco_joined_challenges', JSON.stringify([...this.joinedChallenges]));
    } catch (e) {
      console.warn('State save error', e);
    }
  },
};

/* ══════════════════════════════════════════
   TOAST SYSTEM
   ══════════════════════════════════════════ */
function showToast(message, type = 'default', duration = 3200) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

/* ══════════════════════════════════════════
   NAVIGATION
   ══════════════════════════════════════════ */
let currentScreen = 'onboarding';

function navigateTo(screenId) {
  const screen = document.getElementById(`screen-${screenId}`);
  if (screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }

  const tab = document.getElementById(`tab-${screenId}`);
  if (tab) {
    document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  }

  currentScreen = screenId;

  // Trigger deferred renders
  if (screenId === 'dashboard')  renderDashboard();
  if (screenId === 'insights')   renderInsights();
  if (screenId === 'actions')    renderActions();
  if (screenId === 'community')  renderCommunity();
  if (screenId === 'log')        renderLogScreen();
}

function initNav() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => navigateTo(tab.dataset.screen));
  });
}

/* ══════════════════════════════════════════
   SCREEN 1 — ONBOARDING
   ══════════════════════════════════════════ */
function initOnboarding() {
  const questions = ['q1', 'q2', 'q3', 'q4'];
  const progressFill = document.getElementById('quiz-progress-fill');
  const stepLabel = document.getElementById('quiz-step-label');
  const previewValue = document.getElementById('preview-value');
  const btnDash = document.getElementById('btn-see-dashboard');

  if (!previewValue || !btnDash) return;

  let answeredCount = 0;

  function updateLiveSum() {
    const total = calculateAnnualBaseline(State.quizAnswers);
    previewValue.innerHTML = `${total.toFixed(1)} <span>tonnes CO₂</span>`;
    return total;
  }

  function updateProgress() {
    answeredCount = Object.keys(State.quizAnswers).length;
    const pct = (answeredCount / 4) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (stepLabel) stepLabel.textContent = `Step ${Math.min(answeredCount + 1, 4)} of 4`;
    btnDash.disabled = answeredCount < 4;
  }

  questions.forEach(qId => {
    const card = document.getElementById(qId);
    if (!card) return;
    const options = card.querySelectorAll('.quiz-option');

    // Restore previous answer
    if (State.quizAnswers[qId] !== undefined) {
      options.forEach(opt => {
        const radio = opt.querySelector('input[type=radio]');
        if (radio && parseFloat(radio.value) === State.quizAnswers[qId]) {
          opt.classList.add('selected');
          radio.checked = true;
        }
      });
      // Show this card if it's answered, show next
      const idx = questions.indexOf(qId);
      if (State.quizAnswers[qId] !== undefined && idx < questions.length - 1) {
        card.classList.remove('active');
        const nextCard = document.getElementById(questions[idx + 1]);
        if (nextCard && State.quizAnswers[questions[idx + 1]] === undefined) {
          nextCard.classList.add('active');
        }
      }
    }

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const radio = opt.querySelector('input[type=radio]');
        if (!radio) return;
        const val = parseFloat(radio.value);

        // Deselect siblings
        card.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        radio.checked = true;

        State.quizAnswers[qId] = val;
        State.save();

        updateLiveSum();
        updateProgress();

        // Advance to next question
        const idx = questions.indexOf(qId);
        if (idx < questions.length - 1) {
          setTimeout(() => {
            card.classList.remove('active');
            const next = document.getElementById(questions[idx + 1]);
            if (next) next.classList.add('active');
          }, 300);
        }

        showToast(`Answer saved ✓`, 'success', 1800);
      });
    });
  });

  // Init state
  updateLiveSum();
  updateProgress();

  // Show correct active card
  const firstUnanswered = questions.find(q => State.quizAnswers[q] === undefined);
  if (firstUnanswered) {
    document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('active'));
    const firstCard = document.getElementById(firstUnanswered);
    if (firstCard) firstCard.classList.add('active');
  } else {
    // All answered — show last card
    document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('active'));
    const q4Card = document.getElementById('q4');
    if (q4Card) q4Card.classList.add('active');
  }

  btnDash.addEventListener('click', () => {
    const total = calculateAnnualBaseline(State.quizAnswers);
    State.baseline = total;
    State.save();
    showToast('Baseline saved! Loading your dashboard…', 'success');
    setTimeout(() => navigateTo('dashboard'), 600);
  });
}

/* ══════════════════════════════════════════
   SCREEN 2 — DASHBOARD
   ══════════════════════════════════════════ */
function renderDashboard() {
  const footprint = State.baseline ?? 3.1;

  // ── Score ring ──
  const circumference = 2 * Math.PI * 68; // ≈ 427
  const maxFP = 15; // tonnes for 100% fill
  const pct = Math.min(footprint / maxFP, 1);
  const offset = circumference * (1 - pct);

  const ring = document.getElementById('ring-track');
  if (ring) {
    ring.style.strokeDashoffset = circumference.toString(); // reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ring.style.strokeDashoffset = offset.toString();
      });
    });

    // Color ring by footprint
    let ringColor = '#639922'; // green
    if (footprint > 6)      ringColor = '#D85A30'; // coral
    else if (footprint > 3) ringColor = '#BA7517'; // amber
    ring.style.stroke = ringColor;
  }

  // Grade
  let grade = 'A';
  if (footprint > 8)      grade = 'D';
  else if (footprint > 5) grade = 'C';
  else if (footprint > 3) grade = 'B';

  const gradeEl = document.getElementById('ring-grade');
  if (gradeEl) gradeEl.textContent = grade;
  const valEl = document.getElementById('ring-value');
  if (valEl) valEl.innerHTML = `${footprint.toFixed(1)}<span>t</span>`;

  const globalAvg = 4.7;
  const diff = ((globalAvg - footprint) / globalAvg * 100).toFixed(0);
  const statusEl = document.getElementById('ring-status');
  if (statusEl) {
    if (footprint < globalAvg) {
      statusEl.textContent = `${Math.abs(diff)}% below global avg`;
      if (ring) ring.style.stroke = '#639922';
    } else {
      statusEl.textContent = `${diff}% above global avg`;
      if (ring) ring.style.stroke = '#D85A30';
    }
  }

  // ── Monthly bar chart ──
  renderMonthlyChart();

  // ── Breakdown ──
  const totalBreakdown = BREAKDOWN_DATA.reduce((s, d) => s + d.kg, 0);
  const breakdownEl = document.getElementById('breakdown-list');
  if (breakdownEl) {
    breakdownEl.innerHTML = '';
    BREAKDOWN_DATA.forEach(item => {
      const pctItem = ((item.kg / totalBreakdown) * 100).toFixed(0);
      const div = document.createElement('div');
      div.className = 'breakdown-item';
      
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      
      const name = document.createElement('span');
      name.className = 'breakdown-name';
      name.textContent = item.name;
      
      const value = document.createElement('span');
      value.className = 'breakdown-val';
      value.textContent = `${item.kg} kg`;

      row.appendChild(name);
      row.appendChild(value);

      const bar = document.createElement('div');
      bar.className = 'breakdown-bar';

      const fill = document.createElement('div');
      fill.className = 'breakdown-fill';
      fill.style.width = '0%';
      fill.style.background = item.color;
      fill.setAttribute('data-w', pctItem);

      bar.appendChild(fill);
      div.appendChild(row);
      div.appendChild(bar);
      breakdownEl.appendChild(div);
    });

    // Animate breakdown bars
    setTimeout(() => {
      breakdownEl.querySelectorAll('.breakdown-fill').forEach(el => {
        el.style.width = el.getAttribute('data-w') + '%';
      });
    }, 100);
  }
}

function renderMonthlyChart() {
  const container = document.getElementById('monthly-chart');
  if (!container) return;
  container.innerHTML = '';

  const maxVal = Math.max(...MONTHLY_DATA.map(d => Math.max(d.actual, d.target)));

  MONTHLY_DATA.forEach(d => {
    const group = document.createElement('div');
    group.className = 'bar-group';

    const barsRow = document.createElement('div');
    barsRow.className = 'bars-row';

    const barA = document.createElement('div');
    barA.className = 'bar actual';
    barA.style.height = '0%';
    barA.title = `${d.month} actual: ${d.actual} kg`;

    const barT = document.createElement('div');
    barT.className = 'bar target';
    barT.style.height = '0%';
    barT.title = `${d.month} target: ${d.target} kg`;

    barsRow.appendChild(barA);
    barsRow.appendChild(barT);

    const label = document.createElement('div');
    label.className = 'bar-label';
    label.textContent = d.month;

    group.appendChild(barsRow);
    group.appendChild(label);
    container.appendChild(group);

    // Animate
    setTimeout(() => {
      barA.style.height = `${(d.actual / maxVal) * 100}%`;
      barT.style.height = `${(d.target / maxVal) * 100}%`;
    }, 80);
  });
}

/* ══════════════════════════════════════════
   SCREEN 3 — LOG ACTIVITY
   ══════════════════════════════════════════ */
function renderLogScreen() {
  // Build activity grids
  Object.entries(ACTIVITY_DATA).forEach(([cat, items]) => {
    const grid = document.getElementById(`grid-${cat}`);
    if (!grid || grid.children.length > 0) return;
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'activity-item';
      el.dataset.id = item.id;
      el.dataset.cat = cat;
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `Select ${item.name}, rate is ${item.rateLabel}`);

      const icon = document.createElement('span');
      icon.className = 'act-icon';
      icon.textContent = item.icon;
      icon.setAttribute('role', 'img');
      icon.setAttribute('aria-label', item.name);

      const body = document.createElement('div');
      body.className = 'act-body';

      const name = document.createElement('div');
      name.className = 'act-name';
      name.textContent = item.name;

      const rate = document.createElement('div');
      rate.className = 'act-rate';
      rate.textContent = item.rateLabel;

      body.appendChild(name);
      body.appendChild(rate);
      el.appendChild(icon);
      el.appendChild(body);

      // Mouse click
      el.addEventListener('click', () => selectActivity(item, cat));
      
      // Keyboard selection (Enter or Space)
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectActivity(item, cat);
        }
      });

      grid.appendChild(el);
    });
  });

  // Category tab switching
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => { 
        t.classList.remove('active'); 
        t.setAttribute('aria-selected', 'false'); 
      });
      document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      State.selectedCategory = tab.dataset.cat;
      const panel = document.getElementById(`cat-panel-${tab.dataset.cat}`);
      if (panel) panel.classList.add('active');
      State.selectedActivity = null;
      updateCO2Preview();
    });
  });

  // Quantity input
  const qtyInput = document.getElementById('log-qty');
  if (qtyInput) {
    qtyInput.removeEventListener('input', updateCO2Preview);
    qtyInput.addEventListener('input', updateCO2Preview);
  }

  // Add to log
  const addLogBtn = document.getElementById('btn-add-log');
  if (addLogBtn) {
    addLogBtn.replaceWith(addLogBtn.cloneNode(true));
    document.getElementById('btn-add-log').addEventListener('click', addLogEntry);
  }

  renderLogList();
}

function selectActivity(item, cat) {
  // Clear all selections
  document.querySelectorAll('.activity-item').forEach(el => el.classList.remove('selected'));

  // Select clicked
  const el = document.querySelector(`.activity-item[data-id="${item.id}"]`);
  if (el) el.classList.add('selected');

  State.selectedActivity = item;
  
  const unitEl = document.getElementById('qty-unit');
  if (unitEl) unitEl.textContent = item.unit;
  
  const qtyEl = document.getElementById('log-qty');
  if (qtyEl) qtyEl.value = '';
  
  updateCO2Preview();
}

function updateCO2Preview() {
  const item = State.selectedActivity;
  const qtyEl = document.getElementById('log-qty');
  const co2ValEl = document.getElementById('co2-val');
  const co2EqEl = document.getElementById('co2-eq');

  if (!qtyEl || !co2ValEl || !co2EqEl) return;

  const qty = parseFloat(qtyEl.value) || 0;

  if (!item) {
    co2ValEl.textContent = '—';
    co2EqEl.textContent = 'Select an activity and enter quantity';
    return;
  }

  const kg = calculateEmission(item.rate, qty);
  co2ValEl.textContent = `${kg.toFixed(2)} kg`;

  if (kg === 0) {
    co2EqEl.textContent = item.rate === 0 ? 'Zero-emission activity 🎉' : 'Enter a quantity above';
  } else {
    const kmEquiv = (kg / 0.21).toFixed(0); // equivalent km driven (car petrol)
    co2EqEl.textContent = `Equal to ${kmEquiv} km of car driving`;
  }
}

function addLogEntry() {
  const item = State.selectedActivity;
  if (!item) { showToast('Please select an activity first', 'error'); return; }

  const qtyInput = document.getElementById('log-qty');
  if (!qtyInput) return;
  
  const qty = parseFloat(qtyInput.value);
  if (!validateQuantity(qty)) { 
    showToast('Please enter a valid positive quantity', 'error'); 
    return; 
  }

  const kg = calculateEmission(item.rate, qty);
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const entry = {
    id: Date.now(),
    icon: item.icon,
    name: item.name,
    time: timeStr,
    qty: qty,
    unit: item.unit,
    kg: kg,
    isOffset: kg === 0 || item.id === 'second-hand',
  };

  State.logEntries.unshift(entry);
  State.save();
  renderLogList();

  qtyInput.value = '';
  updateCO2Preview();
  showToast(`Logged ${item.name}: ${kg} kg CO₂`, kg > 0 ? 'default' : 'success');
}

function renderLogList() {
  const listEl = document.getElementById('log-list');
  const emptyMsg = document.getElementById('empty-log-msg');
  if (!listEl) return;

  // Remove old entries (keep empty msg)
  listEl.querySelectorAll('.log-entry').forEach(e => e.remove());

  if (State.logEntries.length === 0) {
    if (emptyMsg) emptyMsg.style.display = '';
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';

  State.logEntries.forEach(entry => {
    const el = document.createElement('div');
    el.className = 'log-entry';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'log-entry-icon';
    iconSpan.textContent = entry.icon || '📝';
    iconSpan.setAttribute('role', 'img');
    iconSpan.setAttribute('aria-label', entry.name || 'activity');

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'log-entry-body';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'log-entry-name';
    nameDiv.textContent = entry.name || '';

    const metaDiv = document.createElement('div');
    metaDiv.className = 'log-entry-meta';
    metaDiv.textContent = `${entry.time || ''} · ${entry.qty || 0} ${entry.unit || ''}`;

    bodyDiv.appendChild(nameDiv);
    bodyDiv.appendChild(metaDiv);

    const isOffset = entry.kg === 0;
    const kgStr = isOffset ? '0 kg' : `+${entry.kg} kg`;
    const co2Class = isOffset ? 'offset' : 'emission';

    const co2Span = document.createElement('span');
    co2Span.className = `log-entry-co2 ${co2Class}`;
    co2Span.textContent = kgStr;

    el.appendChild(iconSpan);
    el.appendChild(bodyDiv);
    el.appendChild(co2Span);

    listEl.appendChild(el);
  });
}

/* ══════════════════════════════════════════
   SCREEN 4 — INSIGHTS
   ══════════════════════════════════════════ */
function renderInsights() {
  const container = document.getElementById('insight-cards');
  if (!container) return;

  if (container.children.length > 0) {
    renderComparisonChart();
    return;
  }

  INSIGHTS_DATA.forEach(ins => {
    const card = document.createElement('div');
    card.className = 'insight-card';

    const impactClass = ins.impact === 'high' ? 'impact-high' : ins.impact === 'medium' ? 'impact-medium' : 'impact-low';

    const badge = document.createElement('span');
    badge.className = `impact-badge ${impactClass}`;
    badge.textContent = ins.badge;

    const title = document.createElement('div');
    title.className = 'insight-title';
    title.textContent = ins.title;

    const desc = document.createElement('div');
    desc.className = 'insight-desc';
    desc.textContent = ins.desc;

    const saving = document.createElement('div');
    saving.className = 'insight-saving';
    saving.textContent = `Potential saving: ${ins.saving}`;

    const btn = document.createElement('button');
    btn.className = 'btn-insight';
    btn.textContent = ins.action;
    btn.addEventListener('click', () => {
      showToast(`Opening action plan for: ${ins.title}`, 'info');
    });

    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(saving);
    card.appendChild(btn);

    container.appendChild(card);
  });

  // Clear badge
  const badgeEl = document.getElementById('insights-badge');
  if (badgeEl) badgeEl.style.display = 'none';

  renderComparisonChart();
}

function renderComparisonChart() {
  const container = document.getElementById('comparison-chart');
  if (!container) return;
  container.innerHTML = '';
  const maxVal = 5;

  COMPARISON_DATA.forEach(item => {
    const row = document.createElement('div');
    row.className = 'hbar-row';

    const label = document.createElement('div');
    label.className = 'hbar-label';
    label.textContent = item.label;

    const track = document.createElement('div');
    track.className = 'hbar-track';

    const fill = document.createElement('div');
    fill.className = 'hbar-fill';
    fill.style.width = '0%';
    fill.style.background = item.color;
    fill.setAttribute('data-w', ((item.value / maxVal) * 100).toString());

    track.appendChild(fill);

    const val = document.createElement('div');
    val.className = 'hbar-val';
    val.style.color = item.color;
    val.textContent = `${item.value}t`;

    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(val);
    container.appendChild(row);
  });

  setTimeout(() => {
    container.querySelectorAll('.hbar-fill').forEach(el => {
      el.style.width = el.getAttribute('data-w') + '%';
    });
  }, 80);
}

/* ══════════════════════════════════════════
   SCREEN 5 — ACTIONS
   ══════════════════════════════════════════ */
function renderActions() {
  const list = document.getElementById('action-list');
  if (!list || list.children.length > 0) return;

  ACTIONS_DATA.forEach(action => {
    const card = document.createElement('div');
    card.className = 'action-card';
    card.id = `action-card-${action.id}`;
    if (State.completedActions.has(action.id)) card.classList.add('completed');

    const diffClass = action.difficulty === 'Easy' ? 'tag-easy' : action.difficulty === 'Medium' ? 'tag-medium' : 'tag-hard';
    const isChecked = State.completedActions.has(action.id);

    const iconWrap = document.createElement('div');
    iconWrap.className = 'action-icon-wrap';
    iconWrap.style.background = action.color;
    iconWrap.textContent = action.icon;
    iconWrap.setAttribute('role', 'img');
    iconWrap.setAttribute('aria-label', action.name);

    const body = document.createElement('div');
    body.className = 'action-body';

    const name = document.createElement('div');
    name.className = 'action-name';
    name.textContent = action.name;

    const desc = document.createElement('div');
    desc.className = 'action-desc';
    desc.textContent = action.desc;

    const tags = document.createElement('div');
    tags.className = 'action-tags';

    const diffTag = document.createElement('span');
    diffTag.className = `tag ${diffClass}`;
    diffTag.textContent = action.difficulty;

    const savingTag = document.createElement('span');
    savingTag.className = 'tag tag-saving';
    savingTag.textContent = action.saving;

    tags.appendChild(diffTag);
    tags.appendChild(savingTag);
    body.appendChild(name);
    body.appendChild(desc);
    body.appendChild(tags);

    const checkBtn = document.createElement('button');
    checkBtn.className = `action-check ${isChecked ? 'checked' : ''}`;
    checkBtn.id = `check-${action.id}`;
    checkBtn.setAttribute('aria-label', `Mark ${action.name} as completed`);
    checkBtn.setAttribute('aria-pressed', isChecked.toString());
    checkBtn.textContent = isChecked ? '✓' : '';

    checkBtn.addEventListener('click', () => toggleAction(action, checkBtn, card));

    card.appendChild(iconWrap);
    card.appendChild(body);
    card.appendChild(checkBtn);
    list.appendChild(card);
  });
}

function toggleAction(action, btn, card) {
  const alreadyDone = State.completedActions.has(action.id);

  if (alreadyDone) {
    State.completedActions.delete(action.id);
    btn.classList.remove('checked');
    btn.textContent = '';
    btn.setAttribute('aria-pressed', 'false');
    card.classList.remove('completed');
    showToast(`Action unmarked`, 'default');
  } else {
    State.completedActions.add(action.id);
    btn.classList.add('checked');
    btn.textContent = '✓';
    btn.setAttribute('aria-pressed', 'true');
    card.classList.add('completed');
    showToast(`Action completed! 🎉 Points earned.`, 'success');
  }

  State.save();
}

/* ══════════════════════════════════════════
   SCREEN 6 — COMMUNITY
   ══════════════════════════════════════════ */
function renderCommunity() {
  renderLeaderboard();
  renderChallenges();
}

function renderLeaderboard() {
  const lb = document.getElementById('leaderboard');
  if (!lb || lb.children.length > 0) return;

  LEADERBOARD_DATA.forEach(row => {
    const el = document.createElement('div');
    el.className = `lb-row${row.isYou ? ' you-row' : ''}`;

    const rank = document.createElement('div');
    rank.className = 'lb-rank';
    rank.textContent = row.rank;

    const avatar = document.createElement('div');
    avatar.className = 'lb-avatar';
    avatar.textContent = row.initials;

    const name = document.createElement('div');
    name.className = 'lb-name';

    const fullname = document.createElement('div');
    fullname.textContent = row.name;

    const city = document.createElement('div');
    city.className = 'lb-city';
    city.textContent = row.city;

    name.appendChild(fullname);
    name.appendChild(city);

    const footprint = document.createElement('div');
    footprint.className = 'lb-footprint';
    footprint.textContent = row.footprint;

    el.appendChild(rank);
    el.appendChild(avatar);
    el.appendChild(name);
    el.appendChild(footprint);
    lb.appendChild(el);
  });
}

function renderChallenges() {
  const container = document.getElementById('challenge-cards');
  if (!container) return;

  if (container.children.length > 0) {
    // Update progress for joined challenges
    State.joinedChallenges.forEach(id => {
      const fill = container.querySelector(`[data-challenge-fill="${id}"]`);
      const btn  = container.querySelector(`[data-challenge-btn="${id}"]`);
      if (fill && parseFloat(fill.getAttribute('data-progress')) === 0) {
        fill.style.width = '5%';
      }
      if (btn) { 
        btn.textContent = 'Joined ✓'; 
        btn.classList.add('joined'); 
      }
    });
    return;
  }

  CHALLENGES_DATA.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'challenge-card';

    const header = document.createElement('div');
    header.className = 'challenge-header';

    const textWrap = document.createElement('div');
    
    const title = document.createElement('div');
    title.className = 'challenge-title';
    title.textContent = ch.title;

    const meta = document.createElement('div');
    meta.className = 'challenge-meta';
    meta.textContent = `${ch.participants} participants · ends ${ch.endDate}`;

    textWrap.appendChild(title);
    textWrap.appendChild(meta);
    header.appendChild(textWrap);

    if (ch.joinable) {
      const btn = document.createElement('button');
      btn.className = 'challenge-join';
      btn.setAttribute('data-challenge-btn', ch.id);
      btn.id = `join-${ch.id}`;
      btn.textContent = State.joinedChallenges.has(ch.id) ? 'Joined ✓' : 'Join challenge';
      if (State.joinedChallenges.has(ch.id)) btn.classList.add('joined');
      btn.addEventListener('click', () => joinChallenge(ch, btn, card));
      header.appendChild(btn);
    } else {
      const pct = document.createElement('span');
      pct.className = 'challenge-pct';
      pct.textContent = `${ch.progress}% done`;
      header.appendChild(pct);
    }

    const bar = document.createElement('div');
    bar.className = 'challenge-bar';

    const fill = document.createElement('div');
    fill.className = 'challenge-bar-fill';
    fill.setAttribute('data-challenge-fill', ch.id);
    fill.setAttribute('data-progress', ch.progress.toString());
    fill.style.width = '0%';

    bar.appendChild(fill);
    card.appendChild(header);
    card.appendChild(bar);
    container.appendChild(card);
  });

  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.challenge-bar-fill').forEach(el => {
      const ch = CHALLENGES_DATA.find(c => c.id === el.getAttribute('data-challenge-fill'));
      const p = State.joinedChallenges.has(el.getAttribute('data-challenge-fill')) && ch?.progress === 0 ? 5 : (ch?.progress ?? 0);
      el.style.width = `${p}%`;
    });
  }, 80);
}

function joinChallenge(ch, btn, card) {
  if (State.joinedChallenges.has(ch.id)) return;

  State.joinedChallenges.add(ch.id);
  State.save();

  btn.textContent = 'Joined ✓';
  btn.classList.add('joined');

  // Animate bar from 0 to 5%
  const fill = card.querySelector(`[data-challenge-fill="${ch.id}"]`);
  if (fill) {
    setTimeout(() => { fill.style.width = '5%'; }, 100);
  }

  showToast(`You joined "${ch.title}"! 🌿`, 'success');
}

/* ══════════════════════════════════════════
   METHODOLOGY ACCORDION
   ══════════════════════════════════════════ */
function initMethodology() {
  const btn = document.getElementById('btn-toggle-methodology');
  const content = document.getElementById('methodology-content');
  if (!btn || !content) return;

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', (!isExpanded).toString());
    content.style.display = isExpanded ? 'none' : 'block';
    btn.textContent = isExpanded ? 'Show details ↓' : 'Hide details ↑';
  });
}

/* ══════════════════════════════════════════
   BOOTSTRAP
   ══════════════════════════════════════════ */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    State.load();
    initNav();
    initOnboarding();
    initMethodology();

    // If baseline already set, default to dashboard
    const startScreen = State.baseline !== null ? 'dashboard' : 'onboarding';
    navigateTo(startScreen);
  });
}

/* ══════════════════════════════════════════
   EXPORTS FOR JEST AND TESTING
   ══════════════════════════════════════════ */
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    ACTIVITY_DATA,
    MONTHLY_DATA,
    BREAKDOWN_DATA,
    INSIGHTS_DATA,
    COMPARISON_DATA,
    ACTIONS_DATA,
    LEADERBOARD_DATA,
    CHALLENGES_DATA,
    calculateAnnualBaseline,
    calculateEmission,
    validateQuantity,
    validateStateSchema,
    State
  };
}
