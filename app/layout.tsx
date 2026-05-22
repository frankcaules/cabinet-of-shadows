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
import { RepoLink } from "@/components/a11y/RepoLink";
import { TransitionLayer } from "@/components/transitions/TransitionLayer";

const SITE_URL = "https://cabinetofshadows.me";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Cabinet of Shadows",
    template: "%s · The Cabinet of Shadows",
  },
  description:
    "The reconstructed casebook of an unnamed Victorian alienist who collected and studied the monsters of Gothic literature as if they were patients.",
  applicationName: "The Cabinet of Shadows",
  authors: [{ name: "Frank Caules" }],
  generator: undefined,
  keywords: [
    "Gothic literature",
    "Victorian psychiatry",
    "alienist",
    "Dracula",
    "Frankenstein",
    "Carmilla",
    "Mr. Hyde",
    "psychology of horror",
    "literary monsters",
    "peer-reviewed casebook",
  ],
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "th": "/th",
    },
  },
  openGraph: {
    type: "website",
    siteName: "The Cabinet of Shadows",
    title: "The Cabinet of Shadows",
    description:
      "A casebook in thirteen parts: the monsters of Gothic literature read through peer-reviewed psychology, fully cited.",
    url: SITE_URL,
    locale: "en_US",
    alternateLocale: ["th_TH"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cabinet of Shadows",
    description:
      "A Victorian alienist's casebook of the monsters of Gothic literature.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "literature",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <MotionProvider>
          <LenisProvider>
            <SkipLink />
            <RepoLink />
            <LanguageSwitcher />
            <TransitionLayer />
            {children}
          </LenisProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
