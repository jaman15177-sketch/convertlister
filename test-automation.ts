import { runAutomation } from "./core/automation/automation.engine";

const result = runAutomation({
  score: 62,
  grade: "medium"
});

console.log(result);
