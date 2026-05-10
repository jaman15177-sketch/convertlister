import { AutomationInput } from "./automation.types";

export function shouldEnhance(input: AutomationInput): boolean {

  return input.grade === "medium";
}
