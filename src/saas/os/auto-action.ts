export function autoAction(decision: string) {
  switch (decision) {
    case "UPGRADE":
      return "Send upgrade offer";

    case "LIMIT":
      return "Throttle usage";

    case "BLOCK":
      return "Disable account";

    default:
      return "No action";
  }
}
