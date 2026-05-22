export type CompetitorSignals = {

  // market density

  activeCompetitors: number;

  // ad ecosystem

  activeAds: number;

  averageAdSpend: number;

  // store maturity

  averageStoreAgeDays: number;

  // operational strength

  averageFulfillmentScore: number;

  // social dominance

  socialFollowers: number;

  socialEngagementRate: number;

  // listing pressure

  duplicateListings: number;

  // customer trust moat

  averageReviewRating: number;

  averageReviewCount: number;

  // pricing war intensity

  averageMarginPercent: number;

  // velocity pressure

  competitorGrowthRate: number;
};

export type CompetitorClassification =
  | "WEAK"
  | "MODERATE"
  | "STRONG"
  | "DOMINANT"
  | "UNBEATABLE";

export type CompetitorAnalysisResult = {

  competitorStrengthScore: number;

  marketDifficultyScore: number;

  survivabilityScore: number;

  classification:
    CompetitorClassification;

  breakdown: {

    competitorDensity: number;

    adCompetition: number;

    operationalStrength: number;

    socialDominance: number;

    listingPressure: number;

    trustMoat: number;

    marginCompression: number;

    scalingPressure: number;
  };

  metadata: {

    evaluatedAt: string;

    engineVersion: string;
  };
};

// -----------------------------------------------------
// HELPERS
// -----------------------------------------------------

function clamp(
  value: number,
  min: number,
  max: number
): number {

  return Math.max(
    min,
    Math.min(max, value)
  );
}

function normalize(
  value: number,
  max: number
): number {

  return clamp(
    (value / max) * 100,
    0,
    100
  );
}

function logScale(
  value: number
): number {

  return (
    Math.log10(value + 1) * 25
  );
}

// -----------------------------------------------------
// MAIN ENGINE
// -----------------------------------------------------

export function analyzeCompetitors(
  signals: CompetitorSignals
): CompetitorAnalysisResult {

  // ------------------------------------------
  // COMPETITOR DENSITY
  // ------------------------------------------

  const competitorDensity =

    normalize(
      logScale(
        signals.activeCompetitors
      ),
      100
    );

  // ------------------------------------------
  // AD COMPETITION
  // ------------------------------------------

  const adCompetition =

    normalize(

      (signals.activeAds * 0.60) +

      (signals.averageAdSpend * 0.40),

      100000
    );

  // ------------------------------------------
  // OPERATIONAL STRENGTH
  // ------------------------------------------

  const operationalStrength =

    normalize(

      (signals.averageStoreAgeDays * 0.40) +

      (signals.averageFulfillmentScore * 0.60),

      1000
    );

  // ------------------------------------------
  // SOCIAL DOMINANCE
  // ------------------------------------------

  const socialDominance =

    normalize(

      (signals.socialFollowers * 0.70) +

      (signals.socialEngagementRate * 0.30),

      1000000
    );

  // ------------------------------------------
  // LISTING PRESSURE
  // ------------------------------------------

  const listingPressure =

    normalize(
      logScale(
        signals.duplicateListings
      ),
      100
    );

  // ------------------------------------------
  // TRUST MOAT
  // ------------------------------------------

  const trustMoat =

    normalize(

      (signals.averageReviewRating * 0.40) +

      (signals.averageReviewCount * 0.60),

      50000
    );

  // ------------------------------------------
  // MARGIN COMPRESSION
  // lower margin = stronger competition
  // ------------------------------------------

  const marginCompression =

    100 -

    normalize(
      signals.averageMarginPercent,
      80
    );

  // ------------------------------------------
  // SCALING PRESSURE
  // ------------------------------------------

  const scalingPressure =

    normalize(
      signals.competitorGrowthRate,
      300
    );

  // ------------------------------------------
  // FINAL COMPETITOR SCORE
  // ------------------------------------------

  let competitorStrengthScore =

    (competitorDensity * 0.15) +

    (adCompetition * 0.15) +

    (operationalStrength * 0.15) +

    (socialDominance * 0.10) +

    (listingPressure * 0.10) +

    (trustMoat * 0.10) +

    (marginCompression * 0.10) +

    (scalingPressure * 0.15);

  competitorStrengthScore =

    clamp(
      competitorStrengthScore,
      0,
      100
    );

  // ------------------------------------------
  // MARKET DIFFICULTY
  // ------------------------------------------

  const marketDifficultyScore =

    clamp(

      competitorStrengthScore * 1.10,

      0,

      100
    );

  // ------------------------------------------
  // SURVIVABILITY
  // inverse difficulty
  // ------------------------------------------

  const survivabilityScore =

    100 -

    marketDifficultyScore;

  // ------------------------------------------
  // CLASSIFICATION
  // ------------------------------------------

  let classification:
    CompetitorClassification;

  if (
    competitorStrengthScore >= 85
  ) {

    classification = "UNBEATABLE";
  }

  else if (
    competitorStrengthScore >= 70
  ) {

    classification = "DOMINANT";
  }

  else if (
    competitorStrengthScore >= 50
  ) {

    classification = "STRONG";
  }

  else if (
    competitorStrengthScore >= 30
  ) {

    classification = "MODERATE";
  }

  else {

    classification = "WEAK";
  }

  // ------------------------------------------
  // RETURN
  // ------------------------------------------

  return {

    competitorStrengthScore:
      Number(
        competitorStrengthScore.toFixed(2)
      ),

    marketDifficultyScore:
      Number(
        marketDifficultyScore.toFixed(2)
      ),

    survivabilityScore:
      Number(
        survivabilityScore.toFixed(2)
      ),

    classification,

    breakdown: {

      competitorDensity:
        Number(
          competitorDensity.toFixed(2)
        ),

      adCompetition:
        Number(
          adCompetition.toFixed(2)
        ),

      operationalStrength:
        Number(
          operationalStrength.toFixed(2)
        ),

      socialDominance:
        Number(
          socialDominance.toFixed(2)
        ),

      listingPressure:
        Number(
          listingPressure.toFixed(2)
        ),

      trustMoat:
        Number(
          trustMoat.toFixed(2)
        ),

      marginCompression:
        Number(
          marginCompression.toFixed(2)
        ),

      scalingPressure:
        Number(
          scalingPressure.toFixed(2)
        ),
    },

    metadata: {

      evaluatedAt:
        new Date().toISOString(),

      engineVersion:
        "v4-production",
    },
  };
}
