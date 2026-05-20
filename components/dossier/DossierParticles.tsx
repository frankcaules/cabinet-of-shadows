"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "@/components/a11y/MotionProvider";

/**
 * DossierParticles
 * ----------------
 * Subtle full-viewport atmospheric particle layer, gated on a particles
 * profile per monster. The intent is texture, not spectacle — particles
 * sit at very low opacity behind the content. Disabled entirely when
 * prefers-reduced-motion is set.
 */

type Profile =
  | "fog"      // Dracula — slow drifting carpathian mist
  | "embers"   // Sweeney — Fleet Street fire-glow embers
  | "petals"   // Carmilla — rose petals from the side
  | "snow"     // The Creature — arctic snow drift
  | "vapor"    // Hyde — rising green ether vapor
  | "moon"     // Wolf — silvery moondust descending
  | "dust"     // Griffin / Golem — disturbed motes in still air
  | "ash"      // Varney — falling ash from offstage thunder
  | "notes"    // Erik — drifting musical glyphs
  | "flecks"   // Dorian — gilded paint flecks
  | "fog-cold" // Jack — yellow gaslit London fog
  | "leaves";  // Horseman — autumn leaves blowing across

const PROFILES: Record<string, Profile> = {
  dracula: "fog",
  "the-creature": "snow",
  hyde: "vapor",
  "the-wolf": "moon",
  griffin: "dust",
  carmilla: "petals",
  erik: "notes",
  dorian: "flecks",
  varney: "ash",
  sweeney: "embers",
  jack: "fog-cold",
  golem: "dust",
  horseman: "leaves",
};

function getOptions(profile: Profile, accent: string) {
  const base = {
    fullScreen: { enable: false },
    fpsLimit: 45,
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    background: { color: "transparent" },
  };

  switch (profile) {
    case "fog":
      return {
        ...base,
        particles: {
          number: { value: 18, density: { enable: true, area: 900 } },
          color: { value: "#5C0A0A" },
          shape: { type: "circle" },
          opacity: { value: { min: 0.05, max: 0.22 } },
          size: { value: { min: 80, max: 180 } },
          move: { enable: true, speed: 0.15, direction: "right", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "embers":
      return {
        ...base,
        particles: {
          number: { value: 30, density: { enable: true, area: 800 } },
          color: { value: ["#9C1B1B", "#D49B3D", "#FFE38C"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.4, max: 0.9 }, animation: { enable: true, speed: 1.2 } },
          size: { value: { min: 0.6, max: 2.2 } },
          move: { enable: true, speed: { min: 0.4, max: 1.2 }, direction: "top-right", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "petals":
      return {
        ...base,
        particles: {
          number: { value: 14, density: { enable: true, area: 900 } },
          color: { value: ["#B58AB0", "#7A1A2A", "#DDD3E8"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.4, max: 0.75 } },
          size: { value: { min: 2, max: 5 } },
          move: {
            enable: true, speed: { min: 0.5, max: 1.2 }, direction: "bottom",
            outModes: { default: "out" }, drift: { min: -0.4, max: 0.4 }, straight: false, random: true,
            angle: { value: 30, offset: 0 },
          },
          rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 6 } },
        },
      };
    case "snow":
      return {
        ...base,
        particles: {
          number: { value: 60, density: { enable: true, area: 1200 } },
          color: { value: "#E5DDC8" },
          shape: { type: "circle" },
          opacity: { value: { min: 0.3, max: 0.85 } },
          size: { value: { min: 0.5, max: 2.4 } },
          move: { enable: true, speed: { min: 0.3, max: 1 }, direction: "bottom-left", outModes: { default: "out" }, straight: false, drift: { min: -0.5, max: 0.5 } },
        },
      };
    case "vapor":
      return {
        ...base,
        particles: {
          number: { value: 12, density: { enable: true, area: 1000 } },
          color: { value: "#6B8E4E" },
          shape: { type: "circle" },
          opacity: { value: { min: 0.05, max: 0.32 } },
          size: { value: { min: 70, max: 160 } },
          move: { enable: true, speed: { min: 0.15, max: 0.4 }, direction: "top", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "moon":
      return {
        ...base,
        particles: {
          number: { value: 35, density: { enable: true, area: 1100 } },
          color: { value: ["#D9D9D9", "#B8D4D8", "#E2DCC8"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.15, max: 0.55 } },
          size: { value: { min: 0.4, max: 1.5 } },
          move: { enable: true, speed: { min: 0.1, max: 0.45 }, direction: "bottom", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "dust":
      return {
        ...base,
        particles: {
          number: { value: 40, density: { enable: true, area: 1200 } },
          color: { value: accent },
          shape: { type: "circle" },
          opacity: { value: { min: 0.08, max: 0.35 } },
          size: { value: { min: 0.4, max: 1.6 } },
          move: { enable: true, speed: { min: 0.05, max: 0.25 }, direction: "none", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "ash":
      return {
        ...base,
        particles: {
          number: { value: 22, density: { enable: true, area: 900 } },
          color: { value: ["#D4C896", "#6B7280"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.2, max: 0.55 } },
          size: { value: { min: 0.6, max: 2.0 } },
          move: { enable: true, speed: { min: 0.3, max: 0.8 }, direction: "bottom", outModes: { default: "out" }, straight: false, drift: { min: -0.6, max: 0.6 } },
        },
      };
    case "notes":
      return {
        ...base,
        particles: {
          number: { value: 12, density: { enable: true, area: 1100 } },
          color: { value: "#BFA34A" },
          shape: { type: "char", options: { char: { value: ["♪", "♫", "♩"], font: "serif", style: "", weight: "400" } } },
          opacity: { value: { min: 0.18, max: 0.55 } },
          size: { value: { min: 8, max: 18 } },
          move: { enable: true, speed: { min: 0.3, max: 0.8 }, direction: "top", outModes: { default: "out" }, straight: false, random: true },
          rotate: { value: { min: -20, max: 20 }, animation: { enable: true, speed: 4 } },
        },
      };
    case "flecks":
      return {
        ...base,
        particles: {
          number: { value: 26, density: { enable: true, area: 1100 } },
          color: { value: ["#B89D4F", "#F0E8D5"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.15, max: 0.6 } },
          size: { value: { min: 0.5, max: 2.2 } },
          move: { enable: true, speed: { min: 0.1, max: 0.4 }, direction: "bottom", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "fog-cold":
      return {
        ...base,
        particles: {
          number: { value: 16, density: { enable: true, area: 1000 } },
          color: { value: "#E3B23C" },
          shape: { type: "circle" },
          opacity: { value: { min: 0.04, max: 0.18 } },
          size: { value: { min: 90, max: 200 } },
          move: { enable: true, speed: 0.18, direction: "right", outModes: { default: "out" }, straight: false, random: true },
        },
      };
    case "leaves":
      return {
        ...base,
        particles: {
          number: { value: 14, density: { enable: true, area: 1000 } },
          color: { value: ["#D9601A", "#8B4A2C", "#E8D9B8"] },
          shape: { type: "circle" },
          opacity: { value: { min: 0.4, max: 0.85 } },
          size: { value: { min: 2, max: 5 } },
          move: { enable: true, speed: { min: 0.5, max: 1.8 }, direction: "right", outModes: { default: "out" }, straight: false, drift: { min: -0.4, max: 0.4 } },
          rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 8 } },
        },
      };
  }
}

// Lazy-load the entire particle scene so tsparticles ships only when needed.
const ParticleScene = dynamic(
  () => import("./ParticleScene").then((m) => ({ default: m.ParticleScene })),
  { ssr: false, loading: () => null },
);

export function DossierParticles({ slug, accent }: { slug: string; accent: string }) {
  const reduced = useReducedMotion();
  const profile = PROFILES[slug];
  const options = useMemo(() => (profile ? getOptions(profile, accent) : null), [profile, accent]);

  if (reduced || !profile || !options) return null;
  return <ParticleScene slug={slug} options={options} />;
}
