import Image from "next/image";
import type { Monster } from "@/lib/data/types";

const VISAGES: Record<string, { src: string; alt: string; width: number; height: number; caption: string }> = {
  dracula: {
    src: "/illustrations/dracula/visage.webp",
    alt: "A pale Victorian nobleman in immaculate black evening dress and a fur-trimmed cape, seated in a candlelit baroque chamber. An oil painting hangs behind him in the gloom.",
    width: 832,
    height: 1152,
    caption: "The patient at first sitting. Note the composure; note the absence of any reflection in the candle-glass behind him.",
  },
  "the-creature": {
    src: "/illustrations/the-creature/visage.webp",
    alt: "A tall sorrowful figure wrapped in a tattered hooded cloak, seated in an arctic ice cave under pale blue light. The face is gaunt and the eyes are alert and grieving.",
    width: 832,
    height: 1152,
    caption: "The subject at his preferred sitting place. He has chosen the cold deliberately; he says it resembles the welcome he received.",
  },
  hyde: {
    src: "/illustrations/hyde/visage.webp",
    alt: "A wiry Victorian gentleman in a tall silk top hat and long dark coat, holding a glass vial of luminous green liquid, walking down a gaslit cobblestone London alley at night.",
    width: 832,
    height: 1152,
    caption: "The subject in his preferred presentation. The compound is in his right hand; the smile is by no means the worst thing about him.",
  },
  "the-wolf": {
    src: "/illustrations/the-wolf/visage.webp",
    alt: "A tall gaunt figure in a ragged dark cloak standing alone in a moonlit forest clearing. Sunken eyes, faintly lupine features, long clawed fingers, the full moon directly behind his head as a corona.",
    width: 896,
    height: 1280,
    caption: "The subject at the moment of his preferred discomposure. He has not yet, by his own description, fully arrived.",
  },
  griffin: {
    src: "/illustrations/griffin/visage.webp",
    alt: "A tall figure entirely concealed by a long dark Victorian coat, wide-brimmed hat, and round dark spectacles, walking a snowy English village lane at dusk. No visible skin.",
    width: 896,
    height: 1280,
    caption: "The subject in his preferred presentation. The presentation is, on close inspection, all there is.",
  },
  carmilla: {
    src: "/illustrations/carmilla/visage.webp",
    alt: "A young noblewoman in dark velvet 1870s dress seated in an ornate baroque drawing room, a black cat at her feet, candlelight from a tall arched window.",
    width: 896,
    height: 1280,
    caption: "The subject at the schloss in Styria. She does not, the household reports, sleep in the customary hours.",
  },
  erik: {
    src: "/illustrations/erik/visage.webp",
    alt: "A solemn figure in formal 19th century evening wear and a long black opera cloak, wearing a gilded half-mask, seated reading by candlelight in a baroque underground chamber.",
    width: 896,
    height: 1280,
    caption: "The subject in his apartment beneath the Opera. The mask, he is clear, is for our comfort rather than for his.",
  },
  dorian: {
    src: "/illustrations/dorian/visage.webp",
    alt: "An elegant young aristocrat in immaculate white tie and tails, standing in an opulent 1890 London drawing room before a vast gilt-framed portrait of himself.",
    width: 896,
    height: 1280,
    caption: "The subject in the drawing room he has been receiving in since 1881. The portrait, the present author can confirm, is upstairs.",
  },
  varney: {
    src: "/illustrations/varney/visage.webp",
    alt: "A gaunt tall English gentleman of indeterminate age in shabby black 1840 frock coat, standing in pouring rain on a desolate Yorkshire moor at midnight, lightning behind him.",
    width: 896,
    height: 1280,
    caption: "The subject between numbers. The expression, the present author has been instructed by his publisher, sold the serial.",
  },
  sweeney: {
    src: "/illustrations/sweeney/visage.webp",
    alt: "A haunted middle-aged 1840 London barber in a stained white apron over dark wool, holding an open straight razor in a gaslit Fleet Street barber shop.",
    width: 896,
    height: 1280,
    caption: "The subject in the chair he built. The expression is resignation; the razor, by his own design, retracts.",
  },
  jack: {
    src: "/illustrations/jack/visage.webp",
    alt: "A tall lean figure in black acrobat costume and a tall stovepipe hat, breathing blue flame, mid-leap clearing a Victorian London terrace gable at night.",
    width: 896,
    height: 1280,
    caption: "The subject as the broadsheets had him by March of 1838. The subject of January, by all reliable evidence, was on foot.",
  },
  golem: {
    src: "/illustrations/golem/visage.webp",
    alt: "A tall humanoid figure made of grey-ochre clay, plain unsculpted features, three Hebrew letters glowing faintly on his forehead, standing patiently in a narrow medieval Prague alley at night.",
    width: 896,
    height: 1280,
    caption: "The subject in the courtyard of the Rabbi's household. He has been instructed to wait. He is doing so.",
  },
  horseman: {
    src: "/illustrations/horseman/visage.webp",
    alt: "A tall imposing rider in 18th century Hessian green uniform mid-canter on a massive black warhorse, no head above the high collar, carrying a glowing jack-o-lantern under one arm.",
    width: 896,
    height: 1280,
    caption: "The subject on the road south of the burying-ground. The pumpkin, the country folk insist, is not his usual choice.",
  },
};

export function Visage({ monster }: { monster: Monster }) {
  const visage = VISAGES[monster.slug];

  if (!visage) {
    return (
      <section aria-label="The Visage" className="dossier__visage">
        <div
          role="img"
          aria-label={`A placeholder portrait of ${monster.name}; a true visage is to come.`}
          className="visage visage--placeholder"
        >
          <div
            className="visage__sigil"
            style={{ backgroundImage: `url(${monster.sigil})` }}
          />
        </div>
        <p className="visage__note">— placeholder visage; engraving to follow —</p>
        <style>{visageStyles}</style>
      </section>
    );
  }

  return (
    <section aria-label="The Visage" className="dossier__visage">
      <figure className="visage">
        <Image
          src={visage.src}
          alt={visage.alt}
          width={visage.width}
          height={visage.height}
          loading="lazy"
          sizes="(max-width: 600px) 88vw, 28rem"
          className="visage__image"
        />
        <figcaption className="visage__caption">{visage.caption}</figcaption>
      </figure>
      <style>{visageStyles}</style>
    </section>
  );
}

const visageStyles = `
  .dossier__visage {
    margin: 5rem auto;
    display: grid;
    gap: 1rem;
  }
  .visage {
    margin: 0 auto;
    max-width: 28rem;
    border: 1px solid var(--color-rule);
    padding: 0.6rem 0.6rem 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.45));
    box-shadow: 0 18px 60px -25px rgba(0, 0, 0, 0.95), 0 0 80px -30px var(--color-accent);
  }
  .visage--placeholder {
    aspect-ratio: 3 / 4;
    display: grid;
    place-items: center;
    background:
      radial-gradient(ellipse 60% 50% at 50% 30%, var(--color-accent), transparent 70%),
      radial-gradient(ellipse 70% 70% at 50% 70%, rgba(0,0,0,0.6), transparent 70%),
      var(--color-bg);
  }
  .visage__sigil {
    width: 55%;
    aspect-ratio: 1 / 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    mix-blend-mode: screen;
    opacity: 0.7;
  }
  .visage__image {
    width: 100%;
    height: auto;
    display: block;
    filter: contrast(1.05) saturate(0.88);
  }
  .visage__caption {
    padding: 0.85rem 0.4rem 0.7rem;
    font-family: var(--font-accent, var(--font-body));
    font-style: italic;
    font-size: 0.86rem;
    line-height: 1.4;
    text-align: center;
    opacity: 0.78;
    border-top: 1px solid var(--color-rule);
    margin-top: 0.6rem;
  }
  .visage__note {
    text-align: center;
    font-family: var(--font-accent, var(--font-body));
    font-style: italic;
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: lowercase;
    opacity: 0.55;
  }
`;
