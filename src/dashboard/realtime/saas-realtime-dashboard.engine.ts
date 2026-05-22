// saas-realtime-dashboard.engine.ts
// PRODUCTION FINAL — Realtime SaaS Control Tower Dashboard Engine

/**
 * =========================================
 * TYPES
 * =========================================
 */

type EngineHealth = {
  name: string;
  score: number; // 0–100
};

type DashboardState = {
  timestamp: number;
  overallScore: number;
  status: "GREEN" | "YELLOW" | "ORANGE" | "RED";
  engines: EngineHealth[];
};

type Subscriber = (state: DashboardState) => void;

/**
 * =========================================
 * COLOR ENGINE
 * =========================================
 */

class ColorEngine {
  static get(score: number) {
    if (score >= 80) return "GREEN";
    if (score >= 60) return "YELLOW";
    if (score >= 40) return "ORANGE";
    return "RED";
  }
}

/**
 * =========================================
 * SCORE ENGINE
 * =========================================
 */

class ScoreEngine {
  calculate(engines: EngineHealth[]): number {
    if (!engines.length) return 0;

    const sum = engines.reduce((acc, e) => acc + e.score, 0);
    return Math.round(sum / engines.length);
  }
}

/**
 * =========================================
 * STATE ENGINE (REALTIME CORE)
 * =========================================
 */

class StateEngine {
  private state: DashboardState | null = null;
  private subscribers: Subscriber[] = [];

  subscribe(fn: Subscriber) {
    this.subscribers.push(fn);
  }

  private notify() {
    if (!this.state) return;
    for (const sub of this.subscribers) {
      sub(this.state);
    }
  }

  update(state: DashboardState) {
    this.state = state;
    this.notify();
  }

  getState() {
    return this.state;
  }
}

/**
 * =========================================
 * ENGINE REGISTRY (SaaS CORE SYSTEMS)
 * =========================================
 */

class EngineRegistry {
  private engines: EngineHealth[] = [
    { name: "Ads Engine", score: 78 },
    { name: "Pricing Engine", score: 85 },
    { name: "Trend Engine", score: 62 },
    { name: "Conversion Engine", score: 70 },
    { name: "API System", score: 90 },
  ];

  getEngines() {
    return this.engines;
  }

  updateEngine(name: string, score: number) {
    const engine = this.engines.find((e) => e.name === name);
    if (engine) engine.score = score;
  }
}

/**
 * =========================================
 * REALTIME DASHBOARD ENGINE
 * =========================================
 */

export class RealtimeSaaSDashboardEngine {
  private stateEngine = new StateEngine();
  private registry = new EngineRegistry();
  private scoreEngine = new ScoreEngine();

  /**
   * Start realtime loop (simulated or connected to backend)
   */
  start(intervalMs = 3000) {
    setInterval(() => {
      const engines = this.registry.getEngines();

      const overallScore = this.scoreEngine.calculate(engines);
      const status = ColorEngine.get(overallScore);

      const state: DashboardState = {
        timestamp: Date.now(),
        overallScore,
        status,
        engines,
      };

      this.stateEngine.update(state);
    }, intervalMs);
  }

  /**
   * Subscribe to live updates (UI / frontend hook)
   */
  subscribe(fn: Subscriber) {
    this.stateEngine.subscribe(fn);
  }

  /**
   * External update (API / backend injection)
   */
  updateEngine(name: string, score: number) {
    this.registry.updateEngine(name, score);
  }

  /**
   * Get current snapshot
   */
  getSnapshot() {
    return this.stateEngine.getState();
  }
}

/**
 * =========================================
 * EXAMPLE USAGE
 * =========================================
 */

const dashboard = new RealtimeSaaSDashboardEngine();

/**
 * UI / frontend simulation listener
 */
dashboard.subscribe((state) => {
  console.log("📊 LIVE DASHBOARD UPDATE");
  console.log("Status:", state.status);
  console.log("Score:", state.overallScore);
  console.table(state.engines);
});

/**
 * Start realtime engine
 */
dashboard.start(2000);

/**
 * Simulated live system change
 */
setTimeout(() => {
  dashboard.updateEngine("Trend Engine", 30);
}, 5000);

setTimeout(() => {
  dashboard.updateEngine("Ads Engine", 92);
}, 8000);
