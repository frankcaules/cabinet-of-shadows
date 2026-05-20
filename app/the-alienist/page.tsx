import type { Metadata } from "next";
import Link from "next/link";
import { FULL_MONSTERS } from "@/lib/data/monsters";

export const metadata: Metadata = {
  title: "The Alienist — The Cabinet of Shadows",
  description:
    "On the alienist whose casebook this is, on the curious archive he collected, and on the question of why his patients are figures of fiction.",
};

const PATIENTS_BY_DECADE: Record<string, string[]> = {
  "1810s–1820s": ["the-creature", "horseman"],
  "1830s–1840s": ["jack", "sweeney", "varney"],
  "1860s–1870s": ["the-wolf", "carmilla"],
  "1880s–1890s": ["hyde", "dorian", "dracula", "griffin"],
  "1900s–1910s": ["erik", "golem"],
};

export default function AlienistPage() {
  return (
    <main id="main" className="alienist">
      <header className="alienist__header">
        <p className="alienist__eyebrow">A note from the editor</p>
        <h1 className="alienist__title">On the Alienist</h1>
        <p className="alienist__return">
          <Link href="/">← back to the Cabinet</Link>
        </p>
      </header>

      <section className="alienist__prose">
        <p>
          The documents collected in this Cabinet are presented to the modern reader as if from the
          private notebooks of an unnamed Victorian alienist — that elegant nineteenth-century word
          for a doctor of the mind, predating <em>psychiatrist</em> by several decades and carrying
          its own particular flavour: a clinician who treats those who have become, by some
          inscrutable process, foreign to themselves.
        </p>
        <p>
          The alienist is a fiction. The cases are not.
        </p>
        <p>
          By this we mean: the alienist himself — his consulting room, his hand-bound casebook, his
          arch and self-aware narrative voice — is an editorial conceit invented to do a particular
          job, which is to bind together thirteen disparate monsters of Gothic literature inside a
          single coherent frame. The monsters are literary; the alienist who treats them is, on the
          plain evidence, an impossibility. He could not have read Freud in 1819, when his casebook
          accepts Frankenstein's Creature; he could not have read Bowlby in 1865, when he is
          ostensibly receiving Sabine Baring-Gould; he could not have read Spiegel and Loewenstein
          in 1886, when Stevenson sends him Mr. Hyde. His chronology is bad. His chronology is
          deliberately bad. The point of the chronology is to allow him to bring the modern
          clinical literature to bear on cases the period itself could not have correctly read.
        </p>
        <p>
          The clinical literature, by contrast, is real. Every paper the alienist cites in his
          margin notes is a real peer-reviewed paper, indexed and retrievable; the bibliography is
          on the <Link href="/sources">/sources</Link> page of this same Cabinet; the DOIs are
          live. Where the alienist offers a synthesis — that the Creature is a case study in
          disorganised attachment, that the Werewolf maps to documented clinical lycanthropy, that
          Spring-Heeled Jack is a print-era instance of mass sociogenic illness — these are not
          the alienist's idiosyncratic readings. They are positions taken in the actual literature
          on those works, by clinicians and humanities scholars whose names appear in the
          references.
        </p>
        <p>
          The thirteen cases sit across roughly a century of Gothic publication. Read in the order
          their patients arrived, the casebook is arranged thus:
        </p>
      </section>

      <section className="alienist__schedule" aria-label="Schedule of admissions">
        <ol>
          {Object.entries(PATIENTS_BY_DECADE).map(([decade, slugs]) => (
            <li key={decade}>
              <span className="alienist__decade">{decade}</span>
              <span className="alienist__patients">
                {slugs.map((s, i) => {
                  const m = FULL_MONSTERS[s];
                  if (!m) return null;
                  return (
                    <span key={s}>
                      <Link href={`/dossier/${s}`}>{m.name}</Link>
                      {i < slugs.length - 1 ? " · " : ""}
                    </span>
                  );
                })}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="alienist__prose">
        <h2 className="alienist__h2">On the choice of voice</h2>
        <p>
          We considered, in early drafts, presenting these materials as a contemporary essay — a
          plain modern voice walking the reader through the literature monster by monster. We
          rejected this for two reasons.
        </p>
        <p>
          The first is that the literature is much more interesting than the essay form makes it
          look. The disorganised-attachment reading of the Creature is, in the original Bowlby and
          Ainsworth, a thrilling piece of work; the clinical-lycanthropy review by Blom is, in its
          systematic survey of thirteen real cases, an act of considerable scholarly nerve; the
          Jonason et al. paper on Dorian Gray is so cleanly stated that one suspects its authors of
          having had fun. To present them in a flattened modern register is to lose what makes them
          worth reading at all.
        </p>
        <p>
          The second is that the alienist's voice — measured, faintly self-amused, never afraid of
          a Latinate verb when an Anglo-Saxon one will not do the work — gives the reader
          permission to take the cases seriously without taking the apparatus seriously. The
          Cabinet is a serious science-communication project that happens to be wearing a velvet
          coat. The coat is there because, in our experience, readers will follow a man in a
          velvet coat into the bibliography rather more readily than they will follow a man in a
          lab coat.
        </p>
        <h2 className="alienist__h2">On what is and is not the alienist's opinion</h2>
        <p>
          The alienist speaks, on each dossier, with the air of a clinician closing a file. He
          says what the literature says. Where he editorialises — for instance, in his insistence
          that the Creature's violence is the absence rather than the meaning of the case, or in
          his discomfort with the romance reading of the Phantom — the editorial position is one
          we, the present authors, are willing to defend. Where he declines to editorialise — for
          instance, on the question of whether the Headless Horseman literally rides — he is
          declining for our reasons too. We are happy to leave that question with the country folk
          to whom it belongs.
        </p>
        <p>
          A reader who wishes to verify any clinical claim made in any dossier should follow the
          superscript numerals to the citations at the foot of the section, or consult the
          <Link href="/sources"> bibliography</Link>, which is comprehensive.
        </p>
        <h2 className="alienist__h2">A request</h2>
        <p>
          If you finish a dossier and feel the urge to pick up the original novel afterwards, the
          casebook has done what it set out to do. We did not make this Cabinet to replace the
          Gothic tradition with its clinical reading; we made it to suggest that the clinical
          reading is, in many cases, what the tradition was already telling us, in the only voice
          it had available.
        </p>
        <p className="alienist__sig">— the Editors, 2026</p>
      </section>

      <footer className="alienist__footer">
        <p>
          <Link href="/">Return to the Cabinet →</Link>
        </p>
      </footer>

      <style>{`
        .alienist {
          --measure: 38rem;
          max-width: 100%;
          padding: 5rem 1.5rem 6rem;
          margin: 0 auto;
        }
        .alienist__header,
        .alienist__prose,
        .alienist__schedule,
        .alienist__footer {
          max-width: var(--measure);
          margin: 0 auto;
        }
        .alienist__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          opacity: 0.7;
          color: var(--color-cabinet-accent);
          margin: 0;
        }
        .alienist__title {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(2.5rem, 4vw + 1rem, 4rem);
          line-height: 1.05;
          margin: 0.4rem 0 1.25rem;
        }
        .alienist__return {
          margin: 1.5rem 0 0;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .alienist__return a { text-decoration: none; }
        .alienist__return a:hover { text-decoration: underline; }

        .alienist__prose {
          margin: 3rem auto 0;
        }
        .alienist__prose p {
          font-family: var(--font-body-default);
          font-size: 1.05rem;
          line-height: 1.7;
          text-align: justify;
          hyphens: auto;
          margin: 0 0 1.15rem;
        }
        .alienist__prose p:first-of-type::first-letter {
          font-family: var(--font-display-default);
          font-size: 3.4em;
          float: left;
          line-height: 0.88;
          margin: 0.05em 0.18em 0 0;
          color: var(--color-cabinet-accent);
        }
        .alienist__h2 {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(1.4rem, 1.5vw + 1rem, 1.8rem);
          margin: 2.5rem 0 0.9rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-cabinet-rule);
        }
        .alienist__sig {
          font-style: italic;
          opacity: 0.7;
          margin-top: 2rem;
        }

        .alienist__schedule {
          margin: 2.5rem auto;
          padding: 1.5rem 0;
          border-top: 1px solid var(--color-cabinet-rule);
          border-bottom: 1px solid var(--color-cabinet-rule);
        }
        .alienist__schedule ol {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.85rem;
        }
        .alienist__schedule li {
          display: grid;
          grid-template-columns: 9rem 1fr;
          gap: 1rem;
          align-items: baseline;
        }
        @media (max-width: 540px) {
          .alienist__schedule li { grid-template-columns: 1fr; gap: 0.25rem; }
        }
        .alienist__decade {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-cabinet-accent);
          opacity: 0.85;
        }
        .alienist__patients {
          font-family: var(--font-body-default);
          font-size: 1rem;
          line-height: 1.55;
        }
        .alienist__patients a {
          color: var(--color-cabinet-ink);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 180ms ease;
        }
        .alienist__patients a:hover,
        .alienist__patients a:focus-visible {
          border-bottom-color: var(--color-cabinet-accent);
        }

        .alienist__footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-cabinet-rule);
          text-align: center;
        }
        .alienist__footer a {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
      `}</style>
    </main>
  );
}
