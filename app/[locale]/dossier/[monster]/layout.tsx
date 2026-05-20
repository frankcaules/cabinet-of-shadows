import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMonster } from "@/lib/data/monsters";

// Fonts loaded on any dossier route. Phase 5 will split these
// per-monster via per-slug layouts.
// Dracula
import "@fontsource/unifrakturmaguntia/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
// The Creature
import "@fontsource/cormorant-unicase/400.css";
import "@fontsource/cormorant-unicase/500.css";
import "@fontsource/special-elite/400.css";
// Mr. Hyde
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/400-italic.css";
import "@fontsource/lora/600.css";
import "@fontsource/im-fell-dw-pica/400.css";
import "@fontsource/im-fell-dw-pica/400-italic.css";
// The Werewolf
import "@fontsource/pirata-one/400.css";
import "@fontsource/crimson-pro/400.css";
import "@fontsource/crimson-pro/400-italic.css";
import "@fontsource/crimson-pro/600.css";
import "@fontsource/germania-one/400.css";
// Griffin
import "@fontsource/abril-fatface/400.css";
import "@fontsource/source-serif-4/400.css";
import "@fontsource/source-serif-4/400-italic.css";
import "@fontsource/source-serif-4/600.css";
// Carmilla
import "@fontsource/italiana/400.css";
import "@fontsource/pinyon-script/400.css";
// Erik (Phantom)
import "@fontsource/cormorant-sc/400.css";
import "@fontsource/cormorant-sc/500.css";
// Dorian
import "@fontsource/bodoni-moda/400.css";
import "@fontsource/bodoni-moda/400-italic.css";
import "@fontsource/bodoni-moda/600.css";
// Varney
import "@fontsource/im-fell-english/400.css";
import "@fontsource/im-fell-english/400-italic.css";
import "@fontsource/im-fell-double-pica-sc/400.css";
// Sweeney
import "@fontsource/limelight/400.css";
import "@fontsource/libre-caslon-text/400.css";
import "@fontsource/libre-caslon-text/400-italic.css";
// Spring-Heeled Jack
import "@fontsource/modak/400.css";
import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/400-italic.css";
import "@fontsource/newsreader/600.css";
// Golem
import "@fontsource/frank-ruhl-libre/400.css";
import "@fontsource/frank-ruhl-libre/500.css";
import "@fontsource/cardo/400.css";
import "@fontsource/cardo/400-italic.css";
import "@fontsource/cardo/700.css";
// Horseman
import "@fontsource/old-standard-tt/400.css";
import "@fontsource/old-standard-tt/400-italic.css";
import "@fontsource/old-standard-tt/700.css";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string; monster: string }>;
}

export default async function DossierLayout({ children, params }: LayoutProps) {
  const { monster: slug } = await params;
  const monster = getMonster(slug);
  if (!monster) notFound();

  return (
    <div
      data-monster={slug}
      style={{ minHeight: "100dvh" }}
    >
      {children}
    </div>
  );
}
