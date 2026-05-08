import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

type CTABannerProps = {
  title: string;
  body: string;
  cta: { href: string; label: string };
};

export function CTABanner({ title, body, cta }: CTABannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated/90 p-10 sm:p-14">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl" aria-hidden />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="max-w-4xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
          <p className="text-muted">{body}</p>
        </Reveal>
        <Reveal delayMs={80} className="shrink-0">
          <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
        </Reveal>
      </div>
    </div>
  );
}
