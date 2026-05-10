export const TITLE_PROMPT = (product: any) => `
You are a conversion-focused eCommerce title engine.

Create a HIGH-CONVERTING product title.

Rules:
- Add emotional + power words
- Keep SEO strong
- Avoid repetition
- Max 120 characters

Product:
Title: ${product.title}
Category: ${product.category}
Price: ${product.price}

Output ONLY the final title.
`;
