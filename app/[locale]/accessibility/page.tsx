import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";
import { Colophon } from "@/components/site/Colophon";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Accessibility",
  description:
    "The Cabinet of Shadows is built to be read by everyone. This page documents how, and how to report problems.",
};

interface AccessCopy {
  eyebrow: string;
  title: string;
  lede: string;
  lastUpdated: string;
  back: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  signature: string;
}

const COPY: Record<Locale, AccessCopy> = {
  en: {
    eyebrow: "A note on access",
    title: "Accessibility statement",
    lede: "The Cabinet is built to be read by everyone, on whatever device or with whatever assistive technology is in front of you. This page records what we have done, and what to do if we have missed something.",
    lastUpdated: "Last reviewed: May 2026",
    back: "← back to the Cabinet",
    sections: [
      {
        heading: "Conformance target",
        paragraphs: [
          "We aim for conformance with the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA. We do not yet claim formal conformance; we claim that we have built the site with those criteria in mind, that we test against them, and that we will fix any failure a reader reports.",
        ],
      },
      {
        heading: "What works well",
        paragraphs: [
          "Every page is keyboard-navigable from start to finish. The first focusable element on every page is a skip-to-content link. The Cabinet hub on the home page, which is rendered in 3D, has a parallel keyboard-accessible list of the thirteen dossiers, always present in the DOM, so a screen-reader user can navigate to any dossier directly without engaging the 3D scene at all.",
          "All decorative imagery has empty alt text or aria-hidden so it does not clutter the screen-reader pass. All informative imagery has descriptive alternative text. Citation links to DOIs are real, focusable, underlined hyperlinks that say what they go to.",
          "All text honours your system's reduced-motion preference. With prefers-reduced-motion: reduce set, the smooth-scrolling library disables itself, the transitions between dossiers collapse to a quiet fade under 300 ms, the 3D Cabinet falls back to a static still-life illustration, and all decorative animation stops.",
          "The site is bilingual in English and Thai. The language switcher is in the top-right of every page and is keyboard-accessible. The currently active language is marked on the html element with the correct lang attribute, so screen readers pick the right pronunciation rules.",
        ],
      },
      {
        heading: "Colour and contrast",
        paragraphs: [
          "The site's default palette is bone-on-shadow — warm ivory text on near-black — which holds above 4.5:1 contrast for body type and above 3:1 for large display type, meeting WCAG AA. Each monster dossier carries its own accent colour, used sparingly for links and section rules; the body type within each dossier remains the same bone-on-shadow as the rest of the site.",
        ],
      },
      {
        heading: "Typography and reading",
        paragraphs: [
          "Body type is set in EB Garamond at a size that scales with the viewport, never below 16 px effective. Thai body type is set in Sarabun, which has been chosen specifically for its legibility at long reading distances. Line lengths are constrained to about 60–70 characters in English and a comparable measure in Thai. Line height is 1.55 for English and slightly looser for Thai. Headings use the Gothic display fonts that give each dossier its mood, but the body type never does.",
          "Browser zoom up to 200 percent is supported without horizontal scrolling. The layout reflows; nothing is hidden.",
        ],
      },
      {
        heading: "Screen readers and semantics",
        paragraphs: [
          "Every page uses correct HTML5 sectioning: one h1 per page, headings stepping down in order, lists marked up as lists, citations as numbered ordered lists. ARIA is used sparingly — generally only on the small number of widgets where native HTML cannot carry the meaning (the 3D Cabinet's parallel keyboard list, the language switcher).",
          "We test with VoiceOver on macOS and NVDA on Windows. We do not yet claim to have tested with every combination of screen reader and browser in the world; if you find a problem, please write to us.",
        ],
      },
      {
        heading: "What does not work, or works less well",
        paragraphs: [
          "The 3D Cabinet on the home page is, by its nature, a visual experience. The fallback keyboard list is the accessible path through it, but the 3D scene itself is not narrated. We consider this acceptable because (a) the fallback covers the full navigation, (b) the keyboard list is always there, not hidden behind a toggle, and (c) the visual scene contributes atmosphere, not information.",
          "Some of the dossier transitions between pages contain brief animated elements — bats, lightning, drifting bandages. With prefers-reduced-motion: reduce these are replaced with a quiet fade. Without that preference set, they last 1.5 to 2 seconds and do not flash at a rate that could trigger photosensitive seizures (we have checked against the WCAG 2.3.1 three-flashes-or-below threshold).",
        ],
      },
      {
        heading: "Mobile and touch",
        paragraphs: [
          "The site is responsive down to a 320 px viewport. All interactive targets — the thirteen Cabinet objects, the language switcher, the citation links, the in-page navigation — are sized to meet the WCAG 2.5.5 minimum target size of 24 by 24 CSS pixels, and most are considerably larger. Long body text remains the priority on mobile; we do not collapse the prose into snippets.",
        ],
      },
      {
        heading: "Reporting a problem",
        paragraphs: [
          "If anything on this site is hard to use with the assistive technology you rely on, or hard to read for any other reason, please write to frank.caules@gmail.com with subject [accessibility]. Describe what you were trying to do, what got in the way, and what device or assistive technology you were using. We treat accessibility bugs at the same priority as security bugs: we will acknowledge within 72 hours and fix as soon as we can.",
          "If a fix is simple, we will deploy it directly. If a fix touches the underlying architecture, we will document the change in the public commit history of the site's source code, which is open at github.com/ncsergiis/cabinet-of-shadows.",
        ],
      },
    ],
    signature: "— the Editors",
  },
  th: {
    eyebrow: "บันทึกว่าด้วยการเข้าถึง",
    title: "ประกาศว่าด้วยการเข้าถึง",
    lede: "ตู้แห่งเงาถูกสร้างขึ้นเพื่อให้ทุกคนอ่านได้ ไม่ว่าจะใช้อุปกรณ์ใดหรือเทคโนโลยีช่วยใด หน้านี้บันทึกสิ่งที่เราได้ทำ และสิ่งที่ควรทำหากเรามองข้ามอะไรไป",
    lastUpdated: "ตรวจทานครั้งล่าสุด: พฤษภาคม ค.ศ. 2026",
    back: "← กลับสู่ตู้แห่งเงา",
    sections: [
      {
        heading: "เป้าหมายการปฏิบัติตาม",
        paragraphs: [
          "เรามุ่งเป้าให้สอดคล้องกับแนวทาง Web Content Accessibility Guidelines (WCAG) 2.2 ระดับ AA เรายังมิได้อ้างความสอดคล้องอย่างเป็นทางการ แต่อ้างว่าเราสร้างเว็บไซต์โดยคำนึงถึงเกณฑ์เหล่านั้น ทดสอบกับเกณฑ์เหล่านั้น และจะแก้ไขข้อบกพร่องใด ๆ ที่ผู้อ่านชี้ให้เห็น",
        ],
      },
      {
        heading: "สิ่งที่ทำงานได้ดี",
        paragraphs: [
          "ทุกหน้าใช้แป้นพิมพ์นำทางได้ตั้งแต่ต้นจนจบ องค์ประกอบแรกที่โฟกัสได้ของทุกหน้าคือลิงก์ข้ามไปยังเนื้อหา ตู้แห่งเงาบนหน้าแรกซึ่งแสดงผลใน 3 มิติ มีรายการคู่ขนานของสำนวนทั้งสิบสามที่เข้าถึงได้ด้วยแป้นพิมพ์ คงอยู่ใน DOM เสมอ เพื่อให้ผู้ใช้โปรแกรมอ่านหน้าจอนำทางไปยังสำนวนใดได้โดยตรงโดยไม่ต้องมีปฏิสัมพันธ์กับฉาก 3 มิติเลย",
          "ภาพประกอบเชิงตกแต่งทุกชิ้นมี alt text ว่างเปล่าหรือ aria-hidden เพื่อมิให้รก ภาพประกอบที่ให้ข้อมูลทุกชิ้นมีข้อความทดแทนที่อธิบายเนื้อหา ลิงก์อ้างอิงไปยัง DOI เป็นไฮเปอร์ลิงก์จริง โฟกัสได้ ขีดเส้นใต้ และระบุปลายทาง",
          "ข้อความทั้งหมดเคารพค่า prefers-reduced-motion ของระบบของท่าน เมื่อตั้งเป็น reduce ไลบรารีเลื่อนนุ่มจะปิดตัวเอง การเปลี่ยนผ่านระหว่างสำนวนจะหุบลงเป็นการ fade เงียบ ๆ ภายใน 300 มิลลิวินาที ตู้แห่งเงาแบบ 3 มิติจะถอยลงไปเป็นภาพประกอบนิ่ง และแอนิเมชันเชิงตกแต่งทั้งหมดจะหยุด",
          "เว็บไซต์รองรับสองภาษา อังกฤษและไทย สวิตช์ภาษาอยู่ที่มุมขวาบนของทุกหน้าและเข้าถึงได้ด้วยแป้นพิมพ์ ภาษาที่ใช้งานปัจจุบันถูกระบุบน html element ด้วย lang attribute ที่ถูกต้อง เพื่อให้โปรแกรมอ่านหน้าจอเลือกกฎการออกเสียงที่ถูก",
        ],
      },
      {
        heading: "สีและความต่าง",
        paragraphs: [
          "จานสีเริ่มต้นของเว็บไซต์คือสีกระดูกบนเงา ตัวอักษรสีงาช้างอบอุ่นบนพื้นเกือบดำ ซึ่งคงความต่างเกิน 4.5:1 สำหรับตัวเนื้อหา และเกิน 3:1 สำหรับตัวแสดงผลขนาดใหญ่ เป็นไปตามมาตรฐาน WCAG AA สำนวนแต่ละเรื่องมีสีเน้นของตัวเอง ใช้อย่างประหยัดเฉพาะลิงก์และเส้นแบ่งส่วน ตัวเนื้อหาภายในสำนวนยังคงเป็นกระดูกบนเงาเหมือนส่วนอื่นของเว็บไซต์",
        ],
      },
      {
        heading: "การพิมพ์และการอ่าน",
        paragraphs: [
          "ตัวเนื้อหาภาษาอังกฤษใช้ EB Garamond ขนาดปรับตามวิวพอร์ต ไม่ต่ำกว่า 16 พิกเซลที่มีผลใช้งาน ตัวเนื้อหาภาษาไทยใช้ Sarabun ซึ่งเลือกเฉพาะสำหรับความอ่านง่ายในระยะการอ่านยาว ความยาวบรรทัดจำกัดประมาณ 60-70 ตัวอักษรในภาษาอังกฤษ และในขนาดเทียบเคียงในภาษาไทย ระยะระหว่างบรรทัด 1.55 สำหรับภาษาอังกฤษ และคลายเล็กน้อยสำหรับภาษาไทย หัวข้อใช้ฟอนต์แสดงผลแบบกอธิคที่ให้อารมณ์เฉพาะตัวแก่แต่ละสำนวน แต่ตัวเนื้อหาไม่เคยใช้",
          "รองรับการซูมเบราว์เซอร์ถึง 200 เปอร์เซ็นต์โดยไม่ต้องเลื่อนแนวนอน เลย์เอาต์ไหลใหม่ ไม่มีสิ่งใดถูกซ่อน",
        ],
      },
      {
        heading: "โปรแกรมอ่านหน้าจอและความหมายเชิงโครงสร้าง",
        paragraphs: [
          "ทุกหน้าใช้โครงสร้าง HTML5 ที่ถูกต้อง h1 หนึ่งตัวต่อหน้า หัวข้อลำดับลงตามลำดับ รายการกำหนดด้วยมาร์กอัปรายการ การอ้างอิงเป็นรายการมีลำดับเลข ARIA ใช้อย่างประหยัด โดยทั่วไปเฉพาะวิดเจ็ตจำนวนน้อยที่ HTML พื้นเมืองไม่สามารถถ่ายทอดความหมายได้ (รายการคู่ขนานของตู้แห่งเงาแบบ 3 มิติ สวิตช์ภาษา)",
          "เราทดสอบกับ VoiceOver บน macOS และ NVDA บน Windows เรายังมิได้อ้างว่าได้ทดสอบทุกชุดผสมของโปรแกรมอ่านหน้าจอและเบราว์เซอร์ในโลก หากท่านพบปัญหา กรุณาเขียนมาหาเรา",
        ],
      },
      {
        heading: "สิ่งที่ทำงานไม่ได้หรือทำงานได้น้อยกว่า",
        paragraphs: [
          "ตู้แห่งเงาแบบ 3 มิติบนหน้าแรกโดยธรรมชาติเป็นประสบการณ์ทางสายตา รายการแป้นพิมพ์สำรองคือเส้นทางที่เข้าถึงได้ผ่านมัน แต่ฉาก 3 มิติเองมิได้ถูกบรรยาย เราถือว่ายอมรับได้เพราะ (ก) ตัวสำรองครอบคลุมการนำทางเต็มรูป (ข) รายการแป้นพิมพ์อยู่ที่นั่นเสมอ มิได้ซ่อนหลังสวิตช์ และ (ค) ฉากภาพให้บรรยากาศ มิใช่ข้อมูล",
          "การเปลี่ยนผ่านสำนวนระหว่างหน้ามีองค์ประกอบเคลื่อนไหวสั้น ๆ เช่น ค้างคาว ฟ้าผ่า ผ้าพันแผลพลิ้ว เมื่อ prefers-reduced-motion: reduce สิ่งเหล่านี้จะถูกแทนที่ด้วยการ fade เงียบ ๆ เมื่อไม่ได้ตั้งค่า สิ่งเหล่านั้นยาว 1.5 ถึง 2 วินาที และไม่กระพริบในอัตราที่อาจกระตุ้นอาการชักจากความไวต่อแสง (เราตรวจสอบกับเกณฑ์ WCAG 2.3.1 ว่าด้วยการกระพริบสามครั้งหรือต่ำกว่า)",
        ],
      },
      {
        heading: "มือถือและการสัมผัส",
        paragraphs: [
          "เว็บไซต์ปรับขนาดได้จนถึงวิวพอร์ต 320 พิกเซล เป้าโต้ตอบทั้งหมด ตู้แห่งเงาสิบสามชิ้น สวิตช์ภาษา ลิงก์อ้างอิง การนำทางในหน้า ถูกปรับขนาดให้ผ่านเกณฑ์ขั้นต่ำของ WCAG 2.5.5 ที่ 24 คูณ 24 พิกเซล CSS และส่วนใหญ่มีขนาดใหญ่กว่ามาก ตัวเนื้อหายาวยังคงเป็นสิ่งสำคัญที่สุดบนมือถือ เราไม่ยุบบทประพันธ์ลงเป็นข้อความสั้น ๆ",
        ],
      },
      {
        heading: "การรายงานปัญหา",
        paragraphs: [
          "หากสิ่งใดในเว็บไซต์นี้ใช้งานยากกับเทคโนโลยีช่วยที่ท่านใช้ หรืออ่านยากด้วยเหตุผลอื่นใด กรุณาเขียนถึง frank.caules@gmail.com หัวข้อ [accessibility] อธิบายสิ่งที่ท่านพยายามทำ สิ่งที่ขวางทาง และอุปกรณ์หรือเทคโนโลยีช่วยที่ท่านใช้ เราจัดลำดับความสำคัญข้อบกพร่องด้านการเข้าถึงเท่ากับข้อบกพร่องด้านความปลอดภัย เราจะตอบรับภายใน 72 ชั่วโมงและแก้ไขโดยเร็วที่สุด",
          "หากการแก้ไขเรียบง่าย เราจะปรับใช้ทันที หากกระทบสถาปัตยกรรมพื้นฐาน เราจะบันทึกการเปลี่ยนแปลงในประวัติคอมมิทสาธารณะของรหัสต้นทาง ซึ่งเปิดอยู่ที่ github.com/ncsergiis/cabinet-of-shadows",
        ],
      },
    ],
    signature: "— กองบรรณาธิการ",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AccessibilityPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const copy = COPY[locale];

  return (
    <main id="main" className="legal">
      <header className="legal__header">
        <p className="legal__eyebrow">{copy.eyebrow}</p>
        <h1 className="legal__title">{copy.title}</h1>
        <p className="legal__lede">{copy.lede}</p>
        <p className="legal__meta">{copy.lastUpdated}</p>
        <p className="legal__return">
          <Link href={`/${locale}`}>{copy.back}</Link>
        </p>
      </header>

      <article className="legal__body">
        {copy.sections.map((section) => (
          <section key={section.heading} className="legal__section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}
        <p className="legal__signature">{copy.signature}</p>
        <p className="legal__footer">
          <Link href={`/${locale}`}>← {t(locale, "backToCabinet")}</Link>
        </p>
      </article>
      <Colophon locale={locale} />
    </main>
  );
}
