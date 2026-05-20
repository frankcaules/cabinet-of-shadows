"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cos.audio";

function safeRead(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage?.getItem?.(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function safeWrite(value: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.setItem?.(STORAGE_KEY, value ? "on" : "off");
  } catch {
    /* localStorage may be disabled (private mode, quota); fail silently */
  }
}

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = safeRead();
    setEnabled(initial);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.audio = initial ? "on" : "off";
    }
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.audio = next ? "on" : "off";
    }
    safeWrite(next);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="audio-toggle"
        aria-label="Audio toggle (loading)"
        suppressHydrationWarning
        disabled
      >
        ◯
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="audio-toggle"
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient audio" : "Unmute ambient audio"}
      title={enabled ? "Audio: on" : "Audio: off"}
    >
      {enabled ? "♪" : "◯"}
    </button>
  );
}
