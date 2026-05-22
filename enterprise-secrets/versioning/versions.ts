const versions = new Map<string, number>();

export function nextVersion(name: string) {
  const current = versions.get(name) || 0;

  const next = current + 1;

  versions.set(name, next);

  return next;
}
