import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { formatSectionHeadingTitle } from "@/lib/sectionHeadingTitleCase";

type CTABannerProps = {
  title: string;
  body: string;
  cta: { href: string; label: string };
  /** Keep the title on one line (fluid size + horizontal scroll on very narrow viewports). */
  titleSingleLine?: boolean;
};

export function CTABanner({ title, body, cta, titleSingleLine = false }: CTABannerProps) {
  const titleDisplay = formatSectionHeadingTitle(title);

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,90rem)] overflow-hidden rounded-3xl border border-border bg-black/15 px-5 py-10 text-center text-foreground backdrop-blur-[2px] sm:px-8 sm:py-12 lg:px-10 lg:py-14">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="relative flex flex-col items-center gap-6">
        <Reveal className="mx-auto w-full max-w-full space-y-3">
          {titleSingleLine ? (
            <div className="mx-auto w-full max-w-full overflow-x-auto overflow-y-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <h2 className="mx-auto w-max max-w-none px-1 text-center text-[clamp(0.95rem,1.8vw+0.45rem,2.25rem)] font-semibold leading-tight tracking-tight text-foreground whitespace-nowrap normal-case sm:text-[clamp(1.05rem,1.5vw+0.55rem,2.25rem)]">
                {titleDisplay}
              </h2>
            </div>
          ) : (
            <h2 className="mx-auto max-w-5xl text-3xl font-semibold tracking-tight text-foreground normal-case sm:text-4xl">
              {titleDisplay}
            </h2>
          )}
          <p className="mx-auto max-w-3xl text-muted sm:max-w-4xl">{body}</p>
        </Reveal>
        <Reveal delayMs={80} className="shrink-0">
          <ButtonLink href={cta.href} variant="dark" size="sm">
            {cta.label}
          </ButtonLink>
        </Reveal>
      </div>
    </div>
  );
}
