import { PipelineState } from "./pipeline.types";

export class StateManager {

  private states: PipelineState[] = [];

  add(state: PipelineState) {
    this.states.push(state);
  }

  getAll() {
    return this.states;
  }

  latest() {
    return this.states[this.states.length - 1];
  }
}
