import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";
import { Colophon } from "@/components/site/Colophon";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Terms",
  description:
    "The Cabinet of Shadows is offered as a piece of public science writing, free to read and to cite, with two small caveats.",
};

interface TermsCopy {
  eyebrow: string;
  title: string;
  lede: string;
  lastUpdated: string;
  back: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  signature: string;
}

const COPY: Record<Locale, TermsCopy> = {
  en: {
    eyebrow: "A note on terms",
    title: "Conditions of use",
    lede: "The Cabinet is a piece of public science writing, free to read, free to cite, and free to share with the people you think will enjoy it. The few caveats that follow are administrative.",
    lastUpdated: "Last reviewed: May 2026",
    back: "← back to the Cabinet",
    sections: [
      {
        heading: "Read it freely",
        paragraphs: [
          "There is no paywall here and there will not be one. You do not need an account, a subscription, or anyone's permission to read the Cabinet of Shadows. You may link to it, recommend it, assign it to your students, quote a sentence in your blog post, or print a dossier out and read it on the bus.",
        ],
      },
      {
        heading: "Citation and reuse",
        paragraphs: [
          "The editorial prose — the alienist's voice, the dossiers, the framing essays, the Thai translations, the bibliography's arrangement and curation — is released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International licence. The plain-language meaning of that is: you may quote, translate, remix, and redistribute it, on three conditions. (1) Credit the source and link to this site. (2) Do not put it behind a paywall, sell access to it, fold it into a commercial product, or use it to train commercial machine-learning models. (3) Release whatever you make from it under the same licence.",
          "The source code is released separately, under the MIT licence, with no non-commercial restriction. Build whatever you like with it. The full text of both licences is in the LICENSE file at the root of the source-code repository.",
          "The underlying peer-reviewed papers cited throughout the Cabinet — Freud 1919, Bowlby 1969, Clasen 2012, Blom 2014, Jonason 2017, and the rest — are the work of their respective authors and are governed by their own copyright. We cite them under the academic doctrine of fair use; we do not reproduce them in full. To read them yourself, follow the DOIs from the bibliography page.",
        ],
      },
      {
        heading: "What we promise about accuracy",
        paragraphs: [
          "Every clinical claim made by the alienist is anchored to a source whose details appear in the bibliography. The DOIs are live. The arguments attributed to those papers are arguments the papers themselves make. We have checked; you are welcome to as well.",
          "We do not promise that the alienist's synthesis is the only defensible reading of any given novel, or of any given piece of clinical literature. Where the literature is contested, we have indicated as much; where the alienist editorialises, he is honest about doing so; where he declines to editorialise, he is leaving room for you. This is science communication, not a textbook. Use it as a starting point for the underlying papers, which are the canonical record.",
          "The Cabinet does not provide medical advice. Nothing here is a substitute for consulting a qualified clinician about your own mental health or anyone else's. If a dossier on, say, dissociative identity disorder leads you to wonder about your own experience, please talk to a real psychiatrist or psychologist — not to a website written in a velvet coat.",
        ],
      },
      {
        heading: "What we don't promise",
        paragraphs: [
          "The site is provided as-is. We make no warranty that it will be available without interruption, that every link will resolve forever (DOIs we trust; everything else is best-effort), or that no typo has ever escaped a final read-through. We will fix anything you point out at the email address at the foot of this page.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "Do not attempt to attack the site, scrape it at industrial volume, or use it to attack other sites. Do not use it to train commercial machine-learning models without permission. Do not republish the editorial prose in whole or in substantial part without observing the licence above. Do not impersonate the editors. Be reasonable.",
        ],
      },
      {
        heading: "Jurisdiction",
        paragraphs: [
          "These terms are governed by the laws of the United States, where the editor primarily resides, but they are written with international readers in mind and with European and Thai readers in particular. If any part of these terms is unenforceable in your jurisdiction, treat that part as severed and the remainder as binding.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "If we change these terms in any substantive way, we will update the date at the top of this page and the change will appear in the public commit history of the site's source code. The repository is at github.com/frankcaules/cabinet-of-shadows; the history is the receipt.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Anything not covered above: frank.caules@gmail.com.",
        ],
      },
    ],
    signature: "— the Editors",
  },
  th: {
    eyebrow: "บันทึกว่าด้วยข้อกำหนด",
    title: "เงื่อนไขการใช้งาน",
    lede: "ตู้แห่งเงาเป็นงานเขียนวิทยาศาสตร์สาธารณะ อ่านได้ฟรี อ้างอิงได้ฟรี และแบ่งปันได้ฟรีกับผู้ที่ท่านคิดว่าจะชอบ คำเตือนเล็กน้อยที่ตามมาเป็นเรื่องเชิงปกครอง",
    lastUpdated: "ตรวจทานครั้งล่าสุด: พฤษภาคม ค.ศ. 2026",
    back: "← กลับสู่ตู้แห่งเงา",
    sections: [
      {
        heading: "อ่านได้อย่างเสรี",
        paragraphs: [
          "ที่นี่ไม่มี paywall และจะไม่มี ท่านไม่จำเป็นต้องมีบัญชี ไม่ต้องสมัครสมาชิก ไม่ต้องขออนุญาตจากใครเพื่ออ่านตู้แห่งเงา ท่านสามารถลิงก์มาที่นี่ แนะนำ มอบหมายให้นักศึกษาอ่าน ยกประโยคหนึ่งไปใส่ในบทความบล็อกของท่าน หรือพิมพ์สำนวนใดออกมาอ่านบนรถเมล์ก็ได้",
        ],
      },
      {
        heading: "การอ้างอิงและการนำกลับมาใช้",
        paragraphs: [
          "บทประพันธ์เชิงบรรณาธิการ ทั้งสำเนียงของอลีนิสต์ สำนวนคดี ความเรียงกรอบ คำแปลภาษาไทย และการจัดเรียงและคัดสรรบรรณานุกรม เผยแพร่ภายใต้สัญญาอนุญาต Creative Commons แบบ Attribution-NonCommercial-ShareAlike 4.0 International ความหมายในภาษาที่เรียบง่ายคือ ท่านสามารถยก แปล รีมิกซ์ และเผยแพร่ต่อได้ ภายใต้สามเงื่อนไข (1) ให้เครดิตและลิงก์มายังเว็บไซต์นี้ (2) ห้ามนำไปวางหลัง paywall ห้ามขายการเข้าถึง ห้ามรวมเข้ากับผลิตภัณฑ์เชิงพาณิชย์ หรือใช้ฝึกแบบจำลองการเรียนรู้ของเครื่องเชิงพาณิชย์ (3) เผยแพร่สิ่งใดที่ท่านสร้างต่อภายใต้สัญญาเดียวกัน",
          "รหัสต้นทางเผยแพร่แยกต่างหากภายใต้สัญญาอนุญาต MIT โดยไม่มีข้อจำกัดเชิงไม่ใช่พาณิชย์ สร้างอะไรก็ได้ที่ท่านพอใจ ข้อความเต็มของทั้งสองสัญญาอยู่ในไฟล์ LICENSE ที่รากของคลังรหัสต้นทาง",
          "บทความที่ผ่านการพิจารณาโดยผู้ทรงคุณวุฒิที่อ้างถึงตลอดตู้แห่งเงา ทั้ง Freud 1919, Bowlby 1969, Clasen 2012, Blom 2014, Jonason 2017 และอื่น ๆ เป็นผลงานของผู้นิพนธ์แต่ละท่านและอยู่ภายใต้ลิขสิทธิ์ของตนเอง เราอ้างอิงภายใต้หลักการการใช้อย่างเป็นธรรมทางวิชาการ มิได้ทำซ้ำฉบับเต็ม หากท่านต้องการอ่านด้วยตนเอง ติดตามหมายเลข DOI ได้จากหน้าบรรณานุกรม",
        ],
      },
      {
        heading: "สิ่งที่เรารับรองเรื่องความถูกต้อง",
        paragraphs: [
          "ทุกข้ออ้างทางคลินิกของอลีนิสต์ผูกโยงกับแหล่งอ้างอิงซึ่งรายละเอียดปรากฏในบรรณานุกรม หมายเลข DOI ใช้งานได้ ข้อโต้แย้งที่อ้างถึงคือข้อโต้แย้งที่บทความเหล่านั้นเสนอเอง เราได้ตรวจสอบแล้ว และท่านก็ตรวจสอบได้เช่นกัน",
          "เรามิได้รับรองว่าการสังเคราะห์ของอลีนิสต์เป็นการอ่านเดียวที่ป้องกันได้สำหรับนวนิยายหรือวรรณกรรมคลินิกใด ๆ ที่ใดวรรณกรรมมีความขัดแย้ง เราได้ระบุไว้ ที่ใดอลีนิสต์แสดงความเห็นส่วนตัว เขาก็ตรงไปตรงมาว่ากำลังทำเช่นนั้น ที่ใดเขาปฏิเสธจะแสดงความเห็น เขากำลังเปิดพื้นที่ให้ท่าน นี่คือการสื่อสารวิทยาศาสตร์ มิใช่ตำรา จงใช้เป็นจุดเริ่มต้นไปสู่บทความต้นทาง ซึ่งเป็นบันทึกที่เป็นมาตรฐาน",
          "ตู้แห่งเงามิได้ให้คำแนะนำทางการแพทย์ ไม่มีสิ่งใดที่นี่ใช้แทนการปรึกษาแพทย์ที่มีคุณสมบัติเกี่ยวกับสุขภาพจิตของท่านหรือผู้อื่นได้ หากสำนวนเรื่อง เช่น โรคหลายบุคลิก ทำให้ท่านสงสัยเกี่ยวกับประสบการณ์ของตน กรุณาพูดคุยกับจิตแพทย์หรือนักจิตวิทยาตัวจริง มิใช่กับเว็บไซต์ที่สวมเสื้อกำมะหยี่",
        ],
      },
      {
        heading: "สิ่งที่เรามิได้รับรอง",
        paragraphs: [
          "เว็บไซต์ให้บริการตามสภาพ เราไม่รับประกันว่าจะใช้งานได้โดยปราศจากการหยุดชะงัก ว่าทุกลิงก์จะใช้ได้ตลอดไป (DOI เราเชื่อใจ ที่เหลือทำดีที่สุด) หรือว่าไม่มีคำผิดคำใดหลุดรอดจากการตรวจขั้นสุดท้าย เราจะแก้ไขสิ่งใดก็ตามที่ท่านชี้ให้เห็นที่อีเมลท้ายหน้านี้",
        ],
      },
      {
        heading: "การใช้งานที่ยอมรับได้",
        paragraphs: [
          "อย่าพยายามโจมตีเว็บไซต์ อย่าขูดข้อมูลในปริมาณอุตสาหกรรม หรือใช้เพื่อโจมตีเว็บไซต์อื่น อย่าใช้ฝึกแบบจำลองการเรียนรู้ของเครื่องเชิงพาณิชย์โดยไม่ได้รับอนุญาต อย่าเผยแพร่บทประพันธ์เชิงบรรณาธิการทั้งหมดหรือส่วนใหญ่โดยไม่ปฏิบัติตามสัญญาอนุญาตข้างต้น อย่าสวมรอยเป็นกองบรรณาธิการ จงสมเหตุสมผล",
        ],
      },
      {
        heading: "เขตอำนาจ",
        paragraphs: [
          "ข้อกำหนดเหล่านี้อยู่ภายใต้กฎหมายของสหรัฐอเมริกา ซึ่งเป็นที่พำนักหลักของบรรณาธิการ แต่เขียนโดยคำนึงถึงผู้อ่านนานาชาติ โดยเฉพาะผู้อ่านชาวยุโรปและไทย หากส่วนใดของข้อกำหนดเหล่านี้บังคับใช้ไม่ได้ในเขตอำนาจของท่าน ถือว่าส่วนนั้นถูกตัดออกและส่วนที่เหลือยังมีผลผูกพัน",
        ],
      },
      {
        heading: "การเปลี่ยนแปลง",
        paragraphs: [
          "หากเราเปลี่ยนแปลงข้อกำหนดเหล่านี้ในสาระสำคัญใด เราจะปรับวันที่ด้านบนของหน้านี้ และการเปลี่ยนแปลงจะปรากฏในประวัติคอมมิทสาธารณะของรหัสต้นทาง คลังอยู่ที่ github.com/frankcaules/cabinet-of-shadows ประวัติคือใบเสร็จ",
        ],
      },
      {
        heading: "ติดต่อ",
        paragraphs: [
          "เรื่องใดที่ไม่ได้กล่าวถึงข้างต้น: frank.caules@gmail.com",
        ],
      },
    ],
    signature: "— กองบรรณาธิการ",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function TermsPage({ params }: PageProps) {
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
