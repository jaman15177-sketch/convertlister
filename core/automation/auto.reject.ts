import { AutomationInput } from "./automation.types";

export function shouldReject(input: AutomationInput): boolean {

  return input.score < 50;
}
