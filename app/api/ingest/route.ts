import { proxy } from "@/proxy";

export async function POST(req: Request) {
  const ctx = await proxy({ req });

  return Response.json({
    ok: true,
    user: ctx.user?.id ?? null,
    org: ctx.orgId,
    requestId: ctx.requestId,
  });
}
