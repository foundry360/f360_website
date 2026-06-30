import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { PdfScoreDonut } from "@/components/ai-readiness/PdfScoreDonut";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";
import { site } from "@/lib/site";
import type { AssessmentResults } from "@/lib/ai-readiness/types";

const roadmapStepLabels: Record<string, string> = {
  first: "First",
  next: "Next",
  then: "Then",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 52,
    paddingHorizontal: 44,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#0a0a0a",
    backgroundColor: "#ffffff",
  },
  headerBrand: {
    fontSize: 9,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#8b6ffd",
    fontWeight: "bold",
  },
  headerMeta: {
    marginTop: 4,
    fontSize: 9,
    color: "#52525b",
  },
  headerRule: {
    marginTop: 14,
    marginBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
    paddingBottom: 4,
  },
  eyebrow: {
    fontSize: 8,
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: "#8b6ffd",
    fontWeight: "bold",
    marginBottom: 8,
  },
  h1: {
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 1.25,
    marginBottom: 12,
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  h3: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },
  body: {
    fontSize: 10,
    color: "#52525b",
    marginBottom: 8,
  },
  overallRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 8,
  },
  overallCopy: {
    flex: 1,
  },
  categoryPanel: {
    marginTop: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 10,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  actionCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
    padding: 12,
    minHeight: 110,
  },
  actionNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#f3f0ff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionNumberText: {
    color: "#8b6ffd",
    fontSize: 9,
    fontWeight: "bold",
  },
  actionFocus: {
    fontSize: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: "#8b6ffd",
    fontWeight: "bold",
    marginBottom: 6,
  },
  domainCard: {
    marginTop: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
  },
  domainHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  domainColumns: {
    flexDirection: "row",
    gap: 18,
  },
  domainColumn: {
    flex: 1,
  },
  labelCaps: {
    fontSize: 8,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 5,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#8b6ffd",
    marginTop: 4,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#52525b",
    lineHeight: 1.45,
  },
  roadmapCard: {
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
    flexDirection: "row",
    gap: 10,
  },
  ctaBox: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e4e4e7",
    borderRadius: 8,
    alignItems: "center",
  },
  disclaimer: {
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
    fontSize: 8,
    color: "#71717a",
    lineHeight: 1.45,
  },
  pageNumber: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#a1a1aa",
  },
});

type ResultsPdfDocumentProps = {
  results: AssessmentResults;
  organization?: string;
  calendarUrl?: string;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View style={styles.bullet} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function ResultsPdfDocument({ results, organization, calendarUrl }: ResultsPdfDocumentProps) {
  const orgLabel = organization || "Your organization";

  return (
    <Document title="AI Readiness Assessment Results" author={site.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.headerBrand}>{site.name}</Text>
        <Text style={styles.headerMeta}>
          AI Readiness Assessment Results{organization ? ` · ${organization}` : ""}
        </Text>
        <View style={styles.headerRule} />

        <Text style={styles.eyebrow}>Overall Readiness Analysis</Text>
        <View style={styles.overallRow}>
          <View style={styles.overallCopy}>
            <Text style={styles.h1}>{formatSectionHeadingTitle(results.headline)}</Text>
            <Text style={styles.body}>{results.executiveNarrative}</Text>
            <Text style={styles.body}>{results.summary}</Text>
          </View>
          <PdfScoreDonut score={results.overallScore} size={96} label="Readiness Score" />
        </View>

        <View style={styles.categoryPanel}>
          <Text style={styles.labelCaps}>Category Scores</Text>
          <View style={styles.categoryRow}>
            {results.categoryScores.map((cat) => (
              <PdfScoreDonut key={cat.category} score={cat.score} size={64} label={cat.label} />
            ))}
          </View>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.h2}>Key Recommended Actions</Text>
        <View style={styles.actionGrid}>
          {results.keyActions.map((action) => (
            <View key={action.order} style={styles.actionCard}>
              <View style={styles.actionNumber}>
                <Text style={styles.actionNumberText}>{action.order}</Text>
              </View>
              <Text style={styles.actionFocus}>{action.focus}</Text>
              <Text style={styles.bulletText}>{action.summary}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.eyebrow, { marginTop: 22 }]}>Domain Breakdown</Text>
        <Text style={styles.h2}>Findings and recommendations by category</Text>

        {results.domainInsights.slice(0, 2).map((domain) => (
          <View key={domain.category} style={styles.domainCard} wrap={false}>
            <View style={styles.domainHeader}>
              <PdfScoreDonut score={domain.score} size={56} />
              <View>
                <Text style={styles.h3}>{domain.label}</Text>
                <Text style={[styles.body, { marginBottom: 0 }]}>Domain score</Text>
              </View>
            </View>
            <View style={styles.domainColumns}>
              <View style={styles.domainColumn}>
                <Text style={styles.labelCaps}>Analysis</Text>
                <Text style={styles.bulletText}>{domain.analysis}</Text>
              </View>
              <View style={styles.domainColumn}>
                <Text style={styles.labelCaps}>Recommended Actions</Text>
                <BulletList items={domain.recommendedActions} />
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {results.domainInsights.length > 2 ? (
        <Page size="A4" style={styles.page}>
          {results.domainInsights.slice(2).map((domain) => (
            <View key={domain.category} style={styles.domainCard} wrap={false}>
              <View style={styles.domainHeader}>
                <PdfScoreDonut score={domain.score} size={56} />
                <View>
                  <Text style={styles.h3}>{domain.label}</Text>
                  <Text style={[styles.body, { marginBottom: 0 }]}>Domain score</Text>
                </View>
              </View>
              <View style={styles.domainColumns}>
                <View style={styles.domainColumn}>
                  <Text style={styles.labelCaps}>Analysis</Text>
                  <Text style={styles.bulletText}>{domain.analysis}</Text>
                </View>
                <View style={styles.domainColumn}>
                  <Text style={styles.labelCaps}>Recommended Actions</Text>
                  <BulletList items={domain.recommendedActions} />
                </View>
              </View>
            </View>
          ))}
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
        </Page>
      ) : null}

      <Page size="A4" style={styles.page}>
        <Text style={styles.h2}>Prioritized Roadmap</Text>
        {results.roadmap.map((phase, index) => (
          <View key={phase.step} style={styles.roadmapCard} wrap={false}>
            <View style={styles.actionNumber}>
              <Text style={styles.actionNumberText}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionFocus}>{roadmapStepLabels[phase.step]}</Text>
              <Text style={styles.h3}>{phase.title}</Text>
              <BulletList items={phase.items} />
            </View>
          </View>
        ))}

        <View style={styles.ctaBox}>
          <Text style={styles.eyebrow}>Next Step</Text>
          <Text style={[styles.h2, { textAlign: "center" }]}>Ready for a deeper assessment and discovery?</Text>
          <Text style={[styles.body, { textAlign: "center", maxWidth: 420 }]}>
            Foundry360 can validate these findings with stakeholders, review supporting evidence, and convert the
            roadmap into an execution plan for {orgLabel}.
          </Text>
          {calendarUrl ? (
            <Text style={[styles.body, { marginTop: 8, marginBottom: 0, textAlign: "center" }]}>
              Schedule discovery: {calendarUrl}
            </Text>
          ) : null}
        </View>

        <Text style={styles.disclaimer}>
          How results are determined: This preliminary assessment is based on the maturity options selected, the target
          score for each question, and the weighting assigned to each readiness category. The output is intended to
          guide discovery and prioritization, not to serve as a formal audit, certification, or compliance
          determination.
        </Text>

        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
}
