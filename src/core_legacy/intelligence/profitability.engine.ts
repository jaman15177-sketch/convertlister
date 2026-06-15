export interface ProfitabilityInput {
  sellingPrice: number;
  productCost: number;

  shippingCost?: number;
  transactionFee?: number;
  adCost?: number;
  packagingCost?: number;
  refundReserve?: number;
}

export interface ProfitabilityResult {
  revenue: number;

  totalCost: number;

  grossProfit: number;

  grossMargin: number;

  netProfit: number;

  netMargin: number;

  profitScore: number;

  verdict:
    | "EXCELLENT"
    | "GOOD"
    | "AVERAGE"
    | "POOR"
    | "LOSS";

  breakdown: {
    productCost: number;
    shippingCost: number;
    transactionFee: number;
    adCost: number;
    packagingCost: number;
    refundReserve: number;
  };
}

export class ProfitabilityEngine {
  calculate(
    input: ProfitabilityInput
  ): ProfitabilityResult {
    const revenue =
      input.sellingPrice;

    const productCost =
      input.productCost;

    const shippingCost =
      input.shippingCost ?? 0;

    const transactionFee =
      input.transactionFee ??
      revenue * 0.03;

    const adCost =
      input.adCost ?? 0;

    const packagingCost =
      input.packagingCost ?? 0;

    const refundReserve =
      input.refundReserve ??
      revenue * 0.02;

    const totalCost =
      productCost +
      shippingCost +
      transactionFee +
      adCost +
      packagingCost +
      refundReserve;

    const grossProfit =
      revenue - productCost;

    const grossMargin =
      revenue > 0
        ? Math.round(
            (grossProfit /
              revenue) *
              100
          )
        : 0;

    const netProfit =
      revenue - totalCost;

    const netMargin =
      revenue > 0
        ? Math.round(
            (netProfit /
              revenue) *
              100
          )
        : 0;

    const profitScore =
      this.calculateProfitScore(
        netMargin
      );

    const verdict =
      this.getVerdict(
        netMargin
      );

    return {
      revenue,

      totalCost,

      grossProfit,

      grossMargin,

      netProfit,

      netMargin,

      profitScore,

      verdict,

      breakdown: {
        productCost,
        shippingCost,
        transactionFee,
        adCost,
        packagingCost,
        refundReserve,
      },
    };
  }

  private calculateProfitScore(
    margin: number
  ): number {
    if (margin <= 0) return 0;
    if (margin >= 50) return 100;

    return Math.round(
      (margin / 50) * 100
    );
  }

  private getVerdict(
    margin: number
  ):
    | "EXCELLENT"
    | "GOOD"
    | "AVERAGE"
    | "POOR"
    | "LOSS" {
    if (margin >= 40)
      return "EXCELLENT";

    if (margin >= 25)
      return "GOOD";

    if (margin >= 15)
      return "AVERAGE";

    if (margin > 0)
      return "POOR";

    return "LOSS";
  }
}

export const profitabilityEngine =
  new ProfitabilityEngine();
