export const BULLET_PROMPT = (product: any) => `
You are a conversion copywriter.

Generate 5 high-converting bullet points.

Rules:
- Solve pain points
- Reduce objections
- Increase perceived value
- No generic statements

Product:
Title: ${product.title}

Output ONLY bullet points as array.
`;
