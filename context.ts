export async function createGatewayContext(req: Request, requestId: string) {
  return {
    req,
    requestId,
    ip: req.headers.get("x-forwarded-for") || "unknown",
    user: null as any,
    orgId: null as any,
    meta: {},
  };
}
