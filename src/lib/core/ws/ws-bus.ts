import { EventEmitter } from "events";

class WSBus extends EventEmitter {
  emitEvent(event: string, payload: any) {
    this.emit(event, payload);
  }

  onEvent(event: string, handler: (payload: any) => void) {
    this.on(event, handler);
  }
}

export const eventBus = new WSBus();
