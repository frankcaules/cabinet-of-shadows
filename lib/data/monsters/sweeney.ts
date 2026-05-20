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
    "Sweeney Todd, of his premises at 186 Fleet Street, was a barber of plain reputation and, the penny dreadful insists, no particular history before the events of the case. The reader is given no transported husband, no abducted wife, no daughter taken into a magistrate's ward — the tragic backstory familiar from later stage versions is, as we shall come to in the next section, an Edwardian and twentieth-century invention. In the serialised The String of Pearls of 1846–47, Mr. Todd is simply present in his shop. He is unmarried; he is, on the available evidence, motiveless except in the strictly mercenary sense. The cellar arrangement is what it is for the reason such arrangements usually are: profit, and the convenience of an adjacent pie-shop.",
    "The case opens with the arrival in Fleet Street of one Lieutenant Thornhill of the East India Company, lately disembarked at the docks and carrying, in a small box, a string of pearls. The pearls were the property of a Mr. Mark Ingestrie, a young sailor presumed lost at sea in the Indian Ocean some months earlier; Ingestrie had, before sailing, intended them as a gift for Miss Johanna Oakley, a spectacle-maker's daughter of Fore-Street, to whom he was engaged. Thornhill, charged with their delivery, called first at Mr. Todd's shop for a shave. He did not leave it. His dog, Hector, refused to leave the doorway for some hours afterwards and barked at the shop until removed; the barking was, in the event, the closest the early investigation came to a witness.",
    "The arrangement was uncovered by the persistence of two parties. Colonel Jeffrey, a friend of Thornhill's, made inquiries at the shop in his own name and was, with some difficulty, not killed. Miss Oakley, learning of Ingestrie's intended gift and of Thornhill's disappearance, disguised herself as a boy and took employment in the barber-shop as Todd's apprentice — a piece of nerve the present author does not believe has been adequately credited by the literature. Between them they assembled the cellar arrangement and the pie-shop arrangement, in that order. Mrs. Lovett was poisoned by Mr. Todd in the cellar as the constables arrived; Mr. Todd was taken to Newgate and hanged. Miss Oakley afterwards discovered Mr. Ingestrie alive, having escaped the Indian Ocean by means the source describes at improbable length, and married him. The pearls were returned.",
  ],
  anxiety: [
    "Sweeney Todd is the modern monster — which is to say, the monster manufactured by the system that was supposed to protect him. The reader who knows him from the modern theatre will recognise this framing; the reader who knows him only from the penny dreadful will not, because in 1846 there is no system the monster was being manufactured by. The grievance — the wronged barber, the corrupt magistrate, the daughter in the magistrate's ward — does not exist in the source. It is the work of Christopher Bond, whose 1970 play Sweeney Todd: The Demon Barber of Fleet Street (premiered at the Victoria Theatre, Stoke-on-Trent, and transferred in 1973 to the Theatre Royal Stratford East) supplied the names Benjamin Barker, Lucy, Turpin, and the Botany Bay back-story. Sondheim and Wheeler adopted the Bond version wholesale for their 1979 musical; the 2006 BBC adaptation and the 2007 Burton film followed the same line. The figure who reaches the present reader is, on the whole, theirs, not Rymer and Prest's.",
    "What is interesting, for our purposes, is that the moral-injury reading of the case — the proper clinical reading, which the next section sets out — works against the Bond/Sondheim version rather than against the source. The 1846 Todd is a businessman; the 1979 Todd is a man with a grievance the institutions of justice will not redress. It is the second of these whom the contemporary literature on revenge and moral injury describes most legibly, and it is the second whom the present alienist, with apologies to Rymer and Prest, has taken as his patient. The chair, in either version, is the consequence. The grievance — when it exists at all — is the case.",
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
