import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const jack: Monster = {
  status: "full",
  slug: "jack",
  name: "Spring-Heeled Jack",
  epithet: "The Terror of London Rooftops",
  source: {
    title: "London Penny Dreadfuls and Broadsheet Reports (collected)",
    author: "Anonymous broadsheet authors",
    year: 1838,
  },
  sourceQuote: "A correspondent in Peckham writes that he leaped clear of the wall.",
  palette: {
    bg: "#15161A",
    accent: "#4A8BCC",
    ink: "#E3B23C",
    rule: "rgba(61, 61, 69, 0.55)",
  },
  typography: {
    display: "Modak",
    body: "Newsreader",
  },
  legend: [
    "The first public alarm came on the ninth of January 1838, when the Lord Mayor of London, Sir John Cowan, read aloud at the Mansion House a sheaf of anonymous letters complaining of a leaping figure in the southern suburbs. The first sworn deposition followed six weeks later: on the night of the nineteenth of February 1838, one Miss Jane Alsop of Old Ford in Bow opened her father's gate to a man claiming to be a policeman who, the moment the candle was in his hand, threw off his cloak, vomited blue flame into her face, and tore at her dress with metal claws. Her deposition was taken at Lambeth Street the following day. Nine days later, on the twenty-eighth of February, Miss Lucy Scales was attacked on substantially identical facts in Green Dragon Alley, Limehouse. The matter passed from the Lord Mayor to the Home Office, which referred it to nobody in particular, and the case became, by default, the property of the press.",
    "The press did with it what the press of that decade did with such things. By March of 1838 Spring-Heeled Jack was leaping the walls of churchyards in Surrey, peering into bedroom windows in Sheffield, and on one strenuously unconfirmed occasion clearing the roof of the Lambeth Workhouse in a single bound. By 1855 the broadsheets had him in Aldershot frightening sentries; by 1877 the penny dreadfuls had him as the eponymous hero of his own forty-eight-part serial; by 1904, in his last documented appearance, he was reportedly leaping along the roofs of Everton north of Liverpool, having outlived both his original witnesses and any plausibility he had ever possessed.",
    "The present author has read the depositions, the broadsheets, the serial, and the reportage. The depositions of February 1838 are reasonably consistent with each other and reasonably similar to the lived experience of a violent assault by an unidentified man in a cloak. Everything else in the file is, in our view, something other than a record of a person.",
  ],
  anxiety: [
    "Spring-Heeled Jack is the modern monster whose primary medium is print. He is not, in the sense the other dossiers in this volume have meant the term, a literary creation; he is the residue left in the popular mind by sixty-six years of intermittent newspaper coverage. He is the form panic takes when it is allowed to circulate without correction and amplified by the commercial press for the entertainment value of its circulation.",
    "The cultural anxiety on which his career ran is therefore the press itself, and the long-running uncertainty about whether the press is supposed to record what people fear or amplify it. Spring-Heeled Jack is the case in which the answer settled, for a while, on amplification.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the broadsheet to the epidemiological literature, and find that the formal psychiatric study of mass sociogenic illness has, since the 1980s, supplied the framework Spring-Heeled Jack's career most cleanly fits. The phenomenon does not require the disease and does not require the spirit. It requires the rumour, the receptive audience, and the medium of transmission.",
    paragraphs: [
      {
        text: "Wessely, writing in Psychological Medicine in 1987, distinguished between two clinical patterns of mass hysteria — mass anxiety hysteria (rapid spread of fearful symptoms through a population, typically following an acute precipitant, and resolving within hours to days) and mass motor hysteria (slower spread of conversion-disorder-type motor symptoms, more persistent and more difficult to extinguish). Both patterns, Wessely emphasised, are real — that is, the symptoms reported by participants are not fabricated — and both are sociogenic, that is, transmitted person-to-person through social mechanisms rather than through any infectious or environmental agent.",
        citations: [1],
      },
      {
        text: "Bartholomew and Sirois, in their 1996 historical review for Educational Studies, catalogued some 70 documented outbreaks of mass sociogenic illness in school settings across four centuries and a dozen countries, with content varying according to the cultural preoccupations of the period — possession in early modern convents, fainting and laughing fits in Victorian classrooms, twitching and tics in modern American high schools, perceptions of toxic substances in the 1980s and 1990s. The Spring-Heeled Jack panic of 1838 sits cleanly in this catalogue: an acute precipitant (the Alsop and Scales depositions), a receptive audience (working-class London in the cholera years), a transmitting medium (the penny press), and a content that maps to a recognisable category of cultural fear (the male predator on isolated women at twilight).",
        citations: [2],
      },
      {
        text: "Bartholomew and Wessely, in their 2002 joint paper for the British Journal of Psychiatry, made the further point that the content of the panic adapts to the medium of transmission: in pre-print cultures, mass sociogenic illness took the form of demonic possession and was extinguished by exorcism; in print cultures, it took the form of phantom assailants and was extinguished by the press losing interest; in electronic cultures it takes the form of toxic-spill and contamination panics and is extinguished by epidemiological investigation. The agent is always the same: it is the rumour, propagating through the available channels, finding the audience the channels reach. Spring-Heeled Jack was, in this strict sense, a print-era pathogen.",
        citations: [3],
      },
      {
        text: "We mention all of this without dismissing Miss Alsop or Miss Scales, whose depositions in February 1838 are the part of the file we believe. Some person assaulted them. That person, whoever he was, walked away from Bow on his own feet, on the same legs his neighbours had, in cloth his tailor had measured. He could not, on any plausible reading, clear a wall. What cleared the wall was the press.",
        citations: [1, 2, 3],
      },
    ],
    citations: [
      CITATIONS.wessely1987massHysteria,
      CITATIONS.bartholomewSirois1996epidemic,
      CITATIONS.bartholomewWessely2002protean,
    ],
  },
  diagnosis: {
    phenomenon: "Mass Sociogenic Illness (Print-Era Variant)",
    researcher: "Simon Wessely; Robert E. Bartholomew; François Sirois",
    yearOfTheory: 1987,
    dsmStatus:
      "Not itself a DSM-5 diagnosis. Individual presentations frequently meet criteria for Conversion Disorder (300.11) or Acute Stress Disorder (308.3); the population-level phenomenon is studied within psychiatric epidemiology, sociology, and folkloristics.",
    furtherReading: [
      CITATIONS.wessely1987massHysteria,
      CITATIONS.bartholomewSirois1996epidemic,
      CITATIONS.bartholomewWessely2002protean,
    ],
  },
  transition: "spring-leap",
  audio: {
    ambient: "/audio/jack-ambient.opus",
    sfx: {
      gasLamps: "/audio/gas-lamps-hissing.webm",
      laugh: "/audio/distant-laugh.webm",
    },
  },
  sigil: "/sigils/jack.webp",
};
