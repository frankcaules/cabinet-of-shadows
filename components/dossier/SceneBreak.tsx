import Image from "next/image";

interface SceneBreakProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/**
 * SceneBreak — full-bleed atmospheric illustration between major sections.
 * Acts as a visual "breath" so the reader can sit with the prose they've
 * just absorbed before the next section's argument begins.
 */
export function SceneBreak({ src, alt, width, height, caption }: SceneBreakProps) {
  return (
    <aside className="scene-break" aria-label="Atmospheric illustration">
      <div className="scene-break__frame">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 720px) 100vw, 60rem"
          className="scene-break__image"
        />
      </div>
      {caption && <p className="scene-break__caption">{caption}</p>}

      <style>{`
        .scene-break {
          margin: 6rem -1.25rem;
          padding: 0;
        }
        .scene-break__frame {
          position: relative;
          max-width: 60rem;
          margin: 0 auto;
          overflow: hidden;
          border-top: 1px solid var(--color-rule);
          border-bottom: 1px solid var(--color-rule);
        }
        .scene-break__frame::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, var(--color-bg) 0%, transparent 18%, transparent 82%, var(--color-bg) 100%);
          pointer-events: none;
        }
        .scene-break__image {
          display: block;
          width: 100%;
          height: auto;
          filter: contrast(1.08) saturate(0.78) brightness(0.92);
        }
        .scene-break__caption {
          max-width: 36rem;
          margin: 1.25rem auto 0;
          text-align: center;
          font-family: var(--font-accent, var(--font-body));
          font-style: italic;
          font-size: 0.85rem;
          opacity: 0.65;
          line-height: 1.45;
          padding: 0 1rem;
        }
      `}</style>
    </aside>
  );
}
