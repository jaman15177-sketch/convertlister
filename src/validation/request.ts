export function validateRequired(fields: string[], body: any) {
  for (const f of fields) {
    if (!body[f]) throw new Error(`Missing field: ${f}`);
  }
}
