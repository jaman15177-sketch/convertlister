import { AutomationInput } from "./automation.types";

export function predictConversion(input: AutomationInput): string {

  if (input.grade === "premium") {
    return "high_conversion";
  }

  if (input.grade === "high") {
    return "good_conversion";
  }

  if (input.grade === "medium") {
    return "average_conversion";
  }

  return "low_conversion";
}
