"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/components/a11y/MotionProvider";
import type { Locale } from "@/lib/data/types";
import { MonsterObject } from "./MonsterObject";
import { getCabinetSlots } from "./layout";

/**
 * CameraRig — gentle mouse parallax + idle drift around a fixed target.
 */
function CameraRig({ reduced }: { reduced: boolean }) {
  const mouse = useRef({ x: 0, y: 0 });
  const { camera, gl } = useThree();

  // We register a pointermove listener on the canvas element only.
  // This keeps the parallax effect scoped to the Cabinet section.
  // (R3F's `mouse` is also available but normalises across the whole
  //  viewport; we want canvas-local for the same effect.)
  // Subscribe via the canvas's parent element so labels above don't lose hover.
  const target = new THREE.Vector3(0, 0.3, 0);

  useFrame((state) => {
    if (reduced) {
      camera.position.set(0, 0.4, 8);
      camera.lookAt(target);
      return;
    }
    const t = state.clock.elapsedTime;
    // idle drift
    const idleX = Math.sin(t * 0.15) * 0.35;
    const idleY = Math.sin(t * 0.11 + 1.2) * 0.18;

    // mouse contribution
    const mx = state.mouse.x; // -1..1
    const my = state.mouse.y; // -1..1
    const targetX = idleX + mx * 1.2;
    const targetY = 0.4 + idleY + my * 0.6;
    const targetZ = 8 + my * 0.2;

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.04);
    camera.lookAt(target);
  });

  return null;
}

function CabinetScene({ reduced, locale }: { reduced: boolean; locale: Locale }) {
  const slots = getCabinetSlots(locale);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.4, 8]} fov={42} near={0.1} far={50} />
      <CameraRig reduced={reduced} />

      <ambientLight intensity={0.55} color="#E8DCC4" />
      <pointLight position={[-6, 2, 4]} intensity={28} color="#D4A574" distance={20} decay={1.5} />
      <pointLight position={[ 6, 2, 4]} intensity={20} color="#B8A06A" distance={20} decay={1.5} />
      <pointLight position={[0, 3, 6]} intensity={12} color="#E8DCC4" distance={14} decay={1.8} />

      {slots.map((slot, i) => (
        <MonsterObject key={slot.monster.slug} slot={slot} index={i} reduced={reduced} locale={locale} />
      ))}
    </>
  );
}

export function Cabinet3D({ locale = "en" }: { locale?: Locale }) {
  const reduced = useReducedMotion();

  return (
    <div className="cabinet-3d" aria-hidden="false">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.4, 8], fov: 42 }}
        style={{ position: "absolute", inset: 0 }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <CabinetScene reduced={reduced} locale={locale} />
          <Preload all />
        </Suspense>
      </Canvas>

      <style>{`
        .cabinet-3d {
          position: absolute;
          inset: 0;
          background: transparent;
        }
        :global(.cabinet-label) {
          padding: 0.45rem 0.7rem 0.4rem;
          background: linear-gradient(180deg, rgba(11,6,8,0.92), rgba(11,6,8,0.78));
          backdrop-filter: blur(4px);
          border: 1px solid rgba(212,165,116,0.28);
          box-shadow: 0 4px 14px -4px rgba(0,0,0,0.7);
          text-align: center;
          font-feature-settings: "kern", "liga";
          min-width: 8rem;
        }
        :global(.cabinet-label__name) {
          font-style: italic;
          font-size: 1rem;
          line-height: 1.15;
        }
        :global(.cabinet-label__epithet) {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.9;
          margin-top: 0.2rem;
        }
      `}</style>
    </div>
  );
}
