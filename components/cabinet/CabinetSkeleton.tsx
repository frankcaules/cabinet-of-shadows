/**
 * CabinetSkeleton
 * ----------------
 * Placeholder shown in the centre of the home stage while either:
 *   1. WebGL detection is still running on the client, or
 *   2. The Cabinet3D code-split chunk is still downloading, or
 *   3. The R3F scene is mounting and warming its first frame.
 *
 * Sits in the same vertical zone the 3D objects will occupy, so the page
 * does not visibly "jump" when the scene comes in. Pure CSS, no JS, no
 * extra dependencies.
 *
 * Design choices:
 *   • A row of 13 candlelight-gold dots — one per monster — that pulse
 *     in a slow left-to-right wave, like a cabinet of jars being lit
 *     in sequence.
 *   • A quiet "summoning the cabinet…" eyebrow above, matching the
 *     monospace voice used elsewhere for system text.
 *   • Honours prefers-reduced-motion: dots fade in static, no pulsing.
 *   • Marked aria-hidden because the visible "summoning…" hint plus the
 *     keyboard-accessible monster list (always rendered) cover screen
 *     readers; the dots are decorative.
 */

const MONSTER_COUNT = 13;

export function CabinetSkeleton() {
  return (
    <div className="cos-cabinet-skel" aria-hidden="true">
      <p className="cos-cabinet-skel__eyebrow">summoning the cabinet…</p>
      <ul className="cos-cabinet-skel__dots">
        {Array.from({ length: MONSTER_COUNT }, (_, i) => (
          <li
            key={i}
            className="cos-cabinet-skel__dot"
            style={{ ["--cos-i" as never]: i }}
          />
        ))}
      </ul>

      <style>{`
        .cos-cabinet-skel {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          place-content: center;
          gap: 1.4rem;
          pointer-events: none;
          /* Quietly fade in so it doesn't flash on a fast connection. */
          animation: cosCabinetSkelIn 480ms ease-out both;
        }
        .cos-cabinet-skel__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-size: 0.7rem;
          color: var(--color-cabinet-accent);
          opacity: 0.7;
          margin: 0;
          text-align: center;
          text-shadow: 0 2px 14px rgba(0,0,0,0.7);
        }
        .cos-cabinet-skel__dots {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 0.55rem;
          justify-content: center;
        }
        .cos-cabinet-skel__dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: var(--color-cabinet-accent);
          opacity: 0.25;
          box-shadow: 0 0 8px 0 var(--color-cabinet-accent);
          animation: cosCabinetSkelDot 1.6s ease-in-out infinite;
          animation-delay: calc(var(--cos-i, 0) * 90ms);
        }
        @keyframes cosCabinetSkelIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cosCabinetSkelDot {
          0%, 100% { opacity: 0.2; transform: scale(0.85); }
          50%      { opacity: 0.95; transform: scale(1.15); }
        }
        /* Mobile landscape — keep it tight so it doesn't push the lede. */
        @media (orientation: landscape) and (max-height: 480px) {
          .cos-cabinet-skel { gap: 0.7rem; }
          .cos-cabinet-skel__dot { width: 5px; height: 5px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cos-cabinet-skel { animation: none; }
          .cos-cabinet-skel__dot {
            animation: none;
            opacity: 0.6;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
