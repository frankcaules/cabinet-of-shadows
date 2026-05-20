import { notFound } from "next/navigation";
import { DossierShell } from "@/components/dossier/DossierShell";
import { StubDossier } from "@/components/dossier/StubDossier";
import { getMonster, getAllSlugs } from "@/lib/data/monsters";

interface PageProps {
  params: Promise<{ monster: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ monster: slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { monster: slug } = await params;
  const entry = getMonster(slug);
  if (!entry) return { title: "Catalogue not found — The Cabinet of Shadows" };
  return {
    title: `${entry.name} — The Cabinet of Shadows`,
    description: `${entry.epithet}. A case from ${entry.source.title} (${entry.source.author}, ${entry.source.year}).`,
  };
}

export default async function DossierPage({ params }: PageProps) {
  const { monster: slug } = await params;
  const entry = getMonster(slug);
  if (!entry) notFound();

  if (entry.status === "stub") {
    return <StubDossier monster={entry} />;
  }

  return <DossierShell monster={entry} />;
}
