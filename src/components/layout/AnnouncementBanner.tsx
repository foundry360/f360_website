const ENIGMA_URL = "https://getenigmaai.com";

/** Sitewide launch bar. Sits above the nav inside the sticky header. */
export function AnnouncementBanner() {
  return (
    <a
      href={ENIGMA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-0.5 bg-accent px-4 py-2.5 text-center text-sm font-medium leading-snug text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
    >
      <span className="inline-flex items-center gap-2">
        <span className="inline-block size-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
        Now launching: Enigma brings policy enforcement to the moment AI acts.
      </span>
      <span className="whitespace-nowrap underline decoration-white/70 underline-offset-2">Learn more</span>
    </a>
  );
}
