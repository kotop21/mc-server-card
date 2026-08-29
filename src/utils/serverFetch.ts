import type { ServerData, FetchResult } from "@typings/serverData"

const timeoutMs: number = 5000

export async function serverFetch(host: string): Promise<FetchResult> {
  try {
    const response = await fetch(
      `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}`,
      { signal: AbortSignal.timeout(timeoutMs), });

    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data: ServerData = await response.json();
    return { success: true, data };
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return { success: false, error: `Request timed out after ${timeoutMs}ms` };
    }

    const message = err instanceof Error ? err.message : "Unknown fetch error";
    return { success: false, error: message };
  }
}
