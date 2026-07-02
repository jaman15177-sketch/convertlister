type Log = {
  level?: string;
  message?: string;
  timestamp?: number;
  [key: string]: any;
};

type Listener = (log: Log) => Promise<void>;

class LogEventBus {
  private listeners: Listener[] = [];

  on(fn: Listener) {
    this.listeners.push(fn);
  }

  async emit(log: Log) {
    await Promise.all(this.listeners.map((fn) => fn(log)));
  }
}

export const logEventBus = new LogEventBus();
