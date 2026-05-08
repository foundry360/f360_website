/** Central nav + company strings — mirrors foundry360.us facts; swap body copy via CMS when ready. */
export const site = {
  name: "Foundry360",
  /** Aligned with live site positioning (enterprise AI strategy & deploy). */
  tagline: "Enterprise AI Strategy and Deployment",
  description:
    "Foundry360 helps organizations turn AI concepts into production-ready applications by combining enterprise governance, intelligent orchestration, and architectures designed for compliance from the start.",
  /** Primary marketing domain (WordPress canonical also uses foundry360.us). */
  url: "https://www.foundry360.us",
  email: "jgelsomino@foundry360.us",
  phone: "904.210.3388",
  phoneTel: "+19042103388",
  address: {
    line1: "3046 Oatland Court",
    city: "Orange Park",
    region: "FL",
    postal: "32065",
  },
} as const;

export type NavLeaf = { readonly href: string; readonly label: string };

/** Primary header IA — aligned with https://foundry360.us/ (no Products section in this Next.js build). */
export const navEntries: readonly NavLeaf[] = [
  { href: "/", label: "Home" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/what-you-can-expect", label: "What you can expect" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/** Shown in footer below primary IA (still part of this Next.js site). */
export const footerExtraLinks: readonly NavLeaf[] = [
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
] as const;

/** Flattened links for footer “Explore”. */
export function getFooterNavLinks(): { href: string; label: string }[] {
  return [...navEntries, ...footerExtraLinks];
}
