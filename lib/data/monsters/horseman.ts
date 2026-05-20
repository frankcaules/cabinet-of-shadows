import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const horseman: Monster = {
  status: "full",
  slug: "horseman",
  name: "The Headless Horseman",
  epithet: "The Hessian of Sleepy Hollow",
  source: {
    title: "The Legend of Sleepy Hollow",
    author: "Washington Irving",
    year: 1820,
  },
  sourceQuote: "His head, the country folk say, was carried off by a cannon-ball.",
  palette: {
    bg: "#14100B",
    accent: "#D9601A",
    ink: "#E8D9B8",
    rule: "rgba(139, 74, 44, 0.45)",
  },
  typography: {
    display: "Old Standard TT",
    body: "Old Standard TT",
  },
  legend: [
    "The subject of this dossier is, by the careful framing of his author, a figure of country gossip rather than of direct witness. Washington Irving — diplomat, ethnographer, and the closest thing the early Republic had to a literary historian of its own folk culture — set the narrative in the Dutch settlement of Tarrytown on the east bank of the Hudson, in the years immediately following the War of Independence. The Hessian to whom the headless horseman is locally attributed had been a mercenary in the British service; he was decapitated, the country folk maintain, by an American cannon-ball during the Revolutionary War — the local antiquaries favour the Battle of White Plains, fought eight miles east in October 1776, but Irving himself declined to name the engagement; he is buried, the country folk maintain, in the Dutch burial-ground at Sleepy Hollow.",
    "His ride is principally nocturnal. He emerges at the covered bridge near the burying-ground, traverses the road to Tarrytown in pursuit of solitary travellers, and is obliged — by the terms of the local cosmology — to return to his grave at cock-crow or be lost to it forever. He searches, the country folk add, for his missing head. The pumpkin he carries beneath his arm and occasionally hurls is a substitute. He has, at the time of the narrative, been substituting for some quarter of a century.",
    "The case that concerns the present author is that of one Ichabod Crane, schoolmaster of the district, who in the autumn of 1790 dined at the Van Tassel farm, courted the daughter of the house in competition with one Brom Bones, and was pursued on his ride home by a figure on horseback who threw at him a pumpkin and was never identified. Crane disappeared from the district; his hat was found in the road; the broken remnants of the pumpkin were found nearby. Brom Bones married the daughter and is reported to have laughed, on occasion, when the matter was mentioned. The country folk continue to maintain that the Hessian rides.",
  ],
  anxiety: [
    "The Headless Horseman is the American monster — which is to say, the monster of a culture whose continental ghost stories had been imported, fewer than two generations earlier, from regions where ghost stories had been doing comparable work for several centuries. Irving's contribution, in 1820, was to demonstrate that the import could be productively re-shaped to the new soil: the European revenant becomes the war-dead mercenary, the European graveyard becomes the Dutch Reformed burying-ground, the European fear of damnation becomes the post-Revolutionary American fear of an unresolved war.",
    "The cultural anxiety on which the legend runs is therefore not, in our view, the headless ride. The legend runs on the unfinished business of the war. The Hessian is the soldier who was supposed to go home; the country folk are the population that was supposed to forget; the missing head is the war's missing closure, substituted on horseback by whichever pumpkin is to hand.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the covered bridge to the modern bereavement literature, and find — to no great surprise — that the empirical study of what the survivor sees and hears after a death has supplied the framework Irving's story is most usefully read against. The Hessian is, on the clinical evidence, a category of human experience whose prevalence is dramatically higher than the unbereaved tend to assume.",
    paragraphs: [
      {
        text: "Bennett and Bennett, in their 2000 paper for Mortality, surveyed widows in northern England and reported what the bereavement literature has by now confirmed across multiple cohorts and several countries: that between 30 and 60 percent of recently bereaved spouses report a phenomenologically vivid sense of the deceased's continuing presence — sometimes auditory (the footstep on the stair, the voice from the next room), sometimes visual (the figure in the chair, the back glimpsed in a crowd), occasionally tactile. The experiences are not, on the careful analysis Bennett and Bennett performed, indicative of psychiatric morbidity. They are statistically normal features of acute grief. Most respondents found them comforting.",
        citations: [1],
      },
      {
        text: "Bonanno's 2004 review for American Psychologist supplied the broader context. The dominant Western model of grief — five stages, denial through acceptance, with the implication that anything else is pathological — was, on the evidence Bonanno reviewed, never empirically supported and never the typical experience. The typical experience is a wide range of trajectories, the commonest of which is resilience: the bereaved person's restoration of stable function within months, frequently accompanied by ongoing emotional connection to the deceased, sometimes including sensed-presence experiences, and rarely meeting criteria for any psychiatric disorder. The clinical task in modern bereavement work is, accordingly, less to push the patient through stages than to make room for the variety of forms grief can take.",
        citations: [2],
      },
      {
        text: "Read with Bennett and Bonanno in hand, the legend of Sleepy Hollow takes on a slightly different colour. The country folk are a population in the third post-war decade. Their dead — the war's dead, the Hessian's dead, their own — are not abstractions to them. They are persons who were supposed to come home. The story they tell their schoolmaster about the figure on the bridge is, on this reading, neither folk superstition nor literary device. It is the available cultural form in which a community processes losses for which the official channels have not produced closure. The Hessian is, in the limit, what the war owed and did not pay.",
        citations: [1, 2],
      },
      {
        text: "Whether the Hessian rides, in any literal sense, the present author has no opinion to offer. What the present author wishes to record is that the bereaved frequently do see the dead, and that the relevant clinical posture toward this fact is not scepticism but accommodation. The pumpkin in the road is a real pumpkin. The man who threw it may or may not have been Brom Bones. The grief of the country folk for which the legend supplies a vehicle is, by the available evidence, very much real and was real before the schoolmaster arrived.",
        citations: [1, 2],
      },
    ],
    citations: [
      CITATIONS.bennett2000presenceDead,
      CITATIONS.bonanno2004resilience,
    ],
  },
  diagnosis: {
    phenomenon: "Bereavement-Related Sensed Presence; the Folk Vehicle of Unresolved Grief",
    researcher: "Gillian Bennett & Kate M. Bennett; George A. Bonanno",
    yearOfTheory: 2000,
    dsmStatus:
      "Sensed-presence experiences in bereavement are explicitly noted in DSM-5 as a normal feature of acute grief, not a psychotic symptom. Persistent Complex Bereavement Disorder is in DSM-5-TR (309.89). The folk vehicle itself is not a clinical phenomenon but a community-level practice.",
    furtherReading: [
      CITATIONS.bennett2000presenceDead,
      CITATIONS.bonanno2004resilience,
    ],
  },
  transition: "pumpkin-arc",
  sigil: "/sigils/horseman.webp",
};
