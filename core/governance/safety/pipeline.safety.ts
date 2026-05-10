import { PipelineGuard } from "../guards/pipeline.guard";
import { ContractEnforcer } from "../enforcement/contract.enforcer";

export class PipelineSafety {

  private guard = new PipelineGuard();
  private contract = new ContractEnforcer();

  protect(product: any) {

    this.guard.allow(product);

    this.contract.enforce(product);

    return {
      safe: true,
      product
    };
  }
}
