/** Below this the number is noise and reads as "nobody came here", so it hides. */
export const MIN_VIEWS = 100;

export function formatViews(n: number): string {
  if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${+(n / 1_000).toFixed(1)}K`;
  return String(n);
}
