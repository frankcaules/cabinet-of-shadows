"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { CabinetSlot } from "./layout";
import type { Locale } from "@/lib/data/types";

interface MonsterObjectProps {
  slot: CabinetSlot;
  /** Index in the 13-element list; used to stagger the idle bob phase. */
  index: number;
  reduced: boolean;
  locale?: Locale;
}

/**
 * MonsterObject — a single sigil card floating in the Cabinet.
 *
 *  - texture-mapped plane carrying the monster's SVG sigil
 *  - soft accent-colour glow plane behind it (additive blending)
 *  - HTML label sliding up on hover
 *  - lift + scale on hover; click navigates to the dossier
 *  - subtle bob driven by useFrame, phase-shifted by index
 */
export function MonsterObject({ slot, index, reduced, locale = "en" }: MonsterObjectProps) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const sigilTexture = useTexture(slot.monster.sigil);
  sigilTexture.colorSpace = THREE.SRGBColorSpace;
  sigilTexture.minFilter = THREE.LinearFilter;
  sigilTexture.magFilter = THREE.LinearFilter;
  sigilTexture.anisotropy = 8;

  const baseScale = slot.size;
  const hoverLift = hovered ? 0.4 : 0;
  const accent = new THREE.Color(slot.monster.palette.accent);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Bob phase per object for organic float
    const t = state.clock.elapsedTime;
    const bob = reduced ? 0 : Math.sin(t * 0.6 + index * 0.7) * 0.06;

    // Target position with hover lift
    const tx = slot.position[0];
    const ty = slot.position[1] + bob + hoverLift;
    const tz = slot.position[2] + (hovered ? 0.6 : 0);
    groupRef.current.position.lerp(new THREE.Vector3(tx, ty, tz), 0.12);

    // Hover scale
    const targetScale = baseScale * (hovered ? 1.08 : 1) * (pressed ? 0.96 : 1);
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

    // Glow pulses on hover
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = hovered ? 0.85 : 0.32;
      mat.opacity += (targetOpacity - mat.opacity) * 0.12;
    }
  });

  function onClick(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setPressed(true);
    // Tiny press feedback before navigation
    setTimeout(() => router.push(`/${locale}/dossier/${slot.monster.slug}`), 120);
  }

  return (
    <group
      ref={groupRef}
      position={slot.position}
      rotation={[0, slot.rotation, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); setPressed(false); document.body.style.cursor = "default"; }}
      onPointerDown={(e) => { e.stopPropagation(); setPressed(true); }}
      onPointerUp={(e) => { e.stopPropagation(); setPressed(false); }}
      onClick={onClick}
    >
      {/* glow plane behind */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[2.0, 2.0]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* sigil card */}
      <mesh>
        <planeGeometry args={[1.25, 1.25]} />
        <meshBasicMaterial
          map={sigilTexture}
          transparent
          alphaTest={0.02}
          toneMapped={false}
        />
      </mesh>

      {/* HTML label — emerges on hover */}
      <Html
        position={[0, -1.05, 0.1]}
        center
        style={{
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 220ms ease",
          textAlign: "center",
          width: "12rem",
        }}
        distanceFactor={6.5}
        occlude={false}
      >
        <div className="cabinet-label" style={{ color: slot.monster.palette.ink }}>
          <div className="cabinet-label__name" style={{ fontFamily: slot.monster.typography.display }}>
            {slot.monster.name}
          </div>
          <div className="cabinet-label__epithet" style={{ color: slot.monster.palette.accent }}>
            {slot.monster.epithet}
          </div>
        </div>
      </Html>
    </group>
  );
}
