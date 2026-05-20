import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const theCreature: Monster = {
  status: "full",
  slug: "the-creature",
  name: "Frankenstein's Creature",
  epithet: "The Modern Prometheus",
  source: {
    title: "Frankenstein; or, The Modern Prometheus",
    author: "Mary Shelley",
    year: 1818,
  },
  sourceQuote: "Did I request thee, Maker, from my clay to mould me Man?",
  palette: {
    bg: "#0F1411",
    accent: "#4A5D3A",
    ink: "#E5DDC8",
    rule: "rgba(184, 212, 216, 0.22)",
  },
  typography: {
    display: "Cormorant Unicase",
    body: "EB Garamond",
    accent: "Special Elite",
  },
  legend: [
    "The subject — for so we are obliged to call him, the language of zoology being insufficient — was assembled by one Victor Frankenstein, a student of natural philosophy at Ingolstadt, from materials procured at charnel-houses and dissecting rooms across the Continent. He stood, by his maker's own admission, some eight feet in height; his complexion was a translucent yellow through which the workings of vessels could be discerned; his eyes were watery, of the same yellow as his skin, and — most distressingly — alert.",
    "He drew his first breath on a November night some time in the 1790s — Shelley's dates are deliberately ambiguous — and was, within the hour, abandoned. His maker fled the laboratory in a fit of revulsion at his own success. The infant, for he was no less than that, taught himself language by eavesdropping at the cottage of a blind man in the Alpine foothills; he taught himself the catechism of feeling by reading, of all things, Milton. He afterwards quoted Paradise Lost with the bitter precision of a man who has discovered that he is its true subject.",
    "He committed murders. We do not minimise this. He strangled a child; he strangled his maker's bride. He delivered, between these acts, some of the most lucid speeches in the English novel concerning the conditions under which a creature might be driven to such ends. The narrative closes in the Arctic, with his maker dead by exposure and the subject himself disappearing across the ice. He is, presumed by the public, deceased. We are not convinced.",
  ],
  anxiety: [
    "The Creature is the modern monster — which is to say, the made one. Where Dracula's horror arises from antiquity and contagion, Shelley's horror arises from authorship. The terror is no longer that an old evil persists, but that a new one can be invented in a single evening by a young man with sufficient stipend and insufficient supervision. Published in 1818 — at the threshold of the industrial century — the novel reads, to the clinician, as the first sustained meditation on the ethics of creation in an age that had begun to feel its creators ought to be regulated.",
    "And yet the Creature himself is not, in any usable sense, the monster of the book. The monster is his absence of a mother. He is articulate, well-read, and capable of love; he is also unaccompanied, untouched, and untaught in the ordinary registers of human kinship. The horror, on inspection, is not that he kills. It is that he asks, repeatedly and with grammatical perfection, to be held — and is refused.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the literary to the clinical, and find that Shelley — who could not have read the literature that her novel anticipates by 150 years — describes with extraordinary fidelity what John Bowlby and Mary Ainsworth would later name. The Creature is not, in the modern phrase, a textbook case of disorganised attachment. He is the case from which the textbook might have been written.",
    paragraphs: [
      {
        text: "Bowlby, in his 1969 monograph, advanced the proposition that the human infant is born into a behavioural system whose proper functioning depends upon a single, available, responsive caregiver — and that the disruption of this system in early life produces durable, sometimes lifelong, derangements of affect and conduct. The Creature, abandoned within hours of his animation by the only being whose responsiveness he could plausibly expect, presents the limiting case of this disruption: not insecure attachment, not avoidant attachment, but no attachment at all.",
        citations: [1],
      },
      {
        text: "Ainsworth, with her colleagues, devised in the late 1960s a laboratory procedure — the Strange Situation — in which infants are briefly separated from their caregivers and observed on reunion. The procedure yielded four classifications: secure, anxious-resistant, anxious-avoidant, and (in later work) disorganised. The disorganised pattern, in which the child both seeks and fears the caregiver, is reliably associated with maltreatment and parental withdrawal. The Creature, who pursues his maker across half a continent to plead for a companion and is met with promises that are broken at the moment of fulfilment, exhibits this pattern in literary form.",
        citations: [2],
      },
      {
        text: "Subsequent work, synthesised in Cassidy and Shaver's handbook, has extended attachment theory across the lifespan and across clinical populations. The findings are sobering: early disorganised attachment predicts, in adulthood, elevated rates of borderline personality presentation, of intimate-partner violence, of suicide, and — most relevant to our subject — of the conviction that the world owes one a debt of recognition which it can never adequately pay. The Creature articulates this conviction with such force that the reader, two centuries on, often catches himself agreeing.",
        citations: [3],
      },
      {
        text: "What Shelley grasped, before any of this had been measured, was the proper direction of moral attention. Victor is the patient of interest. The Creature is the symptom — articulate, dangerous, and, on the evidence of his speeches, redeemable. The violence is not the meaning of the case. The violence is what we observe when a creature, having waited long enough for tenderness, decides at last that he will be the one who acts.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.bowlby1969attachment,
      CITATIONS.ainsworth1978patterns,
      CITATIONS.cassidyShaver2016handbook,
    ],
  },
  diagnosis: {
    phenomenon: "Disorganised Attachment (with sequelae across the lifespan)",
    researcher: "John Bowlby; Mary D. S. Ainsworth",
    yearOfTheory: 1969,
    dsmStatus:
      "Not itself a DSM-5 diagnosis; an aetiological substrate for Reactive Attachment Disorder, Borderline Personality, and Complex PTSD.",
    furtherReading: [
      CITATIONS.bowlby1969attachment,
      CITATIONS.ainsworth1978patterns,
      CITATIONS.cassidyShaver2016handbook,
    ],
  },
  transition: "lightning-suture",
  audio: {
    ambient: "/audio/the-creature-ambient.opus",
    sfx: {
      hum: "/audio/electric-hum.webm",
      wind: "/audio/arctic-wind.webm",
    },
  },
  sigil: "/sigils/the-creature.webp",
};
