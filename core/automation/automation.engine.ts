import { AutomationInput, AutomationDecision } from "./automation.types";

import { shouldReject } from "./auto.reject";
import { shouldRetry } from "./auto.retry";
import { shouldEnhance } from "./ai.enhancement";
import { predictConversion } from "./conversion.predictor";

export function runAutomation(
  input: AutomationInput
): AutomationDecision {

  return {
    reject: shouldReject(input),
    retry: shouldRetry(input),
    enhance: shouldEnhance(input),
    prediction: predictConversion(input)
  };
}
