import { AutomationInput } from "./automation.types";

export function shouldRetry(input: AutomationInput): boolean {

  return input.score >= 50 && input.score < 70;
}
