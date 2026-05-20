import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const hyde: Monster = {
  status: "full",
  slug: "hyde",
  name: "Mr. Edward Hyde",
  epithet: "The Other in the Mirror",
  source: {
    title: "Strange Case of Dr Jekyll and Mr Hyde",
    author: "Robert Louis Stevenson",
    year: 1886,
  },
  sourceQuote: "Man is not truly one, but truly two.",
  palette: {
    bg: "#13140E",
    accent: "#6B8E4E",
    ink: "#EDE6D3",
    rule: "rgba(122, 28, 28, 0.32)",
  },
  typography: {
    display: "Playfair Display",
    body: "Lora",
    accent: "IM Fell DW Pica",
  },
  legend: [
    "Dr. Henry Jekyll was, on every visible register, a model of the profession — a London physician of comfortable means, a fellow of his society, a man who dined with the right people and gave alms to the right charities. He was also, by his own subsequent admission, a man who had spent his adult life concealing certain appetites he considered incompatible with the comfortable means and the right people. He set out, in early middle age, to resolve this difficulty by chemical means; he largely succeeded.",
    "The compound, the formula for which Jekyll committed to no notebook and which the present author has been unable to reconstruct from the dregs found in his cabinet, produced a transient bodily and characterological transformation. Where Jekyll was tall, fair, and well-spoken, the figure who emerged was small, dark, and disagreeable in a way that bystanders found difficult to articulate. He called himself Mr. Edward Hyde. He took lodgings in Soho. He committed acts of cruelty for which Jekyll had previously lacked the courage, and at length the act of murder for which Jekyll had hitherto lacked the inclination — the trampling of a child in a courtyard, the bludgeoning of Sir Danvers Carew in the street.",
    "What had begun as a controlled chemistry became, by the autumn of 1886, an involuntary one. Hyde began to surface without provocation; Jekyll's compound, repeatedly applied, lost the power to reverse him. The body of Hyde — wearing Jekyll's borrowed clothes loosely, as one wears another man's coat — was found by Utterson, a friend and counsel, in Jekyll's locked laboratory. The confession was found in a drawer of the same room. We are advised by the deceased's executor to consider the two documents as a single statement.",
  ],
  anxiety: [
    "Hyde is the modern monster's domestic phase. He is not, as Dracula is, the alien who arrives on a ship; he is the gentleman who arrives in the gentleman's own dressing-room. Published in 1886 — at the height of the Whitechapel anxieties, at the dawn of forensic psychiatry, at the moment when the late Victorian public was beginning to suspect that respectable society contained more than respectability — Stevenson's novella reads, to the clinician, as the first English fable of the divided self that does not require possession or curse to explain itself.",
    "The horror, on inspection, is not chemistry. The chemistry merely uncovers. The horror is that Jekyll's confession reveals no surprise: he had known of Hyde, in some private register, all along. The potion was not the cause of him. It was the door.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the literary to the clinical, and find that Stevenson — writing in Edinburgh, in the same city where the medical literature on dissociation was just then taking shape — was working with materials remarkably close to the consulting-room. We must, however, distinguish with some care between the literary device he produced and the clinical condition it has, in the popular imagination, come to stand for.",
    paragraphs: [
      {
        text: "Pierre Janet, a French clinician contemporaneous with Stevenson, was at this same period describing — in case after carefully documented case — a phenomenon he termed dissociation: the splitting-off, under conditions of unbearable affect, of some portion of memory, identity, or volition from the rest of the personality. Janet held that the dissociated material did not cease to act; it acted in private, often at a remove of years, sometimes as a fully constituted second self.",
        citations: [1],
      },
      {
        text: "Gish, writing in the International Journal of Scottish Literature, has documented the closeness with which Stevenson's narrative tracks Janet's theory — closer than Stevenson, who is not known to have read the French literature directly, can plausibly have intended. The case histories Janet was then publishing read, in places, almost as redactions of Stevenson's novella: a respectable subject, an alternate persona of opposite temperament, periods of mutual ignorance, eventual loss of voluntary control. The convergence is the kind of independent discovery one encounters in physics. It should not surprise us in psychology either.",
        citations: [2],
      },
      {
        text: "And yet — and here we must be careful — the modern clinical literature is unequivocal that the picture Stevenson drew is not, in its mechanics, a portrait of Dissociative Identity Disorder as that condition is now constituted in the DSM-5. The clinical disorder, as set out by Spiegel and colleagues in their 2011 review, is characterised by disruptions of identity, memory, and consciousness arising overwhelmingly from severe and prolonged childhood trauma; it is not produced by chemistry, does not present with morphological change, and is not, in the vast majority of cases, accompanied by violence toward others. The Hyde-pattern — the malevolent alter, the chemical induction, the externally visible monstrosity — is, in clinical reality, vanishingly rare and almost entirely a literary inheritance.",
        citations: [3],
      },
      {
        text: "It is the duty of the alienist who deploys this novella as a pedagogical instrument to make the distinction plainly. What Stevenson described is real: the divided self, the disowned appetite, the door in the consulting room behind which something lives. What he did not describe — and what the popular reading of his book has done immense harm by attributing to his patients — is a class of people who are, by virtue of their diagnosis, predisposed to murder. The murderer in the case was Jekyll. We should be slow to forget that.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.janet1907hysteria,
      CITATIONS.gish2007jekyllHyde,
      CITATIONS.spiegel2011dissociative,
    ],
  },
  diagnosis: {
    phenomenon: "Dissociation (Janetian); Dissociative Identity Disorder (clinical)",
    researcher: "Pierre Janet; David Spiegel et al.",
    yearOfTheory: 1889,
    dsmStatus:
      "Dissociative Identity Disorder is classified in DSM-5 (300.14); aetiology is overwhelmingly severe childhood trauma, not chemical induction, and prevalence of inter-identity violence is low.",
    furtherReading: [
      CITATIONS.janet1907hysteria,
      CITATIONS.gish2007jekyllHyde,
      CITATIONS.spiegel2011dissociative,
    ],
  },
  transition: "chemical-morph",
  audio: {
    ambient: "/audio/hyde-ambient.opus",
    sfx: {
      bubbling: "/audio/chemistry-bubble.webm",
      heartbeat: "/audio/heartbeat-doubled.webm",
    },
  },
  sigil: "/sigils/hyde.webp",
};
