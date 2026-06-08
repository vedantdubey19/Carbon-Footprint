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
   STATE
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
      if (b) this.baseline = parseFloat(b);
      const qa = localStorage.getItem('eco_quiz_answers');
      if (qa) this.quizAnswers = JSON.parse(qa);
      const le = localStorage.getItem('eco_log_entries');
      if (le) this.logEntries = JSON.parse(le);
      const ca = localStorage.getItem('eco_completed_actions');
      if (ca) this.completedActions = new Set(JSON.parse(ca));
      const jc = localStorage.getItem('eco_joined_challenges');
      if (jc) this.joinedChallenges = new Set(JSON.parse(jc));
    } catch (e) { console.warn('State load error', e); }
  },

  save() {
    try {
      if (this.baseline !== null) localStorage.setItem('eco_baseline', this.baseline);
      localStorage.setItem('eco_quiz_answers', JSON.stringify(this.quizAnswers));
      localStorage.setItem('eco_log_entries', JSON.stringify(this.logEntries));
      localStorage.setItem('eco_completed_actions', JSON.stringify([...this.completedActions]));
      localStorage.setItem('eco_joined_challenges', JSON.stringify([...this.joinedChallenges]));
    } catch (e) { console.warn('State save error', e); }
  },
};

/* ══════════════════════════════════════════
   TOAST SYSTEM
   ══════════════════════════════════════════ */
function showToast(message, type = 'default', duration = 3200) {
  const container = document.getElementById('toast-container');
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
  // Hide all screens
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  // Show target
  const screen = document.getElementById(`screen-${screenId}`);
  if (screen) screen.classList.add('active');

  const tab = document.getElementById(`tab-${screenId}`);
  if (tab) tab.classList.add('active');

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

  let answeredCount = 0;

  function updateLiveSum() {
    let total = 0;
    questions.forEach(q => {
      if (State.quizAnswers[q] !== undefined) total += parseFloat(State.quizAnswers[q]);
    });
    previewValue.innerHTML = `${total.toFixed(1)} <span>tonnes CO₂</span>`;
    return total;
  }

  function updateProgress() {
    answeredCount = Object.keys(State.quizAnswers).length;
    const pct = (answeredCount / 4) * 100;
    progressFill.style.width = `${pct}%`;
    stepLabel.textContent = `Step ${Math.min(answeredCount + 1, 4)} of 4`;
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
        if (parseFloat(radio.value) === State.quizAnswers[qId]) {
          opt.classList.add('selected');
          radio.checked = true;
        }
      });
      // Show this card if it's answered, show next
      const idx = questions.indexOf(qId);
      if (State.quizAnswers[qId] !== undefined && idx < questions.length - 1) {
        card.classList.remove('active');
        const nextCard = document.getElementById(questions[idx + 1]);
        if (nextCard && !State.quizAnswers[questions[idx + 1]]) {
          nextCard.classList.add('active');
        }
      }
    }

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const radio = opt.querySelector('input[type=radio]');
        const val = parseFloat(radio.value);

        // Deselect siblings
        card.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        radio.checked = true;

        State.quizAnswers[qId] = val;
        State.save();

        const sum = updateLiveSum();
        updateProgress();

        // Advance to next question
        const idx = questions.indexOf(qId);
        if (idx < questions.length - 1) {
          setTimeout(() => {
            card.classList.remove('active');
            document.getElementById(questions[idx + 1]).classList.add('active');
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
  let firstUnanswered = questions.find(q => State.quizAnswers[q] === undefined);
  if (firstUnanswered) {
    document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('active'));
    document.getElementById(firstUnanswered).classList.add('active');
  } else {
    // All answered — show last card
    document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('active'));
    document.getElementById('q4').classList.add('active');
  }

  btnDash.addEventListener('click', () => {
    const total = Object.values(State.quizAnswers).reduce((a, b) => a + parseFloat(b), 0);
    State.baseline = parseFloat(total.toFixed(1));
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
  ring.style.strokeDashoffset = circumference; // reset
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ring.style.strokeDashoffset = offset;
    });
  });

  // Color ring by footprint
  let ringColor = '#639922'; // green
  if (footprint > 6)      ringColor = '#D85A30'; // coral
  else if (footprint > 3) ringColor = '#BA7517'; // amber
  ring.style.stroke = ringColor;

  // Grade
  let grade = 'A';
  if (footprint > 8)      grade = 'D';
  else if (footprint > 5) grade = 'C';
  else if (footprint > 3) grade = 'B';

  document.getElementById('ring-grade').textContent = grade;
  document.getElementById('ring-value').innerHTML = `${footprint.toFixed(1)}<span>t</span>`;

  const globalAvg = 4.7;
  const diff = ((globalAvg - footprint) / globalAvg * 100).toFixed(0);
  const statusEl = document.getElementById('ring-status');
  if (footprint < globalAvg) {
    statusEl.textContent = `${Math.abs(diff)}% below global avg`;
    ring.style.stroke = '#639922';
  } else {
    statusEl.textContent = `${diff}% above global avg`;
    ring.style.stroke = '#D85A30';
  }

  // ── Monthly bar chart ──
  renderMonthlyChart();

  // ── Breakdown ──
  const total = BREAKDOWN_DATA.reduce((s, d) => s + d.kg, 0);
  const breakdownEl = document.getElementById('breakdown-list');
  breakdownEl.innerHTML = '';
  BREAKDOWN_DATA.forEach(item => {
    const pctItem = ((item.kg / total) * 100).toFixed(0);
    const div = document.createElement('div');
    div.className = 'breakdown-item';
    div.innerHTML = `
      <div class="breakdown-row">
        <span class="breakdown-name">${item.name}</span>
        <span class="breakdown-val">${item.kg} kg</span>
      </div>
      <div class="breakdown-bar">
        <div class="breakdown-fill" style="width:0%;background:${item.color}" data-w="${pctItem}"></div>
      </div>`;
    breakdownEl.appendChild(div);
  });

  // Animate breakdown bars
  setTimeout(() => {
    breakdownEl.querySelectorAll('.breakdown-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 100);
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
      el.innerHTML = `
        <span class="act-icon">${item.icon}</span>
        <div class="act-body">
          <div class="act-name">${item.name}</div>
          <div class="act-rate">${item.rateLabel}</div>
        </div>`;
      el.addEventListener('click', () => selectActivity(item, cat));
      grid.appendChild(el);
    });
  });

  // Category tab switching
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      document.querySelectorAll('.cat-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      State.selectedCategory = tab.dataset.cat;
      document.getElementById(`cat-panel-${tab.dataset.cat}`).classList.add('active');
      State.selectedActivity = null;
      updateCO2Preview();
    });
  });

  // Quantity input
  document.getElementById('log-qty').addEventListener('input', updateCO2Preview);

  // Add to log
  document.getElementById('btn-add-log').addEventListener('click', addLogEntry);

  renderLogList();
}

function selectActivity(item, cat) {
  // Clear all selections
  document.querySelectorAll('.activity-item').forEach(el => el.classList.remove('selected'));

  // Select clicked
  const el = document.querySelector(`.activity-item[data-id="${item.id}"]`);
  if (el) el.classList.add('selected');

  State.selectedActivity = item;
  document.getElementById('qty-unit').textContent = item.unit;
  document.getElementById('log-qty').value = '';
  updateCO2Preview();
}

function updateCO2Preview() {
  const item = State.selectedActivity;
  const qtyEl = document.getElementById('log-qty');
  const qty = parseFloat(qtyEl.value) || 0;
  const co2ValEl = document.getElementById('co2-val');
  const co2EqEl = document.getElementById('co2-eq');

  if (!item) {
    co2ValEl.textContent = '—';
    co2EqEl.textContent = 'Select an activity and enter quantity';
    return;
  }

  const kg = item.rate * qty;
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

  const qty = parseFloat(document.getElementById('log-qty').value);
  if (!qty || qty <= 0) { showToast('Please enter a valid quantity', 'error'); return; }

  const kg = parseFloat((item.rate * qty).toFixed(2));
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

  document.getElementById('log-qty').value = '';
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
    const isOffset = entry.kg === 0;
    const kgStr = isOffset ? '0 kg' : `+${entry.kg} kg`;
    const co2Class = isOffset ? 'offset' : 'emission';
    el.innerHTML = `
      <span class="log-entry-icon">${entry.icon}</span>
      <div class="log-entry-body">
        <div class="log-entry-name">${entry.name}</div>
        <div class="log-entry-meta">${entry.time} · ${entry.qty} ${entry.unit}</div>
      </div>
      <span class="log-entry-co2 ${co2Class}">${kgStr}</span>`;
    listEl.appendChild(el);
  });
}

/* ══════════════════════════════════════════
   SCREEN 4 — INSIGHTS
   ══════════════════════════════════════════ */
function renderInsights() {
  // Insight cards
  const container = document.getElementById('insight-cards');
  if (container.children.length > 0) {
    // Already rendered — re-render comparison chart (may need animation)
    renderComparisonChart();
    return;
  }

  INSIGHTS_DATA.forEach(ins => {
    const card = document.createElement('div');
    card.className = 'insight-card';

    const impactClass = ins.impact === 'high' ? 'impact-high' : ins.impact === 'medium' ? 'impact-medium' : 'impact-low';

    card.innerHTML = `
      <span class="impact-badge ${impactClass}">${ins.badge}</span>
      <div class="insight-title">${ins.title}</div>
      <div class="insight-desc">${ins.desc}</div>
      <div class="insight-saving">Potential saving: ${ins.saving}</div>
      <button class="btn-insight">${ins.action}</button>`;

    card.querySelector('.btn-insight').addEventListener('click', () => {
      showToast(`Opening action plan for: ${ins.title}`, 'info');
    });

    container.appendChild(card);
  });

  // Clear badge
  document.getElementById('insights-badge').style.display = 'none';

  renderComparisonChart();
}

function renderComparisonChart() {
  const container = document.getElementById('comparison-chart');
  container.innerHTML = '';
  const maxVal = 5;

  COMPARISON_DATA.forEach(item => {
    const row = document.createElement('div');
    row.className = 'hbar-row';
    row.innerHTML = `
      <div class="hbar-label">${item.label}</div>
      <div class="hbar-track">
        <div class="hbar-fill" style="width:0%;background:${item.color}" data-w="${(item.value / maxVal) * 100}"></div>
      </div>
      <div class="hbar-val" style="color:${item.color}">${item.value}t</div>`;
    container.appendChild(row);
  });

  setTimeout(() => {
    container.querySelectorAll('.hbar-fill').forEach(el => {
      el.style.width = el.dataset.w + '%';
    });
  }, 80);
}

/* ══════════════════════════════════════════
   SCREEN 5 — ACTIONS
   ══════════════════════════════════════════ */
function renderActions() {
  const list = document.getElementById('action-list');
  if (list.children.length > 0) return; // already rendered

  ACTIONS_DATA.forEach(action => {
    const card = document.createElement('div');
    card.className = 'action-card';
    card.id = `action-card-${action.id}`;
    if (State.completedActions.has(action.id)) card.classList.add('completed');

    const diffClass = action.difficulty === 'Easy' ? 'tag-easy' : action.difficulty === 'Medium' ? 'tag-medium' : 'tag-hard';
    const isChecked = State.completedActions.has(action.id);

    card.innerHTML = `
      <div class="action-icon-wrap" style="background:${action.color}">${action.icon}</div>
      <div class="action-body">
        <div class="action-name">${action.name}</div>
        <div class="action-desc">${action.desc}</div>
        <div class="action-tags">
          <span class="tag ${diffClass}">${action.difficulty}</span>
          <span class="tag tag-saving">${action.saving}</span>
        </div>
      </div>
      <button class="action-check ${isChecked ? 'checked' : ''}" 
              id="check-${action.id}" 
              aria-label="Mark ${action.name} as completed"
              aria-pressed="${isChecked}">
        ${isChecked ? '✓' : ''}
      </button>`;

    const checkBtn = card.querySelector('.action-check');
    checkBtn.addEventListener('click', () => toggleAction(action, checkBtn, card));

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
  if (lb.children.length > 0) return;

  LEADERBOARD_DATA.forEach(row => {
    const el = document.createElement('div');
    el.className = `lb-row${row.isYou ? ' you-row' : ''}`;
    el.innerHTML = `
      <div class="lb-rank">${row.rank}</div>
      <div class="lb-avatar">${row.initials}</div>
      <div class="lb-name">
        <div>${row.name}</div>
        <div class="lb-city">${row.city}</div>
      </div>
      <div class="lb-footprint">${row.footprint}</div>`;
    lb.appendChild(el);
  });
}

function renderChallenges() {
  const container = document.getElementById('challenge-cards');
  if (container.children.length > 0) {
    // Update progress for joined challenges
    State.joinedChallenges.forEach(id => {
      const fill = container.querySelector(`[data-challenge-fill="${id}"]`);
      const btn  = container.querySelector(`[data-challenge-btn="${id}"]`);
      if (fill && parseFloat(fill.dataset.progress) === 0) {
        fill.style.width = '5%';
      }
      if (btn) { btn.textContent = 'Joined ✓'; btn.classList.add('joined'); }
    });
    return;
  }

  CHALLENGES_DATA.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'challenge-card';

    const progress = State.joinedChallenges.has(ch.id) && ch.progress === 0 ? 5 : ch.progress;

    card.innerHTML = `
      <div class="challenge-header">
        <div>
          <div class="challenge-title">${ch.title}</div>
          <div class="challenge-meta">${ch.participants} participants · ends ${ch.endDate}</div>
        </div>
        ${ch.joinable
          ? `<button class="challenge-join" data-challenge-btn="${ch.id}" id="join-${ch.id}">Join challenge</button>`
          : `<span class="challenge-pct">${ch.progress}% done</span>`
        }
      </div>
      <div class="challenge-bar">
        <div class="challenge-bar-fill" 
             data-challenge-fill="${ch.id}" 
             data-progress="${ch.progress}"
             style="width:0%"></div>
      </div>`;

    container.appendChild(card);

    if (ch.joinable) {
      const btn = card.querySelector(`[data-challenge-btn="${ch.id}"]`);
      if (State.joinedChallenges.has(ch.id)) {
        btn.textContent = 'Joined ✓';
        btn.classList.add('joined');
      }
      btn.addEventListener('click', () => joinChallenge(ch, btn, card));
    }
  });

  // Animate bars
  setTimeout(() => {
    container.querySelectorAll('.challenge-bar-fill').forEach(el => {
      const ch = CHALLENGES_DATA.find(c => c.id === el.dataset.challengeFill);
      const p = State.joinedChallenges.has(el.dataset.challengeFill) && ch?.progress === 0 ? 5 : (ch?.progress ?? 0);
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
   BOOTSTRAP
   ══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  State.load();
  initNav();
  initOnboarding();

  // If baseline already set, default to dashboard
  const startScreen = State.baseline !== null ? 'dashboard' : 'onboarding';
  navigateTo(startScreen);
});
