import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/400-italic.css";
import { MotionProvider } from "@/components/a11y/MotionProvider";
import { LenisProvider } from "@/components/scroll/LenisProvider";
import { SkipLink } from "@/components/a11y/SkipLink";
import { LanguageSwitcher } from "@/components/a11y/LanguageSwitcher";
import { TransitionLayer } from "@/components/transitions/TransitionLayer";

export const metadata: Metadata = {
  title: "The Cabinet of Shadows",
  description:
    "The reconstructed casebook of an unnamed Victorian alienist who collected and studied the monsters of Gothic literature as if they were patients.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionProvider>
          <LenisProvider>
            <SkipLink />
            <LanguageSwitcher />
            <TransitionLayer />
            {children}
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
