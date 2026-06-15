export function assertServerOnly() {
  if (typeof window !== "undefined") {
    throw new Error(
      "❌ SECURITY ERROR: Server-only key accessed in browser"
    );
  }
}
