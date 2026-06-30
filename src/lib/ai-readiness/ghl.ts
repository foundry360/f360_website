import type { AssessmentResults, LeadInfo } from "./types";

const GHL_API_BASE = "https://services.leadconnectorhq.com";

type GhlConfig = {
  apiKey: string;
  locationId: string;
};

export type GhlSyncResult =
  | { skipped: true; reason: string }
  | { contactId: string; action: "created" | "updated" };

function getGhlConfig(): GhlConfig | null {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiKey || !locationId) return null;
  return { apiKey, locationId };
}

function ghlHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: "2021-07-28",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

function getCategoryScore(results: AssessmentResults, category: string): number {
  return results.categoryScores.find((c) => c.category === category)?.score ?? 0;
}

function buildResultTags(results: AssessmentResults): string[] {
  return [
    "AI Assessment",
    "Enterprise",
    "AI Strategy",
    "Workflow Automation",
    "Governance",
    "Assessment Completed",
    results.readinessLevel,
  ];
}

function buildLeadStartTags(): string[] {
  return ["AI Assessment", "Assessment Started"];
}

function buildCustomFields(results: AssessmentResults, lead: LeadInfo, submittedAt: string) {
  const fieldMap: Record<string, string | number | boolean> = {
    ai_readiness_score: results.overallScore,
    readiness_level: results.readinessLevel,
    strategy_score: getCategoryScore(results, "strategy"),
    people_score: getCategoryScore(results, "people"),
    process_score: getCategoryScore(results, "processes"),
    governance_score: getCategoryScore(results, "governance"),
    technology_score: getCategoryScore(results, "technology"),
    consultation_requested: lead.consultationRequested,
    assessment_date: submittedAt.split("T")[0],
  };

  const customFieldIds = {
    ai_readiness_score: process.env.GHL_CF_AI_READINESS_SCORE,
    readiness_level: process.env.GHL_CF_READINESS_LEVEL,
    strategy_score: process.env.GHL_CF_STRATEGY_SCORE,
    people_score: process.env.GHL_CF_PEOPLE_SCORE,
    process_score: process.env.GHL_CF_PROCESS_SCORE,
    governance_score: process.env.GHL_CF_GOVERNANCE_SCORE,
    technology_score: process.env.GHL_CF_TECHNOLOGY_SCORE,
    consultation_requested: process.env.GHL_CF_CONSULTATION_REQUESTED,
    assessment_date: process.env.GHL_CF_ASSESSMENT_DATE,
  };

  const customFields: { id: string; field_value: string | number | boolean }[] = [];

  for (const [key, value] of Object.entries(fieldMap)) {
    const id = customFieldIds[key as keyof typeof customFieldIds];
    if (id) {
      customFields.push({ id, field_value: value });
    }
  }

  return customFields;
}

async function findContactByEmail(config: GhlConfig, email: string) {
  const url = new URL(`${GHL_API_BASE}/contacts/`);
  url.searchParams.set("locationId", config.locationId);
  url.searchParams.set("query", email);

  const res = await fetch(url.toString(), {
    headers: ghlHeaders(config.apiKey),
  });

  if (!res.ok) return null;

  const data = (await res.json()) as { contacts?: { id: string; email?: string }[] };
  return data.contacts?.find((c) => c.email?.toLowerCase() === email.toLowerCase()) ?? null;
}

function buildContactBody(
  config: GhlConfig,
  lead: LeadInfo,
  options: {
    tags: string[];
    customFields?: { id: string; field_value: string | number | boolean }[];
  },
) {
  return {
    locationId: config.locationId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone || undefined,
    companyName: lead.organization || undefined,
    tags: options.tags,
    source: "AI Readiness Assessment",
    customFields: options.customFields?.length ? options.customFields : undefined,
  };
}

async function writeContact(
  config: GhlConfig,
  lead: LeadInfo,
  options: {
    tags: string[];
    customFields?: { id: string; field_value: string | number | boolean }[];
    contactId?: string;
  },
): Promise<GhlSyncResult> {
  const contactBody = buildContactBody(config, lead, options);
  const headers = ghlHeaders(config.apiKey);

  if (options.contactId) {
    const res = await fetch(`${GHL_API_BASE}/contacts/${options.contactId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(contactBody),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`GHL contact update failed: ${err}`);
    }

    return { contactId: options.contactId, action: "updated" };
  }

  const existing = await findContactByEmail(config, lead.email);

  if (existing) {
    const res = await fetch(`${GHL_API_BASE}/contacts/${existing.id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(contactBody),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`GHL contact update failed: ${err}`);
    }

    return { contactId: existing.id, action: "updated" };
  }

  const res = await fetch(`${GHL_API_BASE}/contacts/`, {
    method: "POST",
    headers,
    body: JSON.stringify(contactBody),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL contact creation failed: ${err}`);
  }

  const data = (await res.json()) as { contact?: { id: string } };
  const contactId = data.contact?.id;

  if (!contactId) {
    throw new Error("GHL contact creation succeeded but no contact ID was returned");
  }

  return { contactId, action: "created" };
}

export async function syncGhlLead(
  lead: LeadInfo,
  contactId?: string,
): Promise<GhlSyncResult> {
  const config = getGhlConfig();
  if (!config) {
    return { skipped: true, reason: "GHL is not configured" };
  }

  if (!lead.email || !lead.firstName || !lead.lastName) {
    return { skipped: true, reason: "Lead contact info is incomplete" };
  }

  return writeContact(config, lead, {
    tags: buildLeadStartTags(),
    contactId,
  });
}

export async function syncGhlAssessmentResults(
  lead: LeadInfo,
  results: AssessmentResults,
  submittedAt: string,
  contactId?: string,
): Promise<GhlSyncResult> {
  const config = getGhlConfig();
  if (!config) {
    return { skipped: true, reason: "GHL is not configured" };
  }

  if (!lead.email || !lead.firstName || !lead.lastName) {
    return { skipped: true, reason: "Lead contact info is incomplete" };
  }

  const customFields = buildCustomFields(results, lead, submittedAt);

  return writeContact(config, lead, {
    tags: buildResultTags(results),
    customFields,
    contactId,
  });
}
