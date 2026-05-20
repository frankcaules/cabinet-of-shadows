import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const griffin: Monster = {
  status: "full",
  slug: "griffin",
  name: "Griffin",
  epithet: "The Invisible Man",
  source: {
    title: "The Invisible Man",
    author: "H. G. Wells",
    year: 1897,
  },
  sourceQuote: "An invisible man is a man of power.",
  palette: {
    bg: "#14130E",
    accent: "#C9A86A",
    ink: "#E8E0D0",
    rule: "rgba(255, 255, 255, 0.12)",
  },
  typography: {
    display: "Abril Fatface",
    body: "Source Serif 4",
  },
  legend: [
    "The subject — Mr. Griffin, formerly a demonstrator of physics at University College in some unspecified Midlands town — arrived at the Coach and Horses inn at Iping in the winter of 1896. He was wholly bound in white bandages, his eyes concealed by blue spectacles, his hands gloved against a cold no one else in the inn could detect. He took the parlour, paid for it in advance with sovereigns of unusual newness, and instructed the landlady that he was not to be disturbed under any circumstance.",
    "The circumstance arose on a Whit Monday, when, the rent overdue and the landlady's patience exhausted, he removed his bandages and his glasses and his hands and was discovered to be nothing whatever — a vacancy in a chair, a voice without a throat, a man whose only remaining contact with the visible world was the friction of dust against his unseen skin. He killed two men in the village before the day was out, including a Mr. Wicksteed, whose body was found in a ditch with his head smashed against a flint as if by a hand that had needed, for once, to act and to be felt.",
    "What followed was the brief and lethal career of a man who had discovered, by chemistry, the answer to a question he had never paused to ask: what does a personality do when freed from the surveillance that holds it in shape? Griffin answered, by his actions, that it does whatever it pleases, until the people it has displeased catch up with it. The men of Burdock did, with their shovels, in early summer. They reported afterwards that, in death, his body became visible to them by degrees over the course of an hour.",
  ],
  anxiety: [
    "Griffin is the modernity monster — which is to say, the monster who is enabled, rather than created, by the conditions of his century. Where Dracula's powers are ancient, where the Creature's are tragic, Griffin's are simply scientific. He is the experimentalist's curse delivered as a sentence, the discovery that knowledge is morally promiscuous. Published in 1897, Wells's novella is the first English book in which a man becomes a monster solely by gaining a capability his neighbours do not yet have.",
    "The horror, on inspection, is not the capability itself. The horror is that the moment Griffin was confident of escaping observation, he stopped behaving like a citizen. The bandages were never the disguise. The bandages were the last vestige of accountability.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the laboratory to the lecture hall, and find that Wells — writing decades before the relevant experiments had been designed — anticipated with disquieting accuracy what would become, in the second half of the twentieth century, one of the most-replicated findings in social psychology. The proper name for Griffin's condition is not invisibility. It is deindividuation.",
    paragraphs: [
      {
        text: "Philip Zimbardo, in the 1969 Nebraska Symposium on Motivation, demonstrated experimentally that subjects who believed themselves anonymous and unidentifiable — hooded participants in his laboratory, indistinguishable to the observer and to each other — administered substantially longer and more severe electric shocks to a confederate than subjects whose names were on a badge. The hood, in the Stanford experiments, did the same psychological work that Griffin's invisibility does in Wells: it removed the subject from the field of social consequence.",
        citations: [1],
      },
      {
        text: "Diener, in a parallel programme of research, isolated the cognitive mechanism. The deindividuated subject, he argued, loses self-awareness — that is, the ordinary monitoring of one's own behaviour against an internalised standard. The standard does not vanish. The monitoring does. The result is not, in the dramatic phrase, an inner monster set free; it is the much more ordinary phenomenon of impulses acted upon because the part of the mind that usually says wait has gone unstaffed.",
        citations: [2],
      },
      {
        text: "Postmes and Spears, in their 1998 meta-analysis for Psychological Bulletin, reviewed sixty experimental studies and concluded — with the cautious counter-intuition of a properly meta-analytic finding — that deindividuation does not so much unleash antisocial behaviour as it amplifies adherence to whatever local norm the group around the subject is operating under. The hooded student in the laboratory will shock harder than his badged neighbour, but only if the laboratory's tacit norm is that harder shocks are appropriate. Set the same student in a group whose norm is restraint and his anonymity will make him more restrained.",
        citations: [3],
      },
      {
        text: "The terrible thing this finding does to Griffin's case is the terrible thing it does to all of us. The man in the bandages was, by his own account, a competent and unremarkable researcher of moderate temper. He was not a latent murderer in whom invisibility unleashed a hidden self. He was a citizen who had been removed, by his own chemistry, from the field in which murder is unthinkable. The lesson Wells drew, and that Zimbardo confirmed, is that the field is doing more of the moral work than we like to admit, and that any technology which thins it — bandages, hoods, anonymous handles on screens — must be regarded as a public-health concern.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.zimbardo1969deindividuation,
      CITATIONS.diener1980deindividuation,
      CITATIONS.postmesSpears1998deindividuation,
    ],
  },
  diagnosis: {
    phenomenon: "Deindividuation (the erosion of self-monitoring under anonymity)",
    researcher: "Philip Zimbardo; Ed Diener; Postmes & Spears",
    yearOfTheory: 1969,
    dsmStatus:
      "Not classified. A substrate condition that potentiates aggression, conformity to local norms, and the diffusion of moral responsibility; central to the modern psychology of crowds, online behaviour, and uniformed institutions.",
    furtherReading: [
      CITATIONS.zimbardo1969deindividuation,
      CITATIONS.diener1980deindividuation,
      CITATIONS.postmesSpears1998deindividuation,
    ],
  },
  transition: "bandage-unwrap",
  audio: {
    ambient: "/audio/griffin-ambient.opus",
    sfx: {
      footsteps: "/audio/footsteps-hollow.webm",
      pages: "/audio/pages-turning.webm",
    },
  },
  sigil: "/sigils/griffin.webp",
};
