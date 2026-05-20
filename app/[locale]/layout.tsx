import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/data/types";

// Thai web font — loaded only on Thai locale routes via CSS class
import "@fontsource/sarabun/400.css";
import "@fontsource/sarabun/600.css";
import "@fontsource/sarabun/400-italic.css";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Per-locale layout. Validates the locale param, sets a `data-locale`
 * attribute on a wrapper div so CSS can swap fonts/letter-spacing for
 * Thai (which reads better at slightly larger size + tighter line-height
 * than the EB Garamond defaults).
 */
export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();
  return (
    <div data-locale={locale} className="cos-locale-root">
      {children}
    </div>
  );
}
