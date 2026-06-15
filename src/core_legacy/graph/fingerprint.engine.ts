export class FingerprintEngine {
  normalize(text: string): string {
    return (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .trim();
  }

  similarity(a: string, b: string): number {
    const x = this.normalize(a);
    const y = this.normalize(b);

    let match = 0;
    const len = Math.min(x.length, y.length);

    for (let i = 0; i < len; i++) {
      if (x[i] === y[i]) match++;
    }

    return match / Math.max(x.length, y.length || 1);
  }
}

export const fingerprintEngine = new FingerprintEngine();
