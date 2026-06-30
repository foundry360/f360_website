import { readSessionItem, removeSessionItem, writeSessionItem } from "./session-storage";

const inflight = new Map<string, Promise<string | undefined>>();
const PERSIST_PREFIX = "f360-ai-readiness-persist:";

function persistMarkerKey(submissionKey: string): string {
  return `${PERSIST_PREFIX}${submissionKey}`;
}

export function buildSubmissionKey(submittedAt: string, email: string): string {
  return `${submittedAt}:${email.toLowerCase().trim()}`;
}

export function getPersistedResultId(submissionKey: string): string | null {
  const value = readSessionItem(persistMarkerKey(submissionKey));
  if (!value || value === "pending") return null;
  return value;
}

/** Returns false if this submission is already persisting or persisted. */
export function markPersistPending(submissionKey: string): boolean {
  const key = persistMarkerKey(submissionKey);
  if (readSessionItem(key)) return false;
  writeSessionItem(key, "pending");
  return true;
}

export function markPersistComplete(submissionKey: string, resultId: string): void {
  writeSessionItem(persistMarkerKey(submissionKey), resultId);
}

export function clearPersistPending(submissionKey: string): void {
  const key = persistMarkerKey(submissionKey);
  if (readSessionItem(key) === "pending") {
    removeSessionItem(key);
  }
}

/** Dedupes persist calls across Strict Mode remounts and effect re-runs. */
export function persistAssessmentResultsOnce(
  submissionKey: string,
  persist: () => Promise<string | undefined>,
): Promise<string | undefined> {
  const existing = inflight.get(submissionKey);
  if (existing) return existing;

  const promise = persist().finally(() => {
    inflight.delete(submissionKey);
  });
  inflight.set(submissionKey, promise);
  return promise;
}
