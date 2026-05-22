"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/data/types";

const STORAGE_KEY = "cos.intro.seen";

const COPY: Record<Locale, { eyebrow: string; title: string; body: string; small: string; cta: string }> = {
  en: {
    eyebrow: "A note from the alienist",
    title: "What you are reading",
    body: "This is a casebook — part literary essay, part clinical assessment. Each entry pairs a monster of Gothic literature with the psychological phenomenon they make legible. Every clinical claim is cited; the footnotes link to the source papers so that you may fact-check at your leisure.",
    small: "Use the numerals at the right edge to navigate the four chapters. Audio is off by default; the toggle is in the corner.",
    cta: "begin the case",
  },
  th: {
    eyebrow: "บันทึกจากอลีนิสต์",
    title: "ท่านกำลังอ่านสิ่งใด",
    body: "เอกสารฉบับนี้เป็นแฟ้มคดี — ส่วนหนึ่งคือบทวิจารณ์วรรณกรรม อีกส่วนคือการประเมินผลทางคลินิก แต่ละสำนวนจับคู่ปีศาจของวรรณกรรมกอธิคเข้ากับปรากฏการณ์ทางจิตวิทยาที่ผู้ป่วยนั้นเปิดเผยให้เห็น ทุกข้ออ้างทางคลินิกมีการอ้างอิง เชิงอรรถเชื่อมโยงไปยังเอกสารต้นทางเพื่อให้ท่านตรวจสอบได้ตามอัธยาศัย",
    small: "ใช้เลขโรมันที่ขอบขวาในการนำทางทั้งสี่บท เสียงปิดอยู่เป็นค่าตั้งต้น สวิตช์อยู่ที่มุมจอ",
    cta: "เริ่มสำนวน",
  },
};

/**
 * IntroCard — the alienist's one-time orientation note.
 *
 * Appears on first visit to any dossier, explains the conceit in two short
 * sentences, and dismisses on click. Sets a localStorage flag so it never
 * resurfaces. Skipped entirely if reduced-motion users press tab — fully
 * keyboard accessible.
 */
export function IntroCard({ locale = "en" }: { locale?: Locale }) {
  const copy = COPY[locale];
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = window.localStorage?.getItem?.(STORAGE_KEY) === "1";
      if (!seen) {
        // Tiny delay so the hero quote begins typing first
        const id = window.setTimeout(() => setOpen(true), 1200);
        return () => window.clearTimeout(id);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      window.localStorage?.setItem?.(STORAGE_KEY, "1");
    } catch {
      /* silent */
    }
  }

  if (!mounted || !open) return null;

  return (
    <div className="intro-card" role="dialog" aria-labelledby="intro-card-title" aria-modal="false">
      <div className="intro-card__inner">
        <p className="intro-card__eyebrow">{copy.eyebrow}</p>
        <h2 id="intro-card-title" className="intro-card__title">{copy.title}</h2>
        <p className="intro-card__body">{copy.body}</p>
        <p className="intro-card__body intro-card__body--small">{copy.small}</p>
        <button type="button" onClick={dismiss} className="intro-card__close">
          {copy.cta}
        </button>
      </div>

      <style>{`
        .intro-card {
          position: fixed;
          left: 50%;
          bottom: 1.5rem;
          transform: translateX(-50%);
          z-index: 90;
          max-width: min(30rem, calc(100vw - 2rem));
          width: 100%;
          background: rgba(11, 6, 8, 0.92);
          backdrop-filter: blur(6px);
          border: 1px solid var(--color-rule);
          padding: 1.5rem 1.5rem 1.25rem;
          box-shadow: 0 24px 60px -15px rgba(0,0,0,0.85), 0 0 80px -30px var(--color-accent);
          animation: cosIntroFloat 480ms cubic-bezier(.22,1,.36,1);
        }
        @keyframes cosIntroFloat {
          from { opacity: 0; transform: translate(-50%, 14px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-card { animation: none; }
        }
        .intro-card__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          opacity: 0.7;
          color: var(--color-accent);
          margin: 0 0 0.35rem;
        }
        .intro-card__title {
          font-family: var(--font-display, var(--font-display-default));
          font-style: italic;
          font-size: 1.4rem;
          margin: 0 0 0.85rem;
          line-height: 1.1;
        }
        .intro-card__body {
          font-family: var(--font-body, var(--font-body-default));
          font-size: 0.92rem;
          line-height: 1.55;
          margin: 0 0 0.6rem;
          opacity: 0.92;
        }
        .intro-card__body--small {
          font-size: 0.82rem;
          opacity: 0.7;
          font-style: italic;
        }
        .intro-card__close {
          margin-top: 0.85rem;
          padding: 0.55rem 1rem;
          background: transparent;
          border: 1px solid var(--color-accent);
          color: var(--color-ink);
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 180ms ease, color 180ms ease;
        }
        .intro-card__close:hover,
        .intro-card__close:focus-visible {
          background: var(--color-accent);
          color: var(--color-bg);
        }
      `}</style>
    </div>
  );
}
