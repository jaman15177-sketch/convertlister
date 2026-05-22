export type SaturationSignals = {

  // marketplace competition

  activeSellers: number;

  // ad competition intensity

  activeAds: number;

  // total orders across ecosystem

  totalOrders: number;

  // average engagement quality

  engagementRate: number;

  // review inflation

  totalReviews: number;

  // trend overcrowding

  trendVelocity: number;

  // pricing pressure

  averageMarginPercent: number;

  // search competition

  keywordDifficulty: number;

  // platform duplication pressure

  duplicateListings: number;
};

export type SaturationClassification =
  | "UNTOUCHED"
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "EXTREME";

export type SaturationResult = {

  saturationScore: number;

  opportunityScore: number;

  classification:
    SaturationClassification;

  breakdown: {

    sellerPressure: number;

    adPressure: number;

    engagementDilution: number;

    reviewInflation: number;

    trendCrowding: number;

    marginCompression: number;

    keywordCompetition: number;

    duplicationPressure: number;
  };

  metadata: {

    evaluatedAt: string;

    engineVersion: string;
  };
};

// ----------------------------------------------------
// HELPERS
// ----------------------------------------------------

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

// logarithmic pressure scaling

function logScale(
  value: number
): number {

  return (
    Math.log10(value + 1) * 25
  );
}

// ----------------------------------------------------
// MAIN ENGINE
// ----------------------------------------------------

export function detectSaturation(
  signals: SaturationSignals
): SaturationResult {

  // ----------------------------------------
  // SELLER PRESSURE
  // ----------------------------------------

  const sellerPressure =

    normalize(
      logScale(
        signals.activeSellers
      ),
      100
    );

  // ----------------------------------------
  // AD PRESSURE
  // ----------------------------------------

  const adPressure =

    normalize(
      logScale(
        signals.activeAds
      ),
      100
    );

  // ----------------------------------------
  // ENGAGEMENT DILUTION
  // lower engagement = higher saturation
  // ----------------------------------------

  const engagementDilution =

    100 -

    normalize(
      signals.engagementRate,
      20
    );

  // ----------------------------------------
  // REVIEW INFLATION
  // ----------------------------------------

  const reviewInflation =

    normalize(
      logScale(
        signals.totalReviews
      ),
      100
    );

  // ----------------------------------------
  // TREND CROWDING
  // ----------------------------------------

  const trendCrowding =

    normalize(
      signals.trendVelocity,
      100
    );

  // ----------------------------------------
  // MARGIN COMPRESSION
  // lower margin = higher saturation
  // ----------------------------------------

  const marginCompression =

    100 -

    normalize(
      signals.averageMarginPercent,
      80
    );

  // ----------------------------------------
  // KEYWORD COMPETITION
  // ----------------------------------------

  const keywordCompetition =

    normalize(
      signals.keywordDifficulty,
      100
    );

  // ----------------------------------------
  // DUPLICATE LISTINGS
  // ----------------------------------------

  const duplicationPressure =

    normalize(
      logScale(
        signals.duplicateListings
      ),
      100
    );

  // ----------------------------------------
  // FINAL SATURATION SCORE
  // ----------------------------------------

  let saturationScore =

    (sellerPressure * 0.18) +

    (adPressure * 0.18) +

    (engagementDilution * 0.12) +

    (reviewInflation * 0.10) +

    (trendCrowding * 0.15) +

    (marginCompression * 0.12) +

    (keywordCompetition * 0.10) +

    (duplicationPressure * 0.05);

  saturationScore =

    clamp(
      saturationScore,
      0,
      100
    );

  // ----------------------------------------
  // OPPORTUNITY SCORE
  // inverse saturation
  // ----------------------------------------

  const opportunityScore =

    100 - saturationScore;

  // ----------------------------------------
  // CLASSIFICATION
  // ----------------------------------------

  let classification:
    SaturationClassification;

  if (saturationScore >= 85) {

    classification = "EXTREME";
  }

  else if (saturationScore >= 65) {

    classification = "HIGH";
  }

  else if (saturationScore >= 45) {

    classification = "MODERATE";
  }

  else if (saturationScore >= 25) {

    classification = "LOW";
  }

  else {

    classification = "UNTOUCHED";
  }

  // ----------------------------------------
  // RETURN
  // ----------------------------------------

  return {

    saturationScore:
      Number(
        saturationScore.toFixed(2)
      ),

    opportunityScore:
      Number(
        opportunityScore.toFixed(2)
      ),

    classification,

    breakdown: {

      sellerPressure:
        Number(
          sellerPressure.toFixed(2)
        ),

      adPressure:
        Number(
          adPressure.toFixed(2)
        ),

      engagementDilution:
        Number(
          engagementDilution.toFixed(2)
        ),

      reviewInflation:
        Number(
          reviewInflation.toFixed(2)
        ),

      trendCrowding:
        Number(
          trendCrowding.toFixed(2)
        ),

      marginCompression:
        Number(
          marginCompression.toFixed(2)
        ),

      keywordCompetition:
        Number(
          keywordCompetition.toFixed(2)
        ),

      duplicationPressure:
        Number(
          duplicationPressure.toFixed(2)
        ),
    },

    metadata: {

      evaluatedAt:
        new Date().toISOString(),

      engineVersion:
        "v3-production",
    },
  };
}
