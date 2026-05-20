import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const dracula: Monster = {
  status: "full",
  slug: "dracula",
  name: "Count Dracula",
  epithet: "The Count of Transylvania",
  source: {
    title: "Dracula",
    author: "Bram Stoker",
    year: 1897,
  },
  sourceQuote: "Listen to them — the children of the night. What music they make.",
  palette: {
    bg: "#0B0608",
    accent: "#5C0A0A",
    ink: "#E8DCC4",
    rule: "rgba(212, 165, 116, 0.25)",
  },
  typography: {
    display: "UnifrakturMaguntia",
    body: "EB Garamond",
    accent: "Cormorant Garamond",
  },
  legend: [
    "The Count arrives in London not as a beast but as a gentleman of property. His trunks of Transylvanian earth are distributed across the boroughs with the patience of a man who intends to remain. He is courteous in his correspondence, immaculate in his estate dealings, and entirely unremarkable to the young solicitor dispatched to attend him — until that solicitor, one Jonathan Harker, observes that his host casts no reflection in the looking-glass and scales the castle wall like a lizard descending a tomb.",
    "What follows is less a hunt than a slow contagion. Lucy Westenra, a young woman of unimpeachable circumstance, sickens by degrees that confound her physicians; her transformation is charted in clinical detail by Dr. Seward, whose phonographic diary the present author has consulted at length. Mina Harker, learned and steady, becomes by turns the Count's intended victim and the intellectual engine of his pursuers — a duality the narrative never quite resolves, and which we suspect Stoker himself did not fully understand he had written.",
    "The novel closes with the Count's destruction upon the threshold of his own keep, dispatched by a confederation of Englishmen, an American, and a Dutch physician. The reader is meant to feel relief. The reader, in our experience, does not.",
  ],
  anxiety: [
    "Dracula is the foreign body made literal. He arrives by ship from the East, purchases English soil, and converts English women into creatures who can no longer be received in English drawing rooms. Published in 1897 — at the peak of imperial Britain's anxieties about reverse colonisation, Jewish migration from the Pale, and the so-called New Woman — the novel reads, to the clinician, as a near-perfect record of a culture rehearsing its fear of dissolution from within.",
    "The horror, crucially, is not that the Count is monstrous. It is that he passes. He signs leases. He speaks the language. He is, until the precise moment he is not, indistinguishable from the men who hunt him. This — and not the fangs — is what kept Stoker's readers awake.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the literary to the clinical, and find that Stoker's Count, for all his theatrical apparatus of fang and cape, is a remarkably precise instrument for measuring a specific kind of dread — the dread of the familiar revealed as alien, which Freud was shortly to name and which a century of subsequent research has refused to let rest.",
    paragraphs: [
      {
        text: "In his 1919 essay Das Unheimliche, Freud proposed that the most acute form of fright is not provoked by the wholly unknown but by the formerly intimate returning in distorted guise — the home (heimlich) become unhomely (unheimlich). Dracula operationalises this thesis with uncommon fidelity: the bedroom, the bridegroom, the trusted friend's neck — each a site of domestic safety overwritten by predatory intent.",
        citations: [1],
      },
      {
        text: "More recent work in evolutionary and cultural psychology has reframed the uncanny as a biocultural phenomenon rather than a purely psychoanalytic one. Clasen, in a synthesis published in the Review of General Psychology, argues that monsters persist across cultures precisely because they exploit ancestral threat-detection systems — predator, contagion, conspecific deception — and that the literary monster is best understood as a deliberately engineered stimulus for these systems.",
        citations: [2],
      },
      {
        text: "Read through both lenses, the xenophobic charge of Stoker's novel becomes legible as a specific cognitive manoeuvre: the displacement of in-group anxieties onto a figure who is sufficiently human to be plausible and sufficiently other to be dispatched without remorse. We may name this manoeuvre xenophobic projection. Its literary form is the vampire; its psychological substrate is the same machinery that, in less ornamented form, organises pogroms, immigration panics, and the quiet cruelties of the suburb.",
        citations: [1, 2],
      },
      {
        text: "It is worth noting, in fairness to the discipline, that neither Freud's construct nor Clasen's framework appears in the Diagnostic and Statistical Manual. The uncanny is not a disorder. It is, rather, the substrate from which certain disorders — paranoid ideation, xenophobic delusion, the more florid presentations of social anxiety — draw their grammar.",
        citations: [],
      },
    ],
    citations: [CITATIONS.freud1919unheimliche, CITATIONS.clasen2012monsters],
  },
  diagnosis: {
    phenomenon: "Xenophobic Projection (the Unheimliche, biocultural reading)",
    researcher: "Sigmund Freud; Mathias Clasen",
    yearOfTheory: 1919,
    dsmStatus: "Not classified; substrate phenomenon underlying paranoid and xenophobic presentations.",
    furtherReading: [CITATIONS.freud1919unheimliche, CITATIONS.clasen2012monsters],
  },
  transition: "bat-swarm",
  sigil: "/sigils/dracula.webp",
};
