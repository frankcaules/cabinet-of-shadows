import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const carmilla: Monster = {
  status: "full",
  slug: "carmilla",
  name: "Carmilla",
  epithet: "The Styrian Countess",
  source: {
    title: "Carmilla",
    author: "Joseph Sheridan Le Fanu",
    year: 1872,
  },
  sourceQuote: "You are mine, you shall be mine, and we are one for ever.",
  palette: {
    bg: "#0D0510",
    accent: "#B58AB0",
    ink: "#DDD3E8",
    rule: "rgba(180, 130, 175, 0.25)",
  },
  typography: {
    display: "Italiana",
    body: "Cormorant Garamond",
    accent: "Pinyon Script",
  },
  legend: [
    "The case opens at a schloss in Styria, somewhere east of Gratz, where a retired English diplomat and his daughter Laura keep an isolated and undisturbed household. A carriage overturns on the road below; from it emerges a young woman, beautiful, languid, of unknown family, whose mother begs the daughter be lodged at the schloss for the interval of an urgent journey. The mother does not return. The young woman, called Carmilla, takes up residence and Laura's attention with equal grace.",
    "Carmilla rises late, declines daylight, refuses prayer, and weeps without apparent provocation. She speaks to Laura at night with an intimacy that Laura's narrative — which the present author has consulted in the original 1872 publication — describes as 'embarrassing' and which the narrative cannot, for reasons we shall come to, name more directly. Laura begins to dream of a great cat that lies upon her chest; she develops anaemia; her servants observe that the locked door of her bedroom is found unlocked at dawn.",
    "The intervention comes through General Spielsdorf, who has lost a niece to identical symptoms in identical circumstances. The two of them, with a forester and a priest, trace Carmilla to the tomb of the Countess Mircalla Karnstein, deceased 1698. The body in the coffin is in perfect condition and floating in eight inches of blood. The procedures of the time are observed. Laura's narrative closes with the admission that she still dreams, sometimes, of the drawing-room and the languid step on the stair.",
  ],
  anxiety: [
    "Carmilla precedes Dracula by twenty-five years and rewards close reading for the same reasons. Where Stoker's novel is a procedural about the destruction of the foreign predator, Le Fanu's is something closer to a love story that cannot, by the conventions of its decade, declare itself one. The horror is generated less by the bite than by the surrounding emotional register: Laura's attraction to Carmilla, her shame at the attraction, her relief when the case is closed, her dream of the drawing-room. The reader is told, repeatedly, that something terrible has happened. The reader can feel that something else, also, has happened.",
    "The 1872 horror is the impossibility of the friendship. The 2026 reading, which the present author shares, is that the impossibility is the horror — that the predator was assembled, by the writer and the era jointly, out of what could not otherwise have been written down.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the schloss to the consulting room, and find that the clinical literature has, since Freud, treated repression as a respectable mechanism rather than a moral failing. Carmilla offers an unusually clean case study of how a culture's prohibitions on a particular kind of desire produce, in its literature, a particular kind of monster.",
    paragraphs: [
      {
        text: "Freud, in his 1915 paper 'Repression' for the Standard Edition, set out the proposition that the mind defends itself against an unacceptable wish not by destroying the wish but by denying it admission to consciousness. The energy of the wish does not dissipate; it returns, displaced, in dreams, in symptoms, and — most relevant to our subject — in the dreams the patient is willing to publish. The literary monster is, by this account, a returning repressed wish in costume; the costume is whatever the culture will tolerate at the news-stand.",
        citations: [1],
      },
      {
        text: "Showalter, in her cultural-historical study Sexual Anarchy, situated Carmilla precisely in the literature of the fin de siècle in which female homosexual desire could be represented in print only if it was simultaneously the symptom of demonic possession and the means of the heroine's eventual rescue. The figure of the female vampire — beautiful, ineligible, dispatched by male intervention — recurs across the period because it is, as Showalter demonstrated, the only narrative shape in which the desire could be both written and condemned in the same paragraph.",
        citations: [2],
      },
      {
        text: "Meyer, in his 2003 review for Psychological Bulletin, advanced the now-foundational concept of minority stress: the constellation of distal and proximal stressors — external prejudice, internalised stigma, expectation of rejection — that accumulate over a lifetime in members of stigmatised sexual minorities, and that account for elevated rates of mood disorder, anxiety, and substance use in those populations. Read with Meyer in hand, Laura's symptoms — the dreams, the languor, the unresolved bereavement, the inability to name her attachment — are not the marks of vampiric predation. They are the marks of a young woman in 1872 who has fallen in love with another young woman and possesses no language in which to do so.",
        citations: [3],
      },
      {
        text: "The proper diagnosis, in our view, is therefore not Carmilla's. It is the schloss's. The dossier reads, on second pass, as the record of a culture that produced a monster because it required one. The treatment, where this configuration is encountered in modern practice, is not the priest and the forester. It is the abandonment of the premise that the love is the problem.",
        citations: [2, 3],
      },
    ],
    citations: [
      CITATIONS.freud1915repression,
      CITATIONS.showalter1990sexualAnarchy,
      CITATIONS.meyer2003minorityStress,
    ],
  },
  diagnosis: {
    phenomenon: "Repression and Minority Stress (the cultural production of monstrosity)",
    researcher: "Sigmund Freud; Elaine Showalter; Ilan H. Meyer",
    yearOfTheory: 1915,
    dsmStatus:
      "Repression is not a DSM-5 diagnosis but is a recognised mechanism in psychodynamic formulation; minority stress is the aetiological framework for elevated rates of affective and anxiety disorders in stigmatised sexual minorities (DSM-5 considers no homosexuality a disorder; the diagnoses are those of the surrounding stressors).",
    furtherReading: [
      CITATIONS.freud1915repression,
      CITATIONS.showalter1990sexualAnarchy,
      CITATIONS.meyer2003minorityStress,
    ],
  },
  transition: "silk-curtain",
  sigil: "/sigils/carmilla.webp",
};
