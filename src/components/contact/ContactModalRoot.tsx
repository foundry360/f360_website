"use client";

import type { ReactNode } from "react";
import { ContactHrefInterceptor } from "@/components/contact/ContactHrefInterceptor";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import { ContactModalPanel } from "@/components/contact/ContactModalPanel";

/** Global contact modal + link interception for `#contact-form` (and legacy `/contact#contact-form`). */
export function ContactModalRoot({ children }: { children: ReactNode }) {
  return (
    <ContactModalProvider>
      {children}
      <ContactHrefInterceptor />
      <ContactModalPanel />
    </ContactModalProvider>
  );
}
