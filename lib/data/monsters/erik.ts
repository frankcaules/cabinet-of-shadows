import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const erik: Monster = {
  status: "full",
  slug: "erik",
  name: "Erik",
  epithet: "The Phantom of the Opera",
  source: {
    title: "Le Fantôme de l'Opéra",
    author: "Gaston Leroux",
    year: 1910,
  },
  sourceQuote: "I am not an Angel, nor a Genius, nor a Ghost — I am Erik.",
  palette: {
    bg: "#050811",
    accent: "#BFA34A",
    ink: "#F1EAD8",
    rule: "rgba(107, 15, 26, 0.45)",
  },
  typography: {
    display: "Cormorant SC",
    body: "Lora",
    accent: "Cormorant Garamond",
  },
  legend: [
    "The subject — Erik, his only confirmed name — was born in or near Rouen in the early 1830s. He was abandoned by his mother at the sight of his face, which was congenitally disfigured to a degree that his contemporaries describe and the present author shall decline to describe in detail. He found early employment in travelling fairs, where his face was advertised as the chief attraction; thereafter, in the courts of Persia and the Sultan of Mazenderan, where his talents as engineer, illusionist, and assassin were employed by parties who could afford to employ him and who had no objection to his concealing his face under whatever cloth he preferred.",
    "By 1881 he had returned to Paris and constructed, beneath the Opera Garnier, a private apartment of five rooms on the shore of the underground lake the architect Garnier had been obliged by groundwater to incorporate into his designs. From this apartment he composed music of extraordinary quality, taught a young soprano named Christine Daaé under the convenient cover of being, as he allowed her to believe, an Angel of Music, and developed for her an attachment whose nature the dossier will treat with as much sympathy and as little sentimentality as it can.",
    "The opera-house chandelier fell in 1881 onto a paying audience. The new concierge, on her first night of duty, was killed. Christine Daaé was abducted twice, the second time on the evening of her engagement to another man; she was released, in the end, on Erik's own initiative, after she had — at her own initiative — kissed his unmasked forehead. He died three weeks later in his apartment beneath the stage and was buried, by the present opera management's discreet arrangement, in the cellars of the building he had loved.",
  ],
  anxiety: [
    "Erik is the monster whom the romance-novel tradition has the most difficulty disowning. We are asked, by Leroux and by every subsequent adaptation, to feel for him; we are asked, in the same breath, to register that he kidnaps, blackmails, and kills. The narrative places its sympathy and its judgement against each other and obliges the reader to do the arithmetic. The arithmetic is rarely clean.",
    "The cultural anxiety on which the novel runs is not, in our view, deformity itself. It is the suspicion that disfigurement is a privation severe enough to license its possessor's worst behaviour — and the simultaneous, contradictory suspicion that no privation licenses any such thing. The Opera-house lake is the place where these two suspicions meet and do not resolve.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the cellars to the literature, and find that Erik's case admits of two distinct clinical readings which must, if we are to do him justice, be held in mind simultaneously. The first concerns the lifelong effects of visible disfigurement on social development. The second concerns the specific pattern by which obsessive attachment, untreated, becomes the predicate of harm.",
    paragraphs: [
      {
        text: "Bogart and colleagues, writing for Rehabilitation Psychology, have demonstrated across multiple cohorts that visible disability and disfigurement produce — over decades and through repeated experiences of rejection — measurable elevations in self-esteem damage, social withdrawal, and depressive presentation. Their work also identifies, more hopefully, the protective effect of what they term disability pride: the active rejection of the stigma narrative in favour of an alternative self-conception that does not concede the field. Erik never had access to such a community. The only people who ever responded to him without flinching were customers at the fair, and they were paying to flinch.",
        citations: [1],
      },
      {
        text: "Mullen and colleagues, in their 1999 American Journal of Psychiatry study of 145 stalkers, identified five clinical typologies of which two fit Erik with discomfiting precision: the intimacy-seeking stalker, whose campaign is driven by a delusion of reciprocated love and is largely indifferent to the target's actual wishes; and the resentful stalker, whose campaign is fuelled by a grievance against the perceived gatekeepers between him and the desired person. Erik's letters to the opera management — the demands for box five, the salary, the access — read as the textbook documentary trail of a resentful stalker. His private conduct with Christine reads as the textbook documentary trail of an intimacy-seeker.",
        citations: [2],
      },
      {
        text: "Kennedy and colleagues, writing on erotomania in Comprehensive Psychiatry, have set out the natural history of the condition: a delusion of being loved by a person typically of higher social standing, persistent across years despite contrary evidence, frequently culminating in stalking and occasionally in violence. The condition has a recognised pharmacological response. It is treatable. We mention this because the romance-novel tradition, in adapting Leroux, has uniformly preferred the reading in which the right kiss cures the right monster. The clinical evidence does not support this reading. The kiss may release Christine; it does not, on the available data, treat Erik.",
        citations: [3],
      },
      {
        text: "The synthesis the present author offers is uncomfortable and we are not the first to offer it. The disfigurement is real and was inadequately responded to by his society. The pathology that followed is also real and was not produced by the disfigurement alone — many disfigured persons do not become stalkers; many stalkers are not disfigured. What produced Erik was the interaction of a treatable congenital condition with an untreated psychiatric one, conducted across half a century in the absence of either intervention. The opera management is not the villain of the case. The cellars are not the villain of the case. The villains, such as they are, are the gaps in the available care.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.bogart2017disability,
      CITATIONS.mullen1999stalkers,
      CITATIONS.kennedy2002erotomania,
    ],
  },
  diagnosis: {
    phenomenon: "Disfigurement Stigma + Erotomania with Intimacy-Seeking & Resentful Stalking",
    researcher: "Kathleen R. Bogart; Paul E. Mullen; Niall Kennedy",
    yearOfTheory: 1999,
    dsmStatus:
      "Erotomania (De Clérambault's syndrome) appears in DSM-5 as a subtype of Delusional Disorder (297.1). Stalking behaviours are forensic, not diagnostic. Disfigurement stigma is treated within Adjustment Disorders and the broader rehabilitation literature.",
    furtherReading: [
      CITATIONS.bogart2017disability,
      CITATIONS.mullen1999stalkers,
      CITATIONS.kennedy2002erotomania,
    ],
  },
  transition: "opera-curtain",
  sigil: "/sigils/erik.webp",
};
