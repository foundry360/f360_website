"use client";

import type { ComponentProps, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { hasLeadInfo } from "@/lib/ai-readiness/lead-storage";
import { AI_READINESS_ASSESSMENT_PATH } from "@/lib/ai-readiness/routes";
import { promptLeadForm } from "@/lib/ai-readiness/validate-lead";

type StartAssessmentLinkProps = ComponentProps<typeof ButtonLink>;

export function StartAssessmentLink({ href, onClick, ...rest }: StartAssessmentLinkProps) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (hasLeadInfo()) {
      e.preventDefault();
      router.push(AI_READINESS_ASSESSMENT_PATH);
      return;
    }

    promptLeadForm();
  }

  return <ButtonLink href={href} onClick={handleClick} {...rest} />;
}
