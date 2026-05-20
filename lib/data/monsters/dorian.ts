import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const dorian: Monster = {
  status: "full",
  slug: "dorian",
  name: "Dorian Gray",
  epithet: "The Portrait That Aged Instead",
  source: {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    year: 1890,
  },
  sourceQuote: "I would give my soul for that.",
  palette: {
    bg: "#1A1410",
    accent: "#B89D4F",
    ink: "#F0E8D5",
    rule: "rgba(184, 85, 99, 0.35)",
  },
  typography: {
    display: "Bodoni Moda",
    body: "Cormorant Garamond",
    accent: "Playfair Display",
  },
  legend: [
    "The subject — Mr. Dorian Gray, of Grosvenor Square — sat in 1881 for a full-length portrait by the painter Basil Hallward. The portrait was the finest work of Hallward's career and is generally agreed to have been the closest likeness of its subject ever produced. At the conclusion of the sitting, in a moment of vanity exacerbated by the company of one Lord Henry Wotton, Mr. Gray expressed the wish that the portrait should bear the marks of his ageing while he himself remained as the painter had captured him. The wish was, by means unknown to the present author, granted.",
    "What followed was a private career conducted across thirty years in the upper salons of London and the lower opium dens of Limehouse and Whitechapel. Mr. Gray's circle widened; his closest friends and at least one young actress and one painter — Mr. Hallward himself — died by his hand or by his neglect. His face, throughout, remained the face of a man of twenty-three. The portrait, locked in the attic of the Grosvenor Square house, deteriorated as the man would have done had the wish been refused. The present author has examined the canvas in its final state and prefers not to describe it.",
    "The subject's death was self-inflicted, with the knife he had earlier used on Hallward, in 1890. The body found in the attic was identifiable only by the rings on its hands; the face had reverted to its proper age in death. The portrait, beside the body, had reverted to its proper subject in life — a young man at the age of twenty-three, smiling.",
  ],
  anxiety: [
    "Dorian is the modern monster — which is to say, the monster who is, on every visible measure, charming. Where Stoker's predator is foreign and where Stevenson's is chemical, Wilde's is social. Mr. Gray is invited everywhere. He is the kind of guest one is glad to have. He is also responsible for at least four deaths and several more ruined lives, and the only signal of any of this is in a painting he has had the foresight to lock upstairs.",
    "The cultural anxiety on which the novel runs is not, in our view, the supernatural premise. The supernatural premise is a literary convenience. The anxiety is that some persons appear to absorb no visible consequence for the harm they do, and that the cost of their behaviour is being paid, somewhere, by someone, in a room nobody is permitted to enter.",
  ],
  clinicalNote: {
    intro:
      "We turn now from Grosvenor Square to the personality research of the last twenty-five years, and find — happily for the structure of this volume — a paper whose title is essentially Wilde's premise restated as a research question. Jonason and colleagues, writing in 2015, asked what happens to a person who possesses the personality configuration we have come to call the Dark Triad but who does not have access to the magical portrait that absorbs his costs.",
    paragraphs: [
      {
        text: "Paulhus and Williams, in 2002, introduced into the personality literature the construct of the Dark Triad: the constellation of subclinical narcissism, Machiavellianism, and psychopathy that, across populations, predicts a recognisable pattern of social conduct — exploitative interpersonal style, callousness in close relationships, willingness to deceive for personal gain, and an unusually positive self-regard maintained in the face of contrary evidence. Mr. Gray, on Wilde's evidence, scores at ceiling on all three.",
        citations: [1],
      },
      {
        text: "Jonason and colleagues, in their 2015 paper for Personality and Individual Differences — titled, without apology, Dorian Gray without his portrait — set out the converging evidence that subjects high on the Dark Triad accumulate measurable costs in psychological, social, and physical health over the lifespan: shorter and lower-quality friendships, elevated cardiovascular risk attributed to chronically elevated hostility, higher rates of interpersonal conflict, and a particular and well-documented decline in self-reported life satisfaction across the third and fourth decades. The portrait, in their account, is the externalised ledger of these costs. The novel asks what becomes of the man whose ledger is offscreen. The answer, on the data, is that there is no such man; the costs are paid, in real persons, on schedule.",
        citations: [2],
      },
      {
        text: "Bandura's 1999 paper on moral disengagement, finally, supplies the cognitive mechanism by which the costs are kept from registering on the person who imposes them. The list of techniques — moral justification, euphemistic labelling, advantageous comparison, displacement and diffusion of responsibility, distortion of consequences, attribution of blame to the victim, dehumanisation of the victim — reads, in sequence, as a complete transcript of Lord Henry Wotton's conversational style across the novel, and of the internal monologue Mr. Gray adopts after each of his murders. Bandura's contribution is to point out that none of these techniques is exotic. They are the available rhetoric.",
        citations: [3],
      },
      {
        text: "The synthesis is unflattering to the romance the novel invites. Mr. Gray is not, in our reading, a tragic figure undone by a wish granted. He is a moderately gifted exemplar of a personality configuration that exists in measurable form in approximately one to three percent of any sufficiently large population, and that imposes its costs on others reliably across cultures. The portrait is the metaphor. The portrait is not the explanation.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.paulhusWilliams2002darkTriad,
      CITATIONS.jonason2015dorianGray,
      CITATIONS.bandura1999moralDisengagement,
    ],
  },
  diagnosis: {
    phenomenon: "The Dark Triad (Narcissism, Machiavellianism, Psychopathy) with Moral Disengagement",
    researcher: "Delroy L. Paulhus & Kevin M. Williams; Peter K. Jonason; Albert Bandura",
    yearOfTheory: 2002,
    dsmStatus:
      "Subclinical traits, not categorical diagnoses. Their clinical analogues appear in DSM-5 as Narcissistic Personality Disorder (301.81) and Antisocial Personality Disorder (301.7); Machiavellianism is captured under maladaptive Antagonism in the alternative model.",
    furtherReading: [
      CITATIONS.paulhusWilliams2002darkTriad,
      CITATIONS.jonason2015dorianGray,
      CITATIONS.bandura1999moralDisengagement,
    ],
  },
  transition: "portrait-age",
  audio: {
    ambient: "/audio/dorian-ambient.opus",
    sfx: {
      glassware: "/audio/champagne-glasses.webm",
      piano: "/audio/debussy-slowed.webm",
    },
  },
  sigil: "/sigils/dorian.webp",
};
