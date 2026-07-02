export function detectFraud(events: any[]) {
  const alerts = [];

  // RULE 1: rapid listing spam
  const rapidActions = events.length > 20;

  if (rapidActions) {
    alerts.push({
      type: "SPAM",
      severity: "HIGH",
      message: "Too many actions detected",
    });
  }

  // RULE 2: negative credit attempt
  const negative = events.some((e) => e.type === "overdraft");

  if (negative) {
    alerts.push({
      type: "FRAUD",
      severity: "CRITICAL",
      message: "Negative credit attempt detected",
    });
  }

  return alerts;
}
