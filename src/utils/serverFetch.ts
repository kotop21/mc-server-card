import type { ServerData, FetchResult } from "@typings/serverData"


export async function serverFetch(host: string): Promise<FetchResult> {
  try {
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}`);
    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }

    const data: ServerData = await response.json();
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown fetch error";
    return { success: false, error: message };
  }
}
