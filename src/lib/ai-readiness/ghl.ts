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

function buildUpsertBody(
  config: GhlConfig,
  lead: LeadInfo,
  customFields?: { id: string; field_value: string | number | boolean }[],
) {
  return {
    locationId: config.locationId,
    firstName: lead.firstName.trim(),
    lastName: lead.lastName.trim(),
    email: lead.email.trim(),
    phone: lead.phone?.trim() || undefined,
    companyName: lead.organization.trim(),
    source: "AI Readiness Assessment",
    customFields: customFields?.length ? customFields : undefined,
  };
}

async function upsertContact(
  config: GhlConfig,
  lead: LeadInfo,
  customFields?: { id: string; field_value: string | number | boolean }[],
): Promise<{ contactId: string; action: "created" | "updated" }> {
  const res = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: "POST",
    headers: ghlHeaders(config.apiKey),
    body: JSON.stringify(buildUpsertBody(config, lead, customFields)),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL contact upsert failed: ${err}`);
  }

  const data = (await res.json()) as { contact?: { id: string }; new?: boolean };
  const contactId = data.contact?.id;

  if (!contactId) {
    throw new Error("GHL contact upsert succeeded but no contact ID was returned");
  }

  return { contactId, action: data.new ? "created" : "updated" };
}

async function addContactTags(config: GhlConfig, contactId: string, tags: string[]): Promise<void> {
  if (tags.length === 0) return;

  const res = await fetch(`${GHL_API_BASE}/contacts/${contactId}/tags`, {
    method: "POST",
    headers: ghlHeaders(config.apiKey),
    body: JSON.stringify({ tags }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GHL add tags failed: ${err}`);
  }
}

async function writeContact(
  config: GhlConfig,
  lead: LeadInfo,
  options: {
    tags: string[];
    customFields?: { id: string; field_value: string | number | boolean }[];
  },
): Promise<GhlSyncResult> {
  const { contactId, action } = await upsertContact(config, lead, options.customFields);
  await addContactTags(config, contactId, options.tags);
  return { contactId, action };
}

export async function syncGhlLead(lead: LeadInfo): Promise<GhlSyncResult> {
  const config = getGhlConfig();
  if (!config) {
    return { skipped: true, reason: "GHL is not configured" };
  }

  if (!lead.email || !lead.firstName || !lead.lastName) {
    return { skipped: true, reason: "Lead contact info is incomplete" };
  }

  return writeContact(config, lead, {
    tags: buildLeadStartTags(),
  });
}

export async function syncGhlAssessmentResults(
  lead: LeadInfo,
  results: AssessmentResults,
  submittedAt: string,
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
  });
}
