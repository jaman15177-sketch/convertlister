import {
  competitionDetector,
} from "./competition.detector";

const result =
  competitionDetector.detect({
    competitorCount: 250,
    averageRating: 4.7,
    averageReviewCount: 3500,
    topSellerDominance: 80,
    adDensity: 70,
  });

console.log(
  JSON.stringify(
    result,
    null,
    2
  )
);
