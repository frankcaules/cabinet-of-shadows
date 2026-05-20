import { CITATIONS } from "../bibliography";
import type { Monster } from "../types";

export const varney: Monster = {
  status: "full",
  slug: "varney",
  name: "Sir Francis Varney",
  epithet: "The Vampyre of the Penny Dreadful",
  source: {
    title: "Varney the Vampire; or, The Feast of Blood",
    author: "James Malcolm Rymer & Thomas Peckett Prest",
    year: 1847,
  },
  sourceQuote: "I am that which I cannot help being. Pity me, if you have any pity to spare.",
  palette: {
    bg: "#14110C",
    accent: "#A02020",
    ink: "#D4C896",
    rule: "rgba(107, 114, 128, 0.4)",
  },
  typography: {
    display: "IM Fell English",
    body: "IM Fell DW Pica",
    accent: "IM Fell Double Pica SC",
  },
  legend: [
    "Sir Francis Varney appears, in the bound volume of the present author's possession, across 220 weekly numbers of broadsheet published between 1845 and 1847 — some 667,000 words of pulp prose, in eight-page numbers at one penny each, with illustrations by an unnamed engraver of considerable industry. The reader is therefore advised that the narrative is, in places, unfinished, contradicted, or reprised under different circumstances; the present account synthesises rather than dictates.",
    "Sir Francis is a vampire of the West Country, of indeterminate age and indistinct ancestry. He bites women of property at their bedchamber windows during thunderstorms; the women survive. He duels gentlemen in moonlit gardens; the gentlemen survive, and become his confidants. He is hunted, repeatedly, by torch-bearing mobs and by the families of his victims; he escapes, repeatedly, by walking calmly out of the burning house and into the next county. The penny dreadful was a serial form, and Sir Francis was its most reliable salesman; he could not be allowed, by his publisher, to die before public patience ran out.",
    "He is allowed to die, in the end, at Mount Vesuvius in 1747 in his own time and 1847 in the reader's, by walking into the crater of his own volition. The note he leaves behind explains that he can no longer bear to live as he has lived — to drink as he has drunk — and that he would like the record to show that, on the whole, he is sorry. The note is signed Varney. It is the longest sustained apology in the entire literature of vampirism, and it is the reason this dossier exists.",
  ],
  anxiety: [
    "Varney is the first sympathetic vampire of the English tradition. He precedes Dracula by half a century and reverses Dracula's emotional polarity entirely: where Stoker invites us to hunt his predator with relief, Rymer and Prest invite us to follow theirs across two hundred weeks of weekly numbers and to feel, by the end, that we know him. The penny dreadful — a despised form, sold at the price at which lower-middle-class readers could afford it — produced, on its own initiative, the figure that would dominate the subsequent two centuries of horror cinema: the monster who would, if he could, prefer not to be one.",
    "The cultural anxiety on which the serial ran is therefore not the predator. The cultural anxiety is the reader. The serial worked because its audience, week by week, refused to want Sir Francis dead. The question the present author has not been able to dismiss is what that refusal says about us.",
  ],
  clinicalNote: {
    intro:
      "We turn now from the news-stand to the media-psychology literature, and find — to no great surprise — that the phenomenon Rymer and Prest stumbled on commercially in 1845 was eventually formalised by Vorderer and colleagues in 2004 as the central puzzle of why human beings consume narrative entertainment about persons whose actual presence they would consider intolerable.",
    paragraphs: [
      {
        text: "Nina Auerbach, in Our Vampires, Ourselves, traced the figure of the vampire across the long nineteenth century and identified Varney as the structural innovation that made the rest of the tradition possible: a predator whose interiority is rendered legible to the reader, whose self-disgust is rendered audible, and whose victims, by the conventions of the form, do not on the whole die. Auerbach's contribution is the observation that this innovation was forced on the writers by the economics of the form — a vampire who killed his victims terminally each week would have used up his author's supply of victims by Number Forty — and that the literary tradition's debt to commercial necessity is, accordingly, larger than the literary tradition tends to admit.",
        citations: [1],
      },
      {
        text: "Vorderer and colleagues, writing for Communication Theory, posed the question directly: why do audiences derive measurable enjoyment from narratives whose content, if reported in the news, they would find appalling? The answer, on their multi-factor model, is that narrative engagement supplies pleasures that ordinary life does not — controlled exposure to threat, vicarious experience of forbidden states, opportunities for moral reasoning under conditions of safety, and (on their specifically affective account) the satisfaction of empathising with a figure whom the reader would not, in person, be expected to forgive. The Varney serial, on this account, was a sustained training exercise in moral promiscuity.",
        citations: [2],
      },
      {
        text: "The present author considers this finding to be neither pleasant nor avoidable. The reader who finishes the Varney serial has practised, week by week, the ability to extend sympathy to a person who has injured others. The exercise is genuinely useful — it is, in the limit, the exercise on which much of medicine, much of social work, and the more functional portions of criminal justice rely. It is also, in less limited applications, the exercise on which complicity rests. The penny dreadful taught its readers to forgive a predator at the rate of one penny per eight pages. We are still buying the bound editions.",
        citations: [1, 2],
      },
      {
        text: "The proper diagnosis of Sir Francis Varney is not, in the end, a clinical one. He is a literary innovation. The diagnosis is for the reader, and it is best expressed as a question: under what conditions does sympathy for a fictional predator transfer to lenience for a real one? The literature on parasocial identification suggests the conditions are commoner than we like. We mention this not to dissuade the reader from finishing the serial — the bound edition is in our library and we have finished it twice — but to recommend that the reader observe themselves while reading.",
        citations: [1, 2],
      },
    ],
    citations: [
      CITATIONS.auerbach1995ourVampires,
      CITATIONS.vorderer2004enjoyment,
    ],
  },
  diagnosis: {
    phenomenon: "Parasocial Sympathy for the Tragic Monster (the moral promiscuity of narrative)",
    researcher: "Nina Auerbach; Peter Vorderer et al.",
    yearOfTheory: 1995,
    dsmStatus:
      "Not a DSM-5 phenomenon. A media-psychology construct describing the cultivated audience capacity to extend empathy to fictional figures whose conduct would be condemned in person; relevant to media-effects research, narrative ethics, and the psychology of complicity.",
    furtherReading: [
      CITATIONS.auerbach1995ourVampires,
      CITATIONS.vorderer2004enjoyment,
    ],
  },
  transition: "newsprint-flutter",
  sigil: "/sigils/varney.webp",
};
