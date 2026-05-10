export const SEO_PROMPT = (product: any) => `
You are an SEO keyword intelligence engine.

Generate:
- primary keywords
- secondary keywords
- long-tail keywords

Product:
Title: ${product.title}
Category: ${product.category}

Output structured JSON only.
`;
