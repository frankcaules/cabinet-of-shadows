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

// ------- i18n -----------
export const LOCALES = ["en", "th"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * LocalizedMonster — a monster's translatable content keyed by locale.
 * Untranslatable fields (slug, palette, typography, sigil, audio, transition)
 * live at the top level. Translatable fields (name, epithet, source.title,
 * source.author wording, sourceQuote, legend, anxiety, clinicalNote, diagnosis)
 * are nested under `content[locale]`.
 *
 * Falls back to English when a Thai translation is missing.
 */
export interface MonsterContent {
  name: string;
  epithet: string;
  source: { title: string; author: string; year: number };
  sourceQuote: string;
  legend: string[];
  anxiety: string[];
  clinicalNote: ClinicalNote;
  diagnosis: Diagnosis;
}

export interface LocalizedMonster {
  status: "full";
  slug: string;
  palette: PaletteTokens;
  typography: TypographyTokens;
  transition: TransitionId;
  sigil: string;
  content: Partial<Record<Locale, MonsterContent>>;
}

export interface LocalizedMonsterStub {
  status: "stub";
  slug: string;
  palette: PaletteTokens;
  typography: TypographyTokens;
  transition: TransitionId;
  sigil: string;
  content: Partial<Record<Locale, Pick<MonsterContent, "name" | "epithet" | "source">>>;
}
