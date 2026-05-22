export function deduplicate(items: any[]) {
  const map = new Map();

  for (const item of items) {
    const key = item.keyword.toLowerCase().trim();

    if (!map.has(key)) {
      map.set(key, item);
    } else {
      // merge score if duplicate found
      const existing = map.get(key);
      existing.score = Math.max(existing.score, item.score || 0);
      existing.volume += item.volume || 0;
    }
  }

  return Array.from(map.values());
}
