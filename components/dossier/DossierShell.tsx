import type { Monster, Locale } from "@/lib/data/types";
import { Summoning } from "./Summoning";
import { CitationHeader } from "./CitationHeader";
import { Visage } from "./Visage";
import { Legend } from "./Legend";
import { Anxiety } from "./Anxiety";
import { ClinicalNote } from "./ClinicalNote";
import { DiagnosisCard } from "./DiagnosisCard";
import { ExitLine } from "./ExitLine";
import { Colophon } from "@/components/site/Colophon";
import { SceneBreak } from "./SceneBreak";
import { ChapterIndex } from "./ChapterIndex";
import { IntroCard } from "./IntroCard";
import { DossierParticles } from "./DossierParticles";

// Atmospheric scene illustrations per monster. Phase 2 will add the
// remaining twelve sets; for Phase 1 only Dracula is wired.
const SCENE_BREAKS: Record<string, { src: string; alt: string; width: number; height: number; caption: string }> = {
  dracula: {
    src: "/illustrations/dracula/castle.webp",
    alt: "An ancient stone castle perched on a jagged Carpathian mountain peak under a thin moon; pine forests fall away below into mist.",
    width: 1216,
    height: 832,
    caption: "The Borgo Pass at dusk. A single window is lit. He is, by his own admission, expecting us.",
  },
  "the-creature": {
    src: "/illustrations/the-creature/laboratory.webp",
    alt: "An abandoned 19th century laboratory at dawn. Tall arched windows light an overturned operating slab, scattered papers, a Voltaic pile, an extinguished candle.",
    width: 1216,
    height: 832,
    caption: "The laboratory at Ingolstadt the morning after. The maker had left within the hour. We may infer what the subject saw on waking.",
  },
  hyde: {
    src: "/illustrations/hyde/apothecary.webp",
    alt: "A Victorian apothecary laboratory: cabinets full of glass bottles line dark green walls, a central wooden worktable holds glass vessels, an ornate brass lamp hangs from the ceiling.",
    width: 1216,
    height: 832,
    caption: "The laboratory in Soho on the morning of the inquest. Everything in its proper place; everything tasting faintly of the compound.",
  },
  "the-wolf": {
    src: "/illustrations/the-wolf/forest.webp",
    alt: "A vast Black Forest clearing at midnight under a colossal full moon, with ancient pines, frost, and two faint amber eyes in the trees.",
    width: 1280,
    height: 896,
    caption: "The clearing east of the inn, photographed by the prosecution. The eyes between the trees are, the magistrate ruled, a trick of the light.",
  },
  griffin: {
    src: "/illustrations/griffin/scene.webp",
    alt: "An abandoned 19th century laboratory at dawn: tall arched windows, scattered scientific glassware, an empty chair pulled back from the desk, fresh footprints in dust leading to the door.",
    width: 1280,
    height: 896,
    caption: "The laboratory the morning the rent came overdue. The chair, the landlady deposed, had been pulled out.",
  },
  carmilla: {
    src: "/illustrations/carmilla/scene.webp",
    alt: "A Styrian Austrian castle on a misty wooded hilltop at twilight, dark forest below shrouded in mist, a thin sickle moon overhead, small chapel and family burying-ground in the foreground.",
    width: 1280,
    height: 896,
    caption: "The schloss in Styria from the road below. The burying-ground, the General reports, predates the present house by some centuries.",
  },
  erik: {
    src: "/illustrations/erik/scene.webp",
    alt: "A vast underground lake beneath a Paris opera house at night, an ornate gondola moored at a stone landing, candelabra reflected in still black water, Gothic stone arches receding into darkness overhead.",
    width: 1280,
    height: 896,
    caption: "The cellar lake, photographed in 1881 by the present management's discreet arrangement. The gondola is, the management insists, not in regular use.",
  },
  dorian: {
    src: "/illustrations/dorian/scene.webp",
    alt: "A dust-shrouded attic room in a 1890 London townhouse, a single ornate gilt-framed full-length portrait propped against the wall depicting a horrifically aged corrupted face with cracking paint.",
    width: 1280,
    height: 896,
    caption: "The attic at Grosvenor Square as the executor found it. The condition of the portrait is, the present author can confirm, accurately reported by Wilde.",
  },
  varney: {
    src: "/illustrations/varney/scene.webp",
    alt: "The crater of Mount Vesuvius at dawn 1847: rising sulphurous smoke, glowing molten lava far below, jagged volcanic rock walls, a lone black coat torn and abandoned at the edge, torn penny dreadful pages caught on the rocks.",
    width: 1280,
    height: 896,
    caption: "The crater of Vesuvius at dawn, the morning after Number 220. The coat is, the publisher confirms, his.",
  },
  sweeney: {
    src: "/illustrations/sweeney/scene.webp",
    alt: "A foggy Fleet Street London at midnight 1846: wet cobblestones, narrow Tudor and Georgian buildings, St Dunstan-in-the-West spire distant, a gas lamp casting amber light through fog, hanging shop signs for a barber and a pie shop.",
    width: 1280,
    height: 896,
    caption: "Fleet Street at midnight. Both shops, by the magistrate's order, have since been demolished.",
  },
  jack: {
    src: "/illustrations/jack/scene.webp",
    alt: "Panoramic Victorian London rooftops at midnight 1838: endless dark slate roofs and chimney pots receding into thick yellow fog, gas lamps below glowing through the fog, St Paul's distant on the horizon, a single trail of blue flame arcing across one gable.",
    width: 1280,
    height: 896,
    caption: "London rooftops on the night the broadsheets had him in Peckham, Sheffield, and Aldershot simultaneously. The blue trail is, on most reproductions, supplied by the engraver.",
  },
  golem: {
    src: "/illustrations/golem/scene.webp",
    alt: "The dim attic of an ancient medieval Prague synagogue at dawn: exposed timber beams, shelves of crumbling Hebrew manuscripts, a mound of unfired river clay shaped vaguely as a recumbent man covered with a sheet, a single Hebrew prayer book open beside it.",
    width: 1280,
    height: 896,
    caption: "The attic of the Altneuschul, photographed at dawn. The persons in a position to know decline, on the whole, to comment.",
  },
  horseman: {
    src: "/illustrations/horseman/scene.webp",
    alt: "A covered wooden bridge in autumn New England at midnight 1820, ancient oaks and maples in full red and ochre autumn colour, scattered fallen leaves, mist rising from the water below, a shattered jack-o-lantern with a still-flickering candle on the bridge approach, a Dutch burying ground silhouetted on the far hill.",
    width: 1280,
    height: 896,
    caption: "The covered bridge south of the burying-ground. The pumpkin was on the road by morning; the schoolmaster was not.",
  },
};

export function DossierShell({ monster, locale = "en" }: { monster: Monster; locale?: Locale }) {
  const sceneBreak = SCENE_BREAKS[monster.slug];

  return (
    <main id="main" data-monster={monster.slug}>
      <DossierParticles slug={monster.slug} accent={monster.palette.accent} />
      <ChapterIndex locale={locale} />
      <IntroCard locale={locale} />

      <article className="dossier" aria-label={`The case of ${monster.name}`}>
        <Summoning monster={monster} locale={locale} />
        <CitationHeader monster={monster} />
        <Visage monster={monster} />
        <Legend paragraphs={monster.legend} locale={locale} />
        <Anxiety paragraphs={monster.anxiety} locale={locale} />
        {sceneBreak && <SceneBreak {...sceneBreak} />}
        <ClinicalNote note={monster.clinicalNote} locale={locale} />
        <DiagnosisCard diagnosis={monster.diagnosis} locale={locale} />
        <ExitLine locale={locale} />
      </article>

      <Colophon locale={locale} />

      <style>{`
        .dossier {
          max-width: 100%;
          padding: 0 1.25rem 6rem;
          margin: 0 auto;
        }
        .dossier > section:not(.dossier__hero):not(.dossier__visage),
        .dossier > .dossier__visage {
          max-width: 38rem;
          margin-left: auto;
          margin-right: auto;
        }
        .dossier > .dossier__hero {
          max-width: 100%;
        }
        .cos-particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }
        .cos-particles canvas {
          display: block;
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </main>
  );
}
