import type { ComponentType } from "react";
import type { TransitionId } from "@/lib/data/types";
import { DraculaTransition } from "./DraculaTransition";
import { CreatureTransition } from "./CreatureTransition";
import { HydeTransition } from "./HydeTransition";
import { WolfTransition } from "./WolfTransition";
import {
  GriffinTransition,
  CarmillaTransition,
  ErikTransition,
  DorianTransition,
  VarneyTransition,
  SweeneyTransition,
  JackTransition,
  GolemTransition,
  HorsemanTransition,
} from "./PhaseTwoTransitions";

export interface TransitionProps {
  onComplete: () => void;
}

export const TRANSITION_REGISTRY: Record<TransitionId, ComponentType<TransitionProps>> = {
  "bat-swarm": DraculaTransition,
  "lightning-suture": CreatureTransition,
  "chemical-morph": HydeTransition,
  "claw-rake": WolfTransition,
  "bandage-unwrap": GriffinTransition,
  "silk-curtain": CarmillaTransition,
  "opera-curtain": ErikTransition,
  "portrait-age": DorianTransition,
  "newsprint-flutter": VarneyTransition,
  "razor-slice": SweeneyTransition,
  "spring-leap": JackTransition,
  "clay-dust": GolemTransition,
  "pumpkin-arc": HorsemanTransition,
};
