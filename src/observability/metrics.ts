type Counter = { value: number };

class Metrics {
  private store: Record<string, Counter> = {};

  inc(key: string, value = 1) {
    if (!this.store[key]) this.store[key] = { value: 0 };
    this.store[key].value += value;
  }

  get(key: string) {
    return this.store[key]?.value || 0;
  }

  all() {
    return this.store;
  }
}

export const metrics = new Metrics();
