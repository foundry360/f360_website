import type { AssessmentResults } from "@/lib/ai-readiness/types";

type DownloadPdfOptions = {
  filename: string;
  results: AssessmentResults;
  organization?: string;
  calendarUrl?: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function buildResultsPdfFilename(organization?: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const org = organization ? slugify(organization) : "assessment";
  return `foundry360-ai-readiness-${org}-${date}.pdf`;
}

export async function downloadResultsPdf({
  filename,
  results,
  organization,
  calendarUrl,
}: DownloadPdfOptions): Promise<void> {
  const res = await fetch("/api/ai-readiness/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ results, organization, calendarUrl }),
  });

  if (!res.ok) {
    throw new Error("PDF generation failed");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
