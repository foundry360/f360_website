import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { ResultsPdfDocument } from "@/components/ai-readiness/ResultsPdfDocument";
import { buildResultsPdfFilename } from "@/lib/ai-readiness/download-results-pdf";
import type { AssessmentResults } from "@/lib/ai-readiness/types";

type PdfRequestBody = {
  results: AssessmentResults;
  organization?: string;
  calendarUrl?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PdfRequestBody;

    if (body.results?.overallScore === undefined || !body.results.categoryScores?.length) {
      return NextResponse.json({ error: "Assessment results are required." }, { status: 400 });
    }

    const buffer = await renderToBuffer(
      <ResultsPdfDocument
        results={body.results}
        organization={body.organization}
        calendarUrl={body.calendarUrl}
      />,
    );

    const filename = buildResultsPdfFilename(body.organization);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[ai-readiness] PDF generation error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
