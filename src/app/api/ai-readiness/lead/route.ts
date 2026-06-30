import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { syncGhlLead } from "@/lib/ai-readiness/ghl";
import type { LeadInfo } from "@/lib/ai-readiness/types";

type LeadPayload = {
  lead: LeadInfo;
  ghlContactId?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLead(lead: LeadInfo | undefined): string | null {
  if (!lead?.firstName?.trim() || !lead?.lastName?.trim()) {
    return "First name and last name are required.";
  }
  if (!lead.email?.trim() || !emailRegex.test(lead.email.trim())) {
    return "A valid email address is required.";
  }
  if (!lead.organization?.trim()) {
    return "Company is required.";
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadPayload;
    const error = validateLead(body.lead);

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const ghlResult = await syncGhlLead(body.lead, body.ghlContactId);

    if ("skipped" in ghlResult) {
      console.warn("[ai-readiness] GHL lead sync skipped:", ghlResult.reason);
    }

    return NextResponse.json({
      success: true,
      ghl: ghlResult,
      contactId: "contactId" in ghlResult ? ghlResult.contactId : null,
    });
  } catch (err) {
    console.error("[ai-readiness] lead sync error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
