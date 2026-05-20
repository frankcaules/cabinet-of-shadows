import { notFound } from "next/navigation";
import { DossierShell } from "@/components/dossier/DossierShell";
import { StubDossier } from "@/components/dossier/StubDossier";
import { getMonster, getAllSlugs } from "@/lib/data/monsters";
import { LOCALES, type Locale } from "@/lib/data/types";

interface PageProps {
  params: Promise<{ locale: string; monster: string }>;
}

export function generateStaticParams() {
  // Cross-product: every locale × every monster slug
  const slugs = getAllSlugs();
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, monster: slug })));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale: rawLocale, monster: slug } = await params;
  const locale = (LOCALES.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
  const entry = getMonster(slug, locale);
  if (!entry) return { title: "Catalogue not found — The Cabinet of Shadows" };
  return {
    title: `${entry.name} — The Cabinet of Shadows`,
    description: `${entry.epithet}. A case from ${entry.source.title} (${entry.source.author}, ${entry.source.year}).`,
  };
}

export default async function DossierPage({ params }: PageProps) {
  const { locale: rawLocale, monster: slug } = await params;
  const locale = (LOCALES.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
  const entry = getMonster(slug, locale);
  if (!entry) notFound();

  if (entry.status === "stub") {
    return <StubDossier monster={entry} locale={locale} />;
  }

  return <DossierShell monster={entry} locale={locale} />;
}
