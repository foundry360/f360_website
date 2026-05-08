/** Lowercase in headings except first/last word (Chicago-style), plus acronyms preserved. */
const SMALL_WORDS = new Set([
  "a",
  "an",
  "and",
  "as",
  "at",
  "but",
  "by",
  "for",
  "from",
  "if",
  "in",
  "into",
  "is",
  "it",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "or",
  "so",
  "the",
  "to",
  "up",
  "via",
  "vs",
  "yet",
]);

function segmentTitleCase(
  seg: string,
  isFirstSegmentOfHeading: boolean,
  isLastSegmentOfHeading: boolean,
): string {
  const m = seg.match(/^([^A-Za-z0-9]*)([A-Za-z0-9][A-Za-z0-9']*)([^A-Za-z0-9]*)$/);
  if (!m) return seg;
  const [, lead, core, trail] = m;
  if (/^\d/.test(core)) return lead + core + trail;
  if (core.length > 1 && core === core.toUpperCase() && /^[A-Z0-9]+$/.test(core)) {
    return lead + core + trail;
  }

  const low = core.toLowerCase();
  const isSmall = SMALL_WORDS.has(low);
  if (isSmall && !isFirstSegmentOfHeading && !isLastSegmentOfHeading) {
    return lead + low + trail;
  }

  const capped = core.charAt(0).toUpperCase() + core.slice(1).toLowerCase();
  return lead + capped + trail;
}

function formatHeadingToken(raw: string, isFirstToken: boolean, isLastToken: boolean): string {
  if (raw.includes("-")) {
    const parts = raw.split("-");
    return parts
      .map((p, j) =>
        segmentTitleCase(
          p,
          isFirstToken && j === 0,
          isLastToken && j === parts.length - 1,
        ),
      )
      .join("-");
  }
  return segmentTitleCase(raw, isFirstToken, isLastToken);
}

/** Title-case a section heading with small words (the, and, to, …) lowercased when not first/last. */
export function formatSectionHeadingTitle(s: string): string {
  const words = s.trim().split(/\s+/);
  if (words.length === 0) return s;
  return words.map((w, i) => formatHeadingToken(w, i === 0, i === words.length - 1)).join(" ");
}
