"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { AI_READINESS_ASSESSMENT_PATH } from "@/lib/ai-readiness/routes";

export function ConditionalFooter() {
  const pathname = usePathname() ?? "";

  if (pathname === AI_READINESS_ASSESSMENT_PATH) {
    return null;
  }

  return <Footer />;
}
