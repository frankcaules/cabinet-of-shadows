import { notFound } from "next/navigation";
import { CabinetClient } from "@/components/cabinet/CabinetClient";
import { LOCALES, type Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function CabinetHome({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  return (
    <CabinetClient
      title={t(locale, "siteTitle")}
      lede={t(locale, "homeLede")}
      small={t(locale, "siteSubtitle")}
      locale={locale}
    />
  );
}
