const {
  calculateAnnualBaseline,
  calculateEmission,
  validateQuantity,
  validateStateSchema,
  State
} = require('./app');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    })
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

describe('EcoTrace Calculation Logic', () => {
  test('calculateAnnualBaseline should sum answers correctly', () => {
    const answers = { q1: 2.4, q2: 1.5, q3: 1.7, q4: 0.5 };
    expect(calculateAnnualBaseline(answers)).toBe(6.1);
  });

  test('calculateAnnualBaseline should handle missing fields', () => {
    const answers = { q1: 2.4 };
    expect(calculateAnnualBaseline(answers)).toBe(2.4);
  });

  test('calculateEmission should compute correct emissions', () => {
    // Petrol car is 0.21 kg/km. 50km travel:
    expect(calculateEmission(0.21, 50)).toBe(10.50);
  });

  test('calculateEmission should round to 2 decimal places', () => {
    // Bus rate is 0.089. 12.7km travel -> 1.1303 -> 1.13
    expect(calculateEmission(0.089, 12.7)).toBe(1.13);
  });
});

describe('EcoTrace Input Validation', () => {
  test('validateQuantity should accept positive numbers', () => {
    expect(validateQuantity(10)).toBe(true);
    expect(validateQuantity(0.5)).toBe(true);
    expect(validateQuantity("50")).toBe(true);
  });

  test('validateQuantity should reject zero and negative numbers', () => {
    expect(validateQuantity(0)).toBe(false);
    expect(validateQuantity(-5)).toBe(false);
    expect(validateQuantity("text")).toBe(false);
  });

  test('validateQuantity should reject overflow values', () => {
    expect(validateQuantity(1000001)).toBe(false);
  });
});

describe('EcoTrace State Manager & LocalStorage Schema Validation', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('validateStateSchema should filter out corrupt values', () => {
    const raw = {
      baseline: "corrupt_data",
      quizAnswers: { q1: 2.4, bad_q: 5.5 },
      logEntries: [
        { id: 111, name: "Walk", qty: "invalid", kg: 0 }
      ]
    };
    const validated = validateStateSchema(raw);
    expect(validated.baseline).toBeNull();
    expect(validated.quizAnswers.bad_q).toBeUndefined();
    expect(validated.logEntries[0].qty).toBe(0);
  });

  test('State.load should parse valid values and save safely', () => {
    localStorage.setItem('eco_baseline', '4.5');
    localStorage.setItem('eco_quiz_answers', JSON.stringify({ q1: 2.4, q2: 1.5 }));
    
    State.load();
    expect(State.baseline).toBe(4.5);
    expect(State.quizAnswers).toEqual({ q1: 2.4, q2: 1.5 });
  });
});
