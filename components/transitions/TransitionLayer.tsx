"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TRANSITION_REGISTRY } from "./transitionRegistry";
import { TransitionMedia } from "./TransitionMedia";
import { getMonster } from "@/lib/data/monsters";

/**
 * TransitionLayer
 * ---------------
 * Mounted once in the root layout. Watches pathname; whenever the new route
 * is a registered dossier, plays its transition: a painted ComfyUI backdrop
 * (TransitionMedia), an SVG transition (the GSAP primitive), and an optional
 * audio stinger — all keyed to the per-monster slug.
 *
 * The TransitionMedia component handles the painted backdrop + stinger audio,
 * the SVG transition handles the animated primitives. Both unmount together
 * via the `key` reset.
 */
export function TransitionLayer() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    setActivePath(pathname);
  }, [pathname]);

  if (!activePath) return null;

  const match = activePath.match(/^\/dossier\/([^/]+)/);
  const slug = match?.[1];
  const monster = slug ? getMonster(slug) : null;
  const TransitionComponent = monster ? TRANSITION_REGISTRY[monster.transition] : undefined;
  if (!TransitionComponent || !slug) return null;

  return (
    <>
      <TransitionMedia key={`media-${activePath}`} slug={slug} />
      <TransitionComponent
        key={activePath}
        onComplete={() => setActivePath((p) => (p === activePath ? null : p))}
      />
    </>
  );
}
