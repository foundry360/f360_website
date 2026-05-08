"use client";

import { useState, type FormEvent } from "react";

/** UI-only form — wire to API route or headless CMS on submit when backend is ready. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-2xl border border-border bg-black/25 p-6 backdrop-blur-sm sm:p-8"
      noValidate
    >
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        <div className="grid gap-2">
          <label htmlFor="first" className="text-sm font-medium text-foreground">
            First name
          </label>
          <input
            id="first"
            name="first"
            autoComplete="given-name"
            required
            className="rounded-lg border border-border bg-black/35 px-3 py-2 text-sm text-foreground outline-none ring-offset-2 ring-offset-background placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            placeholder="Jordan"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="last" className="text-sm font-medium text-foreground">
            Last name
          </label>
          <input
            id="last"
            name="last"
            autoComplete="family-name"
            required
            className="rounded-lg border border-border bg-black/35 px-3 py-2 text-sm text-foreground outline-none ring-offset-2 ring-offset-background placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
            placeholder="Lee"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-lg border border-border bg-black/35 px-3 py-2 text-sm text-foreground outline-none ring-offset-2 ring-offset-background placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="you@company.com"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="company" className="text-sm font-medium text-foreground">
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className="rounded-lg border border-border bg-black/35 px-3 py-2 text-sm text-foreground outline-none ring-offset-2 ring-offset-background placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="Acme Corp"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="resize-y rounded-lg border border-border bg-black/35 px-3 py-2 text-sm text-foreground outline-none ring-offset-2 ring-offset-background placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="Brief context on systems, timeline, and outcomes you are targeting."
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Send message
        </button>
        {sent ? (
          <p className="text-sm text-accent" role="status">
            Thanks. This demo form does not post yet; your product team can connect an endpoint here.
          </p>
        ) : null}
      </div>
    </form>
  );
}
