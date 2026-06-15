import {
  decisionEngine,
} from "./decision.engine";

function runTest() {
  console.log(
    "🚀 DECISION ENGINE TEST START"
  );

  const samples = [
    {
      marketFitScore: 90,
      trendScore: 80,
      competitionScore: 30,
      profitScore: 85,
      winningProbability: 88,
    },
    {
      marketFitScore: 70,
      trendScore: 60,
      competitionScore: 65,
      profitScore: 55,
      winningProbability: 60,
    },
    {
      marketFitScore: 40,
      trendScore: 30,
      competitionScore: 85,
      profitScore: 20,
      winningProbability: 35,
    },
  ];

  for (const input of samples) {
    const result =
      decisionEngine.decide(input);

    console.log(
      "----------------------"
    );

    console.log(
      JSON.stringify(
        {
          input,
          result,
        },
        null,
        2
      )
    );
  }

  console.log(
    "🏁 TEST COMPLETE"
  );
}

runTest();
