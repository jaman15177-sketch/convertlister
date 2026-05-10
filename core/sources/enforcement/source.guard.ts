import { SourceEnforcer } from "./source.enforcer";

const enforcer = new SourceEnforcer();

export class SourceGuard {

  protect(output: any) {
    try {
      return enforcer.enforce(output);
    } catch (err: any) {

      // 🔥 HARD STOP (NO FALLBACK)
      console.error("SOURCE ENFORCEMENT FAILED:", err.message);

      throw new Error("Pipeline blocked due to invalid source contract");
    }
  }
}
