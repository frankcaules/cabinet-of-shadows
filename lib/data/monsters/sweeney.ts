import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const sweeney: Monster = {
  status: "full",
  slug: "sweeney",
  name: "Sweeney Todd",
  epithet: "The Demon Barber of Fleet Street",
  source: {
    title: "The String of Pearls: A Romance",
    author: "James Malcolm Rymer & Thomas Peckett Prest",
    year: 1846,
  },
  sourceQuote: "I have had it in my power, and I have done it.",
  palette: {
    bg: "#131210",
    accent: "#9C1B1B",
    ink: "#D2A86A",
    rule: "rgba(212, 155, 61, 0.35)",
  },
  typography: {
    display: "Limelight",
    body: "Libre Caslon Text",
  },
  legend: [
    "Mr. Benjamin Barker — known to Fleet Street as Sweeney Todd — was a barber of moderate reputation and unmoderated grievance. The grievance, as the present author has been able to reconstruct it from the serialised The String of Pearls and its principal contemporary sources, was as follows. A magistrate named Turpin coveted Mr. Barker's wife; the magistrate, having no legitimate access, arranged on a false charge to have Barker transported to a Botany Bay penal colony for fifteen years; the wife, on the magistrate's subsequent and persistent pressures, was either driven to derangement or driven from the family home; the daughter was placed by the magistrate in the magistrate's own household, where she grew up under his guardianship.",
    "Mr. Barker returned, in 1846, under the assumed name of Sweeney Todd. He took premises in Fleet Street; he reopened the barber-shop; he equipped the chair with a mechanism, of his own design, by which the customer at the conclusion of his shave was dropped through a trap into the cellar below. The cellar adjoined a pie-shop operated by one Mrs. Lovett, with whom Mr. Todd's professional arrangement requires no further elaboration. The arrangement persisted for some sixteen months, during which the pies of Fleet Street developed a reputation for excellence that the present author can confirm was, at the time, accurate.",
    "The arrangement was uncovered by an investigation conducted by friends of one of Mr. Todd's earlier victims, a Mr. Thornhill, whose pearls — left in trust for the missing daughter — were the indirect occasion of the title. Mrs. Lovett died in the cellars of her own establishment; Mr. Todd was hanged at Newgate. The magistrate, Turpin, was killed in the course of Mr. Todd's final discoveries; the daughter survived, married the friend who had begun the investigation, and is reported by the source to have lived a long and ordinary life. The pearls were returned.",
  ],
  anxiety: [
    "Sweeney Todd is the modern monster — which is to say, the monster manufactured by the system that was supposed to protect him. He arrives in 1846 in a penny dreadful and he has not, in the subsequent 180 years, ceased to be repackaged: Bond's 1973 play, Sondheim and Wheeler's 1979 musical, the 2007 film, the 2026 BBC adaptation. The repackaging is necessary because the underlying grievance — that the institutions of justice were used by a powerful man to dispossess a less powerful man, and that the less powerful man eventually responded with the only tools he had to hand — is the kind of grievance that does not lose its currency.",
    "The horror, on inspection, is not the trap-door chair. The horror is what the magistrate could do, and the law could not undo, in the years preceding the trap-door chair. The chair is the consequence. The grievance is the case.",
  ],
  clinicalNote: {
    intro:
      "We turn now from Fleet Street to the contemporary literature on the psychological costs of revenge, and find that the modern clinical picture confirms what every reader of Sondheim's libretto suspects: that the act of revenge does not deliver what revenge promises to deliver, and that the costs accrue, with interest, to the avenger.",
    paragraphs: [
      {
        text: "Litz and colleagues, writing in Clinical Psychology Review on what they termed moral injury, set out the now-established proposition that prolonged participation in acts the actor's own moral framework forbids — whether in combat, in correctional work, or in personal acts of vengeance — produces a recognisable syndrome distinct from post-traumatic stress disorder. The features include persistent guilt, shame disproportionate to circumstance, social withdrawal, intrusive moral self-condemnation, and a frequent secondary feature of self-handicapping behaviour: the deliberate sabotage of one's own subsequent prospects, as if to render oneself unworthy of recovery. Mr. Todd's conduct after the seventeenth pie reads, on this framework, as moral injury exacerbated by the impossibility of stopping.",
        citations: [1],
      },
      {
        text: "Schumann and Ross, in their 2010 paper for Social and Personality Psychology Compass titled with deliberate precision The benefits, costs, and paradox of revenge, reviewed the experimental and field literature and arrived at three findings the avenger will find unpleasant. First: anticipating revenge produces measurable mood elevation; performing revenge does not. Second: avengers consistently overestimate, in advance, how good they will feel afterwards, and underestimate, in advance, how persistently the act will return to mind in the weeks following. Third: the act of taking revenge tends to prolong the focus on the original injury rather than discharge it, with the result that the avenger has the worst of both worlds — the original grievance preserved in vivid mental rehearsal and a new, fresh grievance against himself for what he has done about it.",
        citations: [2],
      },
      {
        text: "The synthesis is the moral that the serial novel was always too commercial to state plainly and that Sondheim, in his more economical medium, was able to deliver in a single repeated chord: the trap-door chair did not give Mr. Todd back what the magistrate took from him. It could not have done. The thing that had been taken was the kind of thing for which the available compensations are slow and quiet — a long marriage that one is alive to enjoy, a daughter one has been permitted to raise, an old age in which the magistrate is not the most important figure on the horizon. None of these were available to Mr. Todd by the time he reopened the shop. The chair was the only motion he could still make. He made it. It did not work.",
        citations: [1, 2],
      },
      {
        text: "We mention all of this with no condescension towards Mr. Todd, whose grievance was real and whose options were narrow. The clinical purpose of the case, in our view, is to insist that the avenger be allowed, in the literature and in the consulting room, the dignity of having tried something that did not work. The work that does work, where it is available, is slower; it does not make as good a curtain; the audience in 1846 would not have paid a penny for it. We have, in 2026, somewhat better options. They are still slow.",
        citations: [1, 2],
      },
    ],
    citations: [
      CITATIONS.litz2009moralInjury,
      CITATIONS.schumannRoss2010revenge,
    ],
  },
  diagnosis: {
    phenomenon: "Moral Injury with Revenge-Driven Self-Handicapping",
    researcher: "Brett T. Litz et al.; Karina Schumann & Michael Ross",
    yearOfTheory: 2009,
    dsmStatus:
      "Moral injury is not a DSM-5 diagnosis but is an established construct in the trauma literature, frequently comorbid with PTSD (309.81) and Major Depressive Disorder with persistent guilt features.",
    furtherReading: [
      CITATIONS.litz2009moralInjury,
      CITATIONS.schumannRoss2010revenge,
    ],
  },
  transition: "razor-slice",
  audio: {
    ambient: "/audio/sweeney-ambient.opus",
    sfx: {
      bells: "/audio/church-bells-distant.webm",
      razor: "/audio/razor-on-strop.webm",
    },
  },
  sigil: "/sigils/sweeney.webp",
};
