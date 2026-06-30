export const ASSESSMENT_STORAGE_KEY = "f360-ai-readiness-assessment-v2";
export const LEAD_STORAGE_KEY = "f360-ai-readiness-lead";

const SESSION_KEYS = [ASSESSMENT_STORAGE_KEY, LEAD_STORAGE_KEY] as const;

let sessionPrepared = false;

function removeLegacyLocalStorage(): void {
  for (const key of SESSION_KEYS) {
    localStorage.removeItem(key);
  }
}

function wasPageReloaded(): boolean {
  if (typeof performance === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0];
  return nav instanceof PerformanceNavigationTiming && nav.type === "reload";
}

/** Clears session data on refresh and removes any legacy localStorage entries. */
export function prepareAiReadinessSession(): void {
  if (typeof window === "undefined" || sessionPrepared) return;
  sessionPrepared = true;

  removeLegacyLocalStorage();

  if (wasPageReloaded()) {
    clearAiReadinessSession();
  }
}

export function readSessionItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  prepareAiReadinessSession();
  return sessionStorage.getItem(key);
}

export function writeSessionItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  prepareAiReadinessSession();
  sessionStorage.setItem(key, value);
}

export function removeSessionItem(key: string): void {
  if (typeof window === "undefined") return;
  prepareAiReadinessSession();
  sessionStorage.removeItem(key);
}

export function clearAiReadinessSession(): void {
  if (typeof window === "undefined") return;

  const extraKeys: string[] = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key?.startsWith("f360-ai-readiness-persist:")) {
      extraKeys.push(key);
    }
  }

  for (const key of [...SESSION_KEYS, ...extraKeys]) {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  }
}
