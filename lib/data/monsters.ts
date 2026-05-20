import type { Monster, MonsterEntry, MonsterStub, Locale } from "./types";
import { dracula } from "./monsters/dracula";
import { theCreature } from "./monsters/the-creature";
import { hyde } from "./monsters/hyde";
import { theWolf } from "./monsters/the-wolf";
import { griffin } from "./monsters/griffin";
import { carmilla } from "./monsters/carmilla";
import { erik } from "./monsters/erik";
import { dorian } from "./monsters/dorian";
import { varney } from "./monsters/varney";
import { sweeney } from "./monsters/sweeney";
import { jack } from "./monsters/jack";
import { golem } from "./monsters/golem";
import { horseman } from "./monsters/horseman";
import { STUBS } from "./monsters/_stubs";

// Thai variants — full set. Missing entries fall back to English.
import { dracula as draculaTh } from "./monsters/dracula.th";
import { theCreature as theCreatureTh } from "./monsters/the-creature.th";
import { hyde as hydeTh } from "./monsters/hyde.th";
import { theWolf as theWolfTh } from "./monsters/the-wolf.th";
import { griffin as griffinTh } from "./monsters/griffin.th";
import { carmilla as carmillaTh } from "./monsters/carmilla.th";
import { erik as erikTh } from "./monsters/erik.th";
import { dorian as dorianTh } from "./monsters/dorian.th";
import { varney as varneyTh } from "./monsters/varney.th";
import { sweeney as sweeneyTh } from "./monsters/sweeney.th";
import { jack as jackTh } from "./monsters/jack.th";
import { golem as golemTh } from "./monsters/golem.th";
import { horseman as horsemanTh } from "./monsters/horseman.th";

export const FULL_MONSTERS: Record<string, Monster> = {
  dracula,
  "the-creature": theCreature,
  hyde,
  "the-wolf": theWolf,
  griffin,
  carmilla,
  erik,
  dorian,
  varney,
  sweeney,
  jack,
  golem,
  horseman,
};

/**
 * Localized monster registry, keyed by slug then locale.
 * Missing locale entries fall back to English via getMonster().
 */
export const LOCALIZED_MONSTERS: Record<string, Partial<Record<Locale, Monster>>> = {
  dracula:        { en: dracula,     th: draculaTh },
  "the-creature": { en: theCreature, th: theCreatureTh },
  hyde:           { en: hyde,        th: hydeTh },
  "the-wolf":     { en: theWolf,     th: theWolfTh },
  griffin:        { en: griffin,     th: griffinTh },
  carmilla:       { en: carmilla,    th: carmillaTh },
  erik:           { en: erik,        th: erikTh },
  dorian:         { en: dorian,      th: dorianTh },
  varney:         { en: varney,      th: varneyTh },
  sweeney:        { en: sweeney,     th: sweeneyTh },
  jack:           { en: jack,        th: jackTh },
  golem:          { en: golem,       th: golemTh },
  horseman:       { en: horseman,    th: horsemanTh },
};

export const STUB_MONSTERS: Record<string, MonsterStub> = Object.fromEntries(
  STUBS.map((stub) => [stub.slug, stub]),
);

/**
 * Look up a monster by slug, returning the requested locale variant
 * when available. Falls back to English when a Thai translation is missing.
 */
export function getMonster(slug: string, locale: Locale = "en"): MonsterEntry | null {
  const entry = LOCALIZED_MONSTERS[slug];
  if (entry) return entry[locale] ?? entry.en ?? null;
  if (slug in STUB_MONSTERS) return STUB_MONSTERS[slug];
  return null;
}

export function getAllSlugs(): string[] {
  return [...Object.keys(LOCALIZED_MONSTERS), ...Object.keys(STUB_MONSTERS)];
}

export function listMonsters(locale: Locale = "en"): MonsterEntry[] {
  const full = Object.keys(LOCALIZED_MONSTERS)
    .map((slug) => LOCALIZED_MONSTERS[slug][locale] ?? LOCALIZED_MONSTERS[slug].en)
    .filter((m): m is Monster => !!m);
  return [...full, ...Object.values(STUB_MONSTERS)];
}
