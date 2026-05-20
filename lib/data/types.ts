export type TransitionId =
  | "bat-swarm"
  | "lightning-suture"
  | "chemical-morph"
  | "claw-rake"
  | "bandage-unwrap"
  | "silk-curtain"
  | "opera-curtain"
  | "portrait-age"
  | "newsprint-flutter"
  | "razor-slice"
  | "spring-leap"
  | "clay-dust"
  | "pumpkin-arc";

export interface Citation {
  id: string;
  authors: string;
  year: number;
  title: string;
  venue: string;
  volume?: string;
  pages?: string;
  doi?: string;
}

export interface PaletteTokens {
  bg: string;
  accent: string;
  ink: string;
  rule: string;
}

export interface TypographyTokens {
  display: string;
  body: string;
  accent?: string;
}

export interface ClinicalParagraph {
  text: string;
  citations: number[];
}

export interface ClinicalNote {
  intro: string;
  paragraphs: ClinicalParagraph[];
  citations: Citation[];
}

export interface Diagnosis {
  phenomenon: string;
  researcher: string;
  yearOfTheory: number;
  dsmStatus?: string;
  furtherReading: Citation[];
}

export interface MonsterAudio {
  ambient: string;
  sfx: Record<string, string>;
}

export interface Monster {
  status: "full";
  slug: string;
  name: string;
  epithet: string;
  source: {
    title: string;
    author: string;
    year: number;
  };
  sourceQuote: string;
  palette: PaletteTokens;
  typography: TypographyTokens;
  legend: string[];
  anxiety: string[];
  clinicalNote: ClinicalNote;
  diagnosis: Diagnosis;
  transition: TransitionId;
  audio: MonsterAudio;
  sigil: string;
}

export interface MonsterStub {
  status: "stub";
  slug: string;
  name: string;
  epithet: string;
  source: {
    title: string;
    author: string;
    year: number;
  };
  palette: PaletteTokens;
  typography: TypographyTokens;
  transition: TransitionId;
  sigil: string;
}

export type MonsterEntry = Monster | MonsterStub;
