"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { LeadInfo } from "@/lib/ai-readiness/types";
import {
  LEAD_FORM_PROMPT_EVENT,
  validateLeadInfo,
  type LeadFieldKey,
} from "@/lib/ai-readiness/validate-lead";

const inputClass =
  "w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/60 focus:border-accent/50 focus:ring-2 focus:ring-accent/30 sm:text-base";

const inputErrorClass =
  "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/25";

const defaultLead: LeadInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  organization: "",
  title: "",
  organizationSize: "",
  consultationRequested: true,
};

type LeadCaptureFormProps = {
  onSubmit: (lead: LeadInfo) => void;
  isSubmitting: boolean;
  error?: string;
  initialValues?: LeadInfo;
  submitLabel?: string;
  submittingLabel?: string;
};

export function LeadCaptureForm({
  onSubmit,
  isSubmitting,
  error,
  initialValues,
  submitLabel = "Start Assessment",
  submittingLabel = "Starting…",
}: LeadCaptureFormProps) {
  const [form, setForm] = useState<LeadInfo>(initialValues ?? defaultLead);
  const [validationError, setValidationError] = useState<string>();
  const [invalidFields, setInvalidFields] = useState<LeadFieldKey[]>([]);

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  useEffect(() => {
    function handlePrompt() {
      const result = validateLeadInfo(form);
      if (result) {
        setValidationError(result.message);
        setInvalidFields(result.fields);
        window.setTimeout(() => {
          const first = result.fields[0];
          document.getElementById(first === "organization" ? "company" : first)?.focus();
        }, 150);
      }
    }

    window.addEventListener(LEAD_FORM_PROMPT_EVENT, handlePrompt);
    return () => window.removeEventListener(LEAD_FORM_PROMPT_EVENT, handlePrompt);
  }, [form]);

  function handleChange(field: keyof LeadInfo, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setInvalidFields((prev) => {
      const next = prev.filter((f) => f !== field);
      if (next.length === 0) setValidationError(undefined);
      return next;
    });
  }

  function fieldClass(field: LeadFieldKey) {
    return [inputClass, invalidFields.includes(field) ? inputErrorClass : ""].filter(Boolean).join(" ");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = validateLeadInfo(form);
    if (result) {
      setValidationError(result.message);
      setInvalidFields(result.fields);
      document.getElementById(result.fields[0] === "organization" ? "company" : result.fields[0])?.focus();
      return;
    }

    setValidationError(undefined);
    setInvalidFields([]);
    onSubmit(form);
  }

  const displayError = validationError ?? error;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-foreground">
            First Name <span className="text-accent">*</span>
          </label>
          <input
            id="firstName"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={fieldClass("firstName")}
            aria-invalid={invalidFields.includes("firstName")}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-foreground">
            Last Name <span className="text-accent">*</span>
          </label>
          <input
            id="lastName"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={fieldClass("lastName")}
            aria-invalid={invalidFields.includes("lastName")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={fieldClass("email")}
          aria-invalid={invalidFields.includes("email")}
        />
      </div>

      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
          Company <span className="text-accent">*</span>
        </label>
        <input
          id="company"
          required
          autoComplete="organization"
          value={form.organization}
          onChange={(e) => handleChange("organization", e.target.value)}
          className={fieldClass("organization")}
          aria-invalid={invalidFields.includes("organization")}
        />
      </div>

      {displayError ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-700" role="alert">
          {displayError}
        </p>
      ) : null}

      <div className="pt-1">
        <Button type="submit" size="sm" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Use business context only. Please avoid sharing confidential, regulated, or sensitive information in your
          responses.
        </p>
      </div>
    </form>
  );
}
