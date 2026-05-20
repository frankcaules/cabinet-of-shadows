"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getMonster } from "@/lib/data/monsters";
import { useReducedMotion } from "@/components/a11y/MotionProvider";

/**
 * AmbientAudio
 * -------------
 * Watches the audio toggle (the `data-audio` attribute on <html>) and
 * the current dossier route. When enabled, loads the monster's ambient
 * track via Howler and plays it on loop at low volume. Disabled on
 * reduced motion. Silently no-ops if no audio file is reachable.
 *
 *  - Cross-fades when navigating between dossiers
 *  - Pauses on document.hidden (background tab)
 *  - Pre-flight HEAD request avoids 404 noise on missing files
 */
export function AmbientAudio() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const howlRef = useRef<unknown>(null);
  const currentSrcRef = useRef<string | null>(null);

  // Subscribe to the data-audio attribute on <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    const update = () => setEnabled(html.dataset.audio === "on");
    update();
    const obs = new MutationObserver(update);
    obs.observe(html, { attributes: true, attributeFilter: ["data-audio"] });
    return () => obs.disconnect();
  }, []);

  // Background tab pause
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => {
      const h = howlRef.current as { pause?: () => void; play?: () => void } | null;
      if (!h) return;
      if (document.hidden) h.pause?.();
      else if (enabled) h.play?.();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [enabled]);

  // Stinger ducking — TransitionMedia fires `cos:duck` with { ms } when it
  // plays a transition stinger. We drop the ambient bed to a very low
  // level for ~80% of the duck duration, then ramp it back to normal so
  // the stinger lands cleanly without competing with the score.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const NORMAL = 0.18;
    const DUCKED = 0.025;
    const onDuck = (e: Event) => {
      const ev = e as CustomEvent<{ ms?: number }>;
      const total = ev.detail?.ms ?? 3000;
      const h = howlRef.current as {
        fade?: (a: number, b: number, c: number) => void;
        volume?: () => number;
      } | null;
      if (!h?.fade || !h?.volume) return;
      const start = h.volume();
      // Fast fade DOWN for the impact, slow fade UP to recover smoothly
      h.fade(start, DUCKED, 280);
      window.setTimeout(() => {
        h.fade?.(DUCKED, NORMAL, Math.max(600, total - 800));
      }, Math.round(total * 0.55));
    };
    window.addEventListener("cos:duck", onDuck);
    return () => window.removeEventListener("cos:duck", onDuck);
  }, []);

  // Load + play the current monster's ambient when enabled
  useEffect(() => {
    if (reduced) return;
    if (!enabled) {
      const h = howlRef.current as { fade?: (a: number, b: number, c: number) => void; volume?: () => number; stop?: () => void; unload?: () => void } | null;
      if (h) {
        h.fade?.(h.volume?.() ?? 0.18, 0, 700);
        setTimeout(() => { h.stop?.(); h.unload?.(); howlRef.current = null; currentSrcRef.current = null; }, 760);
      }
      return;
    }

    if (!pathname) return;

    // Decide which track to play:
    //   /dossier/<slug>   → that monster's composition (if "full" record)
    //   /                 → cabinet hub theme (G minor adagio)
    //   /the-alienist     → cabinet hub theme (carried through)
    //   /sources          → cabinet hub theme (carried through)
    let src: string | null = null;
    const m = pathname.match(/^\/dossier\/([^/]+)/);
    if (m) {
      const slug = m[1];
      const monster = slug ? getMonster(slug) : null;
      if (monster && monster.status === "full") {
        src = monster.audio.ambient;
      }
    } else {
      // hub / framing-fiction / bibliography all share the cabinet adagio
      src = "/audio/ambient/cabinet-ambient.opus";
    }
    if (!src || src === currentSrcRef.current) return;

    let cancelled = false;
    (async () => {
      // Pre-flight: only load if the file is actually there
      try {
        const head = await fetch(src, { method: "HEAD" });
        if (!head.ok) return;
      } catch {
        return;
      }
      if (cancelled) return;

      const { Howl } = await import("howler");
      if (cancelled) return;

      // Cross-fade out the previous
      const prev = howlRef.current as { fade?: (a: number, b: number, c: number) => void; volume?: () => number; stop?: () => void; unload?: () => void } | null;
      if (prev) {
        prev.fade?.(prev.volume?.() ?? 0.18, 0, 600);
        setTimeout(() => { prev.stop?.(); prev.unload?.(); }, 650);
      }

      const next = new Howl({
        src: [src],
        loop: true,
        volume: 0,
        html5: true,
        preload: true,
        onloaderror: () => {
          // Silent fail — file was advertised but unplayable
          if (howlRef.current === next) {
            howlRef.current = null;
            currentSrcRef.current = null;
          }
        },
        onplayerror: () => {
          // user-gesture required; ignore
        },
      });
      howlRef.current = next;
      currentSrcRef.current = src;
      next.play();
      next.fade(0, 0.18, 900);
    })();

    return () => { cancelled = true; };
  }, [enabled, pathname, reduced]);

  return null;
}
