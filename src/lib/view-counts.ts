/**
 * Build-time snapshot of every post's view count, pulled from production.
 *
 * The post pages are static, so without this a visitor's first paint has an
 * empty views slot until the client fetch lands. Inlining the last known count
 * means the number is there immediately and the fetch only corrects it.
 *
 * Fetched once per build (module-level promise). If production is unreachable
 * the snapshot is empty and the block falls back to appearing after the fetch.
 * A build must never fail over a view counter.
 */
// Overridable via VIEWS_SNAPSHOT_URL in .env / .env.local (a shell variable
// does not reach here: prerendering runs in workerd, where process.env is a
// stub, so the value has to come through Vite's import.meta.env).
const SNAPSHOT_URL: string =
  import.meta.env.VIEWS_SNAPSHOT_URL ?? "https://reallyniceday.com/api/views";
const TIMEOUT_MS = 5000;

let snapshot: Promise<Record<string, number>> | null = null;

async function load(): Promise<Record<string, number>> {
  try {
    const res = await fetch(SNAPSHOT_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Record<string, number>;
    console.log(`[views] snapshot: ${Object.keys(data).length} posts from ${SNAPSHOT_URL}`);
    return data;
  } catch (err) {
    console.warn(`[views] snapshot unavailable (${(err as Error).message}): pages ship without a seed count`);
    return {};
  }
}

export function getViewCounts(): Promise<Record<string, number>> {
  snapshot ??= load();
  return snapshot;
}
