type EventMap = {
  "log.created": { message: string };
  "alert.created": { id: string };
  "alert.updated": { id: string };
};

type EventKey = keyof EventMap;

class EventBus {
  private listeners: {
    [K in EventKey]?: ((payload: EventMap[K]) => void)[];
  } = {};

  on<K extends EventKey>(event: K, cb: (payload: EventMap[K]) => void) {
    this.listeners[event] ??= [];
    this.listeners[event]!.push(cb);
  }

  emit<K extends EventKey>(event: K, payload: EventMap[K]) {
    this.listeners[event]?.forEach(cb => cb(payload));
  }
}

export const eventBus = new EventBus();
