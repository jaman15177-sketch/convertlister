export type GatewayContext = {
  requestId: string;
  user: {
    id: string;
  };
  org: {
    id: string;
    plan: "free" | "pro" | "enterprise";
    credits: number;
  };
};

export type GatewayResult<T = any> =
  | { ok: true; data: T; ctx: GatewayContext }
  | Response;
