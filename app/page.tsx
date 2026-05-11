import { ProfessionalHome } from "components/landing/professional-home";
import { SurpriseHome } from "components/landing/surprise-home";
import { TraditionalHome } from "components/landing/traditional-home";
import { getLandingVariant } from "lib/landing-variant";
import type { Metadata } from "next";

const LANDING_DESCRIPTIONS: Record<
  ReturnType<typeof getLandingVariant>,
  string
> = {
  professional:
    "Curated books and professional storefront experience — browse, compare, and checkout with confidence.",
  traditional:
    "A warm, classic bookshop online — staff picks, new arrivals, and the feel of a neighbourhood store.",
  surprise:
    "A bold, playful bookstore experience — discover titles with energy, motion, and curiosity.",
};

export async function generateMetadata(): Promise<Metadata> {
  const variant = getLandingVariant();
  return {
    description: LANDING_DESCRIPTIONS[variant],
    openGraph: {
      type: "website",
    },
  };
}

export default async function HomePage() {
  const variant = getLandingVariant();

  switch (variant) {
    case "traditional":
      return <TraditionalHome />;
    case "surprise":
      return <SurpriseHome />;
    default:
      return <ProfessionalHome />;
  }
}
