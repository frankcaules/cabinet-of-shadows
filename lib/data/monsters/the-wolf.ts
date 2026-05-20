import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const theWolf: Monster = {
  status: "full",
  slug: "the-wolf",
  name: "The Werewolf",
  epithet: "The Beast at the Threshold",
  source: {
    title: "The Book of Were-Wolves",
    author: "Sabine Baring-Gould",
    year: 1865,
  },
  sourceQuote: "I am no longer entirely myself by night.",
  palette: {
    bg: "#10140C",
    accent: "#7C6CA8",
    ink: "#E2DCC8",
    rule: "rgba(217, 217, 217, 0.22)",
  },
  typography: {
    display: "Pirata One",
    body: "Crimson Pro",
    accent: "Germania One",
  },
  legend: [
    "Of the Werewolf — what the German tongues call the Werwolf, the French the loup-garou, the Greek the lykanthropos — the casebook contains entries spanning seven centuries and three continents. The figure recurs with a regularity that has obliged the present author to set aside the question of folklore, in which the subject is well-furnished, and address the question of clinical presentation, in which the subject has been, until quite recently, much neglected.",
    "The classical narrative requires little rehearsal here. A man — almost always a man — discovers himself in some private register to be inhabited by a beast. The transformation comes upon him at the full moon, or in response to a curse, or after the consumption of a salve compounded of wolfsbane and certain animal organs whose source we shall not specify; while transformed, he commits acts of violence for which he afterwards has, in some accounts, no memory, and in others a memory of dreadful clarity. Discovery, when it comes, is by his neighbours, who exhume the bodies and burn the man in his recovered shape. Baring-Gould's compendium documents some forty cases of this pattern between the trial records of the fifteenth and seventeenth centuries.",
    "What concerns the modern clinician is that the pattern did not end with the trials. Cases continue to present, in psychiatric wards across Europe and the Americas, in numbers small enough to count and persistent enough to require explanation. The full moon is not necessary. The salve is not necessary. The patient may speak excellent French. He believes, with conviction unshaken by mirrors, that he is becoming a wolf.",
  ],
  anxiety: [
    "The Werewolf is the monster who lives in the family. He is not, like Dracula, an alien arriving on a ship; nor, like the Creature, an experiment going wrong in a distant laboratory. He is the son who came home from the hunt and would not speak; the woodcutter whose wife observed him favouring his left side at dinner. The folklore of lycanthropy is, before it is anything else, the folklore of intimate strangeness — the suspicion that the man one knew yesterday is no longer the same man tonight, and that the alteration is somehow physical and somehow not.",
    "The clinical fact, which has only emerged into respectability in our own century, is that this suspicion is sometimes correct. The man is not the same man tonight. The alteration is not physical. We are obliged to say what it is instead.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the folklore to the clinic, and find — to our considerable surprise on first encountering the literature — that clinical lycanthropy is not a literary invention. It is a documented psychiatric phenomenon. The casebook is small, the literature is careful, and the diagnosis, when it is made, is made by clinicians who would prefer to be making any other.",
    paragraphs: [
      {
        text: "Blom, in his 2014 systematic review for the History of Psychiatry, identified thirteen confirmed reports of clinical lycanthropy in the medical literature since the year 1850, and a further forty-three reports in which the patient believed himself to be transforming into some animal other than a wolf — dog, bear, cat, in one striking case a bee. The reports are spread thinly across the journals; the typical patient, on close reading, is a man in his thirties with a comorbid diagnosis of schizophrenia, psychotic depression, or bipolar I in florid presentation. The delusion of transformation, in these cases, is held with the full conviction characteristic of psychosis, often accompanied by tactile hallucinations of fur growing inward beneath the skin.",
        citations: [1],
      },
      {
        text: "Garlipp and colleagues, writing for Acta Psychiatrica Scandinavica, undertook the more difficult psychodynamic task of asking what the lycanthropic delusion is for. They concluded — cautiously, as is the manner of the journal — that the wolf is a vehicle for the externalisation of disowned aggression, and that the transformation narrative permits the patient to commit, in fantasy, acts for which his ordinary personality could not consciously consent. The full moon, on this reading, is not the cause of the transformation. The full moon is the alibi.",
        citations: [2],
      },
      {
        text: "Khalil and colleagues, in their 2021 systematic review for Frontiers in Psychiatry, extended the analysis into the neurobiology, identifying — across the small but converging case series — disruptions in the proprioceptive and interoceptive networks of the cerebral cortex; areas concerned, in plain English, with the brain's continuous private estimate of where the body is and what shape it is in. When these estimates fail, the patient's body, by his own report, becomes a stranger. The cultural figure of the werewolf, the authors suggest, is the form this estrangement takes when the patient is also a reader of folktales. It is the available story.",
        citations: [3],
      },
      {
        text: "It is the duty of the present alienist to insist on what these reviews insist on jointly: that the patient who tells you he is a wolf is not telling you that he intends harm. He is telling you that his body has begun to lie to him in a particular, ancient, and treatable way. The treatment, when the underlying psychotic disorder is correctly identified, is the treatment of that disorder. The literature contains no documented case of lycanthropic delusion that did not remit on treatment. The wolf, in clinical practice, is the symptom we cure last because we cured the cause first.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.blom2014lycanthropy,
      CITATIONS.garlipp2004lycanthropy,
      CITATIONS.khalil2021lycanthropy,
    ],
  },
  diagnosis: {
    phenomenon: "Clinical Lycanthropy (a delusion of zoanthropic transformation)",
    researcher: "Jan Dirk Blom; Petra Garlipp; Rola Khalil et al.",
    yearOfTheory: 2014,
    dsmStatus:
      "Not a discrete DSM-5 diagnosis. Coded as a delusional content within Schizophrenia Spectrum and Other Psychotic Disorders, or — when affective — within Bipolar I or Major Depression with Psychotic Features.",
    furtherReading: [
      CITATIONS.blom2014lycanthropy,
      CITATIONS.garlipp2004lycanthropy,
      CITATIONS.khalil2021lycanthropy,
    ],
  },
  transition: "claw-rake",
  sigil: "/sigils/the-wolf.webp",
};
