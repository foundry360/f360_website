import type { LeadInfo } from "./types";

export const LEAD_STORAGE_KEY = "f360-ai-readiness-lead";

export function loadLeadInfo(): LeadInfo | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(LEAD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LeadInfo>;
    if (!parsed.firstName || !parsed.lastName || !parsed.email || !parsed.organization) return null;
    return {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email,
      phone: parsed.phone ?? "",
      organization: parsed.organization ?? "",
      title: parsed.title ?? "",
      organizationSize: parsed.organizationSize ?? "",
      consultationRequested: parsed.consultationRequested ?? true,
      ghlContactId: typeof parsed.ghlContactId === "string" ? parsed.ghlContactId : undefined,
    };
  } catch {
    return null;
  }
}

export function saveLeadInfo(lead: LeadInfo): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(lead));
  } catch {
    throw new Error("Unable to save lead information");
  }
}

export function clearLeadInfo(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LEAD_STORAGE_KEY);
}

export function hasLeadInfo(): boolean {
  return loadLeadInfo() !== null;
}
