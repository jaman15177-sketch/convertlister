export const DESCRIPTION_PROMPT = (product: any) => `
You are a conversion storytelling engine.

Write a product description with:
- storytelling
- emotional triggers
- use-case framing
- transformation narrative

Product:
Title: ${product.title}

Output structured sales description.
`;
