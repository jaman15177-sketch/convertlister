export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({
    score: 92,
    grade: "premium",
    prediction: "high_conversion",
    input: body
  });
}
