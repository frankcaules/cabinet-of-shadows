import { FULL_MONSTERS } from "@/lib/data/monsters";
import type { Monster } from "@/lib/data/types";

export interface CabinetSlot {
  monster: Monster;
  position: [number, number, number]; // x, y, z in 3D space
  rotation: number; // small y-axis tilt in radians
  size: number; // scale multiplier for organic variance
  hueShift?: number; // not used; reserved
}

/**
 * Hand-tuned layout for the 13 monsters across the Cabinet desk.
 *
 *  +z (camera)  →  closer to the viewer
 *  -z           →  further into the room
 *
 *  Three rough depth tiers:
 *    near desk    (z ≈ 1.5)  — Dracula's letter, Hyde's vial, Sweeney's razor, Erik's mask, Carmilla's rose
 *    mid shelf    (z ≈ -0.5) — The Creature's jar, Dorian's frame, the Wolf's locket, Griffin's spectacles, Varney's papers
 *    far wall     (z ≈ -2.5) — Jack's broadsheet, the Golem's tablet, the Horseman's lantern
 */
const RAW: Array<{ slug: string; x: number; y: number; z: number; r: number; s: number }> = [
  // near tier — desk surface, lower band
  { slug: "dracula",      x: -4.2, y: -0.8, z:  1.6, r:  0.06, s: 1.05 },
  { slug: "hyde",         x: -1.6, y: -1.1, z:  1.8, r: -0.05, s: 0.95 },
  { slug: "carmilla",     x:  1.4, y: -0.9, z:  1.7, r:  0.04, s: 1.00 },
  { slug: "sweeney",      x:  3.9, y: -1.0, z:  1.5, r: -0.03, s: 1.02 },
  { slug: "erik",         x:  0.0, y: -0.4, z:  2.1, r:  0.00, s: 1.10 },

  // mid tier — first shelf
  { slug: "the-creature", x: -4.4, y:  1.0, z: -0.4, r:  0.04, s: 1.00 },
  { slug: "griffin",      x: -1.9, y:  1.3, z: -0.6, r: -0.03, s: 0.95 },
  { slug: "dorian",       x:  0.6, y:  1.4, z: -0.5, r:  0.05, s: 0.98 },
  { slug: "the-wolf",     x:  2.8, y:  1.1, z: -0.7, r: -0.04, s: 1.00 },
  { slug: "varney",       x:  4.7, y:  1.2, z: -0.5, r:  0.03, s: 0.95 },

  // far tier — back wall
  { slug: "jack",         x: -3.0, y:  2.9, z: -2.6, r: -0.02, s: 0.85 },
  { slug: "golem",        x:  0.0, y:  3.1, z: -2.8, r:  0.00, s: 0.90 },
  { slug: "horseman",     x:  3.2, y:  2.8, z: -2.4, r:  0.02, s: 0.88 },
];

export function getCabinetSlots(): CabinetSlot[] {
  return RAW.map((r) => {
    const monster = FULL_MONSTERS[r.slug];
    if (!monster) throw new Error(`Cabinet layout references missing monster: ${r.slug}`);
    return {
      monster,
      position: [r.x, r.y, r.z],
      rotation: r.r,
      size: r.s,
    };
  });
}
