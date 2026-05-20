import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const golem: Monster = {
  status: "full",
  slug: "golem",
  name: "The Golem of Prague",
  epithet: "אמת — מת",
  source: {
    title: "The Golem (Niflaot Maharal, collected legends)",
    author: "Yudl Rosenberg (compiler)",
    year: 1909,
  },
  sourceQuote: "He shaped him from clay, and on his forehead wrote truth.",
  palette: {
    bg: "#1A1610",
    accent: "#9C7B4A",
    ink: "#E8DCC4",
    rule: "rgba(42, 42, 92, 0.4)",
  },
  typography: {
    display: "Frank Ruhl Libre",
    body: "Cardo",
    accent: "Frank Ruhl Libre",
  },
  legend: [
    "The story collected by Yudl Rosenberg in 1909, and presented by him with the not-implausible attribution to the seventeenth-century writings of Rabbi Yehuda Loew ben Bezalel of Prague — the Maharal — is one of the most stable folk narratives in the European canon, and the present author has confined himself to its broad architecture. In a year of blood libels and pogroms in the Bohemian capital, the Rabbi went down to the banks of the Vltava with two companions; he shaped from the clay of the bank a figure of human form some seven feet in height; he completed the figure by inscribing on its forehead the letters אמת — the Hebrew word for truth.",
    "The figure rose. He had no name; the family called him Yossele, the Mute. He was placed in the Rabbi's household where he performed the heavier work — drawing water, sweeping the courtyard, occasionally patrolling the gates of the ghetto on nights when the streets were dangerous. He did not speak; he did not eat; he did not sleep. He took instruction precisely and to the letter, with the consequences that follow when instructions are taken to the letter.",
    "The case closed in one of two ways, depending on the recension. In the version Rosenberg printed, the Rabbi removed the aleph — the first letter — from the figure's forehead, transforming אמת (truth) into מת (he is dead), and the figure returned to clay; the clay was placed in the attic of the Altneuschul synagogue, where the present author has been told, by persons in a position to know, that some quantity of it remains. In an alternative version the figure exceeded his instructions, attacked his maker's family, and was destroyed in self-defence on a Friday afternoon as the Sabbath came in. Both versions are present in the literature. Both versions are concerned with the same question, which is what we shall examine.",
  ],
  anxiety: [
    "The Golem is the made monster. Where Frankenstein's Creature is the case in which the maker abandons his creation, the Golem is the case in which the maker keeps his creation and the creation does what he asked. The horror, on inspection, is not what the Golem becomes when he gets free of instruction. The horror is what he becomes when he follows instruction exactly. The Maharal does not get to claim — as Victor Frankenstein claimed — that he could not have anticipated the consequences. The Maharal said the words. The Maharal saw the figure rise. The Maharal handed him the broom.",
    "The cultural anxiety on which the legend has run for four hundred years is therefore the same anxiety that runs through current debates about systems that follow instructions reliably and do not have the property of asking whether the instruction should have been given.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the synagogue attic to the consulting room. The Golem admits of two distinct readings — a Jungian one concerning the projection of disowned material, and a social-psychological one concerning the Pygmalion effect — and we shall consider both, in the order in which they apply to the case.",
    paragraphs: [
      {
        text: "Jung, in his late work Aion, set out the proposition that every functioning personality contains, in unconscious complement, a structure he called the Shadow: the constellation of disowned, unintegrated, or refused material that the conscious personality cannot acknowledge as its own. The Shadow does not, on Jung's account, simply lie dormant. It seeks expression, and where direct expression is forbidden it expresses itself by projection — that is, by being perceived as a property of someone or something else. The Golem narrative is, on a Jungian reading, the perfect literary form for this mechanism: the Rabbi takes from the clay of the river the violence and the labour his community requires and his role forbids, and gives them an external body to perform.",
        citations: [1],
      },
      {
        text: "Rosenthal and Jacobson, in their 1968 study Pygmalion in the Classroom — performed in a San Francisco elementary school and reported with the full statistical apparatus of the period — demonstrated that teachers told at random that certain pupils had been identified by a test as late bloomers proceeded over the subsequent year to elicit measurably higher academic performance from those pupils than from their unflagged peers, in the absence of any actual difference between them. The maker's expectation, in their finding, became the made thing. The Pygmalion effect has since been replicated across classrooms, workplaces, hospitals, and parenting studies. What we expect from those we have shaped is what we get from them, by mechanisms that do not require either party to be conscious of the process.",
        citations: [2],
      },
      {
        text: "The synthesis the Golem narrative offers — and that the present author considers more honest than either of its two endings — is that the maker is responsible for both the instruction and the predictable failure modes of the instructed. The Rabbi shaped Yossele, the Mute, and required of him the work the community needed done. When the community no longer needed the work, the Rabbi removed the letter and returned him to clay. The legend does not, in either recension, ask what Yossele wanted. The legend is not, on this reading, about the dangers of creating servants who become uncontrollable. The legend is about the older and harder question of what one owes a servant one created on purpose. The Rabbi, on the printed evidence, owed him at least the aleph back.",
        citations: [1, 2],
      },
      {
        text: "We mention this with no theological position. The dossier of the Golem is, in the present author's view, the dossier in this volume that has aged most usefully into the present century — for reasons the reader is welcome to supply, and that we shall decline, on the grounds of brevity, to elaborate.",
        citations: [],
      },
    ],
    citations: [
      CITATIONS.jung1959aion,
      CITATIONS.rosenthalJacobson1968pygmalion,
    ],
  },
  diagnosis: {
    phenomenon: "Shadow Projection (Jung); Pygmalion Expectancy (Rosenthal & Jacobson)",
    researcher: "Carl Gustav Jung; Robert Rosenthal & Lenore Jacobson",
    yearOfTheory: 1959,
    dsmStatus:
      "Not classified. Foundational constructs in depth psychology and educational/social psychology respectively, central to the modern understanding of expectancy effects, self-fulfilling prophecy, and projective identification.",
    furtherReading: [
      CITATIONS.jung1959aion,
      CITATIONS.rosenthalJacobson1968pygmalion,
    ],
  },
  transition: "clay-dust",
  audio: {
    ambient: "/audio/golem-ambient.opus",
    sfx: {
      cantor: "/audio/cantor-humming.webm",
      wheel: "/audio/potters-wheel.webm",
    },
  },
  sigil: "/sigils/golem.webp",
};
