import {
  winningProbabilityEngine,
} from "./winning-probability.engine";

const result =
  winningProbabilityEngine.calculate({
    marketFitScore: 92,
    trendScore: 88,
    profitScore: 85,
    competitionScore: 72,
    supplierScore: 90,
  });

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
