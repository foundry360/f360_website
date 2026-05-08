"use client";

import { useEffect, useRef } from "react";
import { useContactModal } from "@/components/contact/ContactModalContext";

/** Same-page hash used by CTAs and nav to open the contact modal (no /contact route). */
export const CONTACT_FORM_HASH = "#contact-form";

function shouldOpenContactModal(href: string): boolean {
  const t = href.trim();
  if (t === CONTACT_FORM_HASH) return true;
  if (t === "/contact#contact-form") return true;
  try {
    const u = new URL(t, window.location.origin);
    if (u.hash === "#contact-form") return true;
    return u.pathname === "/contact" && u.hash === "#contact-form";
  } catch {
    return false;
  }
}

/** Opens the contact modal instead of navigating when users activate contact CTAs. */
export function ContactHrefInterceptor() {
  const { open } = useContactModal();
  const openedFromHash = useRef(false);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const raw = a.getAttribute("href");
      if (!raw || !shouldOpenContactModal(raw)) return;
      e.preventDefault();
      open();
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined" || openedFromHash.current) return;
    if (window.location.hash !== CONTACT_FORM_HASH) return;
    openedFromHash.current = true;
    open();
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}`);
  }, [open]);

  return null;
}
