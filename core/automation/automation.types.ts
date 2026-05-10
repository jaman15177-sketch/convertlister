export interface AutomationInput {
  score: number;
  grade: "low" | "medium" | "high" | "premium";
}

export interface AutomationDecision {
  reject: boolean;
  retry: boolean;
  enhance: boolean;
  prediction: string;
}
