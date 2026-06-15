type Listener = (log: any) => Promise<void>;

class LogEventBus {
  private listeners: Listener[] = [];

  on(fn: Listener) {
    this.listeners.push(fn);
  }

  async emit(log: any) {
    await Promise.all(this.listeners.map((fn) => fn(log)));
  }
}

export const logEventBus = new LogEventBus();
