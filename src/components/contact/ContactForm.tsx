"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const detailInput =
  "w-full rounded-xl border-0 bg-white/[0.05] px-3 py-2 text-xs text-foreground outline-none ring-1 ring-inset ring-white/[0.08] transition placeholder:text-muted/45 focus:ring-2 focus:ring-accent";

/** UI-only chat-style contact — wire to API route or headless CMS on submit when backend is ready. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
      <div className="flex min-h-0 flex-1 flex-col space-y-4 overflow-hidden pb-2">
        <div className="flex gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[0.65rem] font-bold text-accent"
            aria-hidden
          >
            F360
          </div>
          <div className="min-w-0 max-w-[92%] space-y-2">
            <div className="rounded-2xl rounded-bl-md bg-white/[0.08] px-3.5 py-2.5 text-sm leading-relaxed text-foreground/95 ring-1 ring-white/[0.06]">
              Hi — I&apos;m the {site.name} assistant. Describe what you&apos;re trying to solve, your timeline, and any
              constraints. A human on our team reads every submission.
            </div>
            <div className="rounded-2xl rounded-bl-md bg-white/[0.06] px-3.5 py-2 text-xs leading-relaxed text-muted ring-1 ring-white/[0.05]">
              Add your details in the card below, type your message in the box at the bottom, then tap send.
            </div>
          </div>
        </div>

        <fieldset
          disabled={sent}
          className="space-y-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.04]"
        >
          <legend className="sr-only">Your contact details</legend>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted">Your details</p>
          <div className="grid gap-2">
            <label htmlFor="email" className="sr-only">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Work email"
              className={detailInput}
              aria-label="Work email"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label htmlFor="first" className="sr-only">
                  First name
                </label>
                <input
                  id="first"
                  name="first"
                  autoComplete="given-name"
                  required
                  placeholder="First"
                  className={detailInput}
                  aria-label="First name"
                />
              </div>
              <div>
                <label htmlFor="last" className="sr-only">
                  Last name
                </label>
                <input
                  id="last"
                  name="last"
                  autoComplete="family-name"
                  required
                  placeholder="Last"
                  className={detailInput}
                  aria-label="Last name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="sr-only">
                Company (optional)
              </label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Company (optional)"
                className={detailInput}
                aria-label="Company (optional)"
              />
            </div>
          </div>
          <p className="text-[0.6rem] leading-snug text-muted/80">
            Email and name are required. Company is optional. These appear on the thread for our team only.
          </p>
        </fieldset>

        {sent ? (
          <div className="flex gap-2.5">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[0.65rem] font-bold text-accent"
              aria-hidden
            >
              F360
            </div>
            <p
              className="max-w-[92%] rounded-2xl rounded-bl-md border border-accent/25 bg-accent/10 px-3.5 py-2.5 text-xs leading-relaxed text-foreground/95"
              role="status"
            >
              Thanks — this demo doesn&apos;t post to a server yet. Your team can wire an API route or form provider to
              this chat when you&apos;re ready.
            </p>
          </div>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-white/[0.08] bg-[#141416] pt-3">
        <label htmlFor="message" className="sr-only">
          Message to {site.name}
        </label>
        <div className="flex items-end gap-1.5 rounded-[1.25rem] bg-[#2a2a2e] p-1.5 pl-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ring-1 ring-inset ring-white/[0.08]">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            disabled={sent}
            placeholder="Type your message…"
            className="min-h-[5.5rem] flex-1 resize-none border-0 bg-transparent py-2 pr-1 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted/55 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={sent}
            className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <svg className="h-4 w-4 -rotate-12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M3.478 2.404a.75.75 0 0 0-.878.878l3.2 9.92a.75.75 0 0 0 .715.516h6.448a.75.75 0 0 1 0 1.5H6.515a.75.75 0 0 0-.714.515l-3.2 9.921a.75.75 0 0 0 .878.878l17.5-7.5a.75.75 0 0 0 0-1.378l-17.5-7.5Z" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-center text-[0.65rem] text-muted/70">Press send when your message is ready.</p>
      </div>
    </form>
  );
}
