export type LandingVariant = "professional" | "traditional" | "surprise";

const VALID: LandingVariant[] = ["professional", "traditional", "surprise"];

/**
 * Which homepage layout to render. Set in `.env`:
 * `LANDING_VARIANT=professional` | `traditional` | `surprise`
 * Defaults to `professional`.
 */
export function getLandingVariant(): LandingVariant {
  const raw = process.env.LANDING_VARIANT?.trim().toLowerCase();
  if (raw && VALID.includes(raw as LandingVariant)) {
    return raw as LandingVariant;
  }
  return "professional";
}

/** Blog index URL for CTAs (matches footer default). */
export function getBlogIndexPath(): string {
  return process.env.NEXT_PUBLIC_BLOG_PATH?.trim() || "/blogs/adpa";
}
