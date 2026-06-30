import type { LeadInfo } from "./types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadFieldKey = "firstName" | "lastName" | "email" | "organization";

export function validateLeadInfo(form: LeadInfo): { message: string; fields: LeadFieldKey[] } | null {
  const fields: LeadFieldKey[] = [];

  if (!form.firstName.trim()) fields.push("firstName");
  if (!form.lastName.trim()) fields.push("lastName");
  if (!form.email.trim()) fields.push("email");
  else if (!emailRegex.test(form.email.trim())) {
    return {
      message: "Please enter a valid email address.",
      fields: ["email"],
    };
  }
  if (!form.organization.trim()) fields.push("organization");

  if (fields.length === 0) return null;

  return {
    message: "Please enter your first name, last name, email, and company before starting the assessment.",
    fields,
  };
}

export const LEAD_FORM_PROMPT_EVENT = "ai-readiness:prompt-lead-form";

export function promptLeadForm(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LEAD_FORM_PROMPT_EVENT));
}
