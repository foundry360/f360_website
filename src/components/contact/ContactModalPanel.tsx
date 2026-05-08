"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { ContactForm } from "@/components/contact/ContactForm";
import { useContactModal } from "@/components/contact/ContactModalContext";
import { site } from "@/lib/site";

export function ContactModalPanel() {
  const { isOpen, close } = useContactModal();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const id = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLTextAreaElement>("#message")?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button:not([tabindex="-1"]), [href]:not([tabindex="-1"]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-end justify-start p-4 sm:p-6" role="presentation">
      <div
        role="presentation"
        className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex h-[min(92vh,48rem)] w-full max-w-[min(100%,26rem)] max-h-[92vh] flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-[#1c1c1f] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-2 border-b border-white/[0.06] bg-[#232326] px-4 py-3.5 sm:px-5">
          <div className="min-w-0 pt-0.5">
            <h2 id={titleId} className="text-[0.95rem] font-semibold leading-tight tracking-tight text-foreground">
              {site.name} assistant
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-[0.7rem] font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Online · replies from our team
            </p>
          </div>
          <button
            type="button"
            tabIndex={-1}
            className="shrink-0 rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={close}
            aria-label="Close"
          >
            <span aria-hidden className="block text-lg leading-none">
              ×
            </span>
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#141416] px-4 py-3 sm:px-5 sm:py-3 [&_form]:flex [&_form]:h-full [&_form]:min-h-0 [&_form]:flex-1 [&_form]:flex-col">
          <ContactForm />
        </div>
      </div>
    </div>,
    document.body,
  );
}
