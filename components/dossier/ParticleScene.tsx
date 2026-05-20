"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

const initEngine = async (engine: Engine) => {
  await loadSlim(engine);
};

interface ParticleSceneProps {
  slug: string;
  // ISourceOptions is the proper type but the surface area is huge and stable enough
  // to type loosely here without losing safety in the consumer.
  options: Record<string, unknown>;
}

export function ParticleScene({ slug, options }: ParticleSceneProps) {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id={`cos-particles-${slug}`}
        className="cos-particles"
        options={options}
      />
    </ParticlesProvider>
  );
}
