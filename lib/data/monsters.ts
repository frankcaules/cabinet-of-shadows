import type { Monster, MonsterEntry, MonsterStub } from "./types";
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

export const STUB_MONSTERS: Record<string, MonsterStub> = Object.fromEntries(
  STUBS.map((stub) => [stub.slug, stub]),
);

export function getMonster(slug: string): MonsterEntry | null {
  if (slug in FULL_MONSTERS) return FULL_MONSTERS[slug];
  if (slug in STUB_MONSTERS) return STUB_MONSTERS[slug];
  return null;
}

export function getAllSlugs(): string[] {
  return [...Object.keys(FULL_MONSTERS), ...Object.keys(STUB_MONSTERS)];
}

export function listMonsters(): MonsterEntry[] {
  return [
    ...Object.values(FULL_MONSTERS),
    ...Object.values(STUB_MONSTERS),
  ];
}
