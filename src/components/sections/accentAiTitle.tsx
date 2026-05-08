import type { ReactNode } from "react";

export type AccentAiOptions = { /** Default true; set false for purple only. */ italic?: boolean };

/** Wrap standalone `AI` in brand accent (italic by default; expects already title-cased text). */
export function accentAiInFormattedHeading(
  formatted: string,
  keyPrefix = "ai",
  options?: AccentAiOptions,
): ReactNode {
  const italic = options?.italic !== false;
  return formatted.split(/(\bAI\b)/).map((part, i) =>
    part === "AI" ? (
      <span
        key={`${keyPrefix}-ai-${i}`}
        className={italic ? "text-accent italic" : "text-accent not-italic"}
      >
        AI
      </span>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part}</span>
    ),
  );
}
