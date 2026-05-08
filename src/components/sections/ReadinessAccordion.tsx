"use client";

import { useState } from "react";

export type ReadinessAccordionItem = { title: string; body: string };

const ITEMS: ReadinessAccordionItem[] = [
  {
    title: "Can you explain and audit every AI-driven decision?",
    body: "If model and agent outputs cannot be tied to prompts, versions, approvers, and policy checks, you cannot defend decisions to regulators or your board. Readiness means documented decision paths, retained evidence, and owners who can reconstruct what happened, with which data, and under which controls.",
  },
  {
    title: "Can your data lineage withstand regulatory review?",
    body: "Fragmented lineage and undocumented transforms create gaps examiners will find quickly. Readiness maps sources, consent, retention, and downstream use so you can demonstrate purpose limitation, lawful basis, and access boundaries when the questions get specific.",
  },
  {
    title: "Can your workflows operate safely under failure conditions?",
    body: "If failover paths and human handoffs are undefined, automation increases incident risk instead of reducing it. Readiness defines failure modes, rollback, escalation, and testing so intelligent workflows stay inside policy when latency spikes, vendors degrade, or models misbehave.",
  },
  {
    title: "Can you scale automation without introducing unmanaged risk?",
    body: "Scaling without controls expands blast radius faster than most teams model. Readiness couples automation to governance gates, rate limits, monitoring, and approvals so throughput grows without losing accountability or evidence when volume doubles.",
  },
];

/** Ask-honestly block on Industries — first panel open by default. */
export function ReadinessAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mt-5 space-y-2">
      {ITEMS.map((item, i) => (
        <details
          key={item.title}
          className="group rounded-xl border border-border bg-black/[0.04] transition-[border-color,background-color] open:border-accent/40 open:bg-accent/[0.06]"
          open={openIndex === i}
        >
          <summary
            className="flex w-full cursor-pointer list-none items-start gap-4 rounded-xl px-3 py-3 text-left outline-none marker:content-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-4 sm:py-3.5"
            onClick={(e) => {
              e.preventDefault();
              setOpenIndex((prev) => (prev === i ? -1 : i));
            }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-dim text-xs font-bold tabular-nums leading-none text-accent"
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 pt-1.5 text-sm font-medium leading-snug text-foreground sm:text-base">
              {item.title}
            </span>
            <svg
              className="mt-2 h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </summary>
          <div className="border-t border-border/60 px-3 pb-4 pt-3 pl-[calc(2.25rem+1rem)] text-left text-sm leading-relaxed text-muted sm:px-4 sm:pb-5 sm:pl-[calc(2.25rem+1rem)] sm:text-base">
            {item.body}
          </div>
        </details>
      ))}
    </div>
  );
}
