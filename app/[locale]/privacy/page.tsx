import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";
import { Colophon } from "@/components/site/Colophon";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Privacy",
  description:
    "The Cabinet of Shadows does not track its readers. This page documents what we do, and do not, collect.",
};

interface PrivacyCopy {
  eyebrow: string;
  title: string;
  lede: string;
  lastUpdated: string;
  back: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  signature: string;
}

const COPY: Record<Locale, PrivacyCopy> = {
  en: {
    eyebrow: "A note on privacy",
    title: "What this site collects",
    lede: "Nothing. That is the short answer. The remainder of this page exists to demonstrate the claim.",
    lastUpdated: "Last reviewed: May 2026",
    back: "← back to the Cabinet",
    sections: [
      {
        heading: "No analytics",
        paragraphs: [
          "There is no Google Analytics on this site. There is no Plausible, no Fathom, no Cloudflare Web Analytics, no Vercel Analytics, no Vercel Speed Insights, no Sentry, no Hotjar, no Mixpanel, no PostHog, no Segment, no LogRocket, no New Relic, no Datadog RUM, no anything of that family. The HTML pages that arrive in your browser load no third-party JavaScript, fire no tracking pixels, set no analytics cookies, and do not phone home in any form.",
          "This is straightforward to verify. Open your browser's developer tools, switch to the Network tab, reload any page on this site, and observe that every request is to cabinetofshadows.me itself (or, for the underlying CDN, to Vercel's edge — which is how the bytes reach you, not a tracker). No telemetry beacons go out.",
        ],
      },
      {
        heading: "No cookies",
        paragraphs: [
          "This site sets no cookies. Not session cookies, not preference cookies, not anything. You will not see a cookie banner here because there is no consent to gather: there are no cookies to consent to. The European ePrivacy Directive (and equivalents elsewhere) requires consent for non-essential cookies; we have solved that requirement by not having any.",
        ],
      },
      {
        heading: "No accounts, no forms, no submissions",
        paragraphs: [
          "There is no login. There is no comments section. There is no contact form. There is no newsletter signup. There is no \"share your email for updates\" anywhere on this site. You may read the Cabinet without ever revealing your identity, your email, your IP address (beyond what reaching any web page over the public internet necessarily entails), or anything else about yourself.",
          "If you would like to write to the editors, the email address is shown at the foot of this page. That is a conscious choice — you opening your mail client of your own free will is not the same as us harvesting addresses through a form.",
        ],
      },
      {
        heading: "What our hosting provider sees",
        paragraphs: [
          "This site is hosted by Vercel, which serves it from a global content-delivery network. Vercel, as the operator of that CDN, necessarily sees the requests that flow through it: timestamps, IP addresses, the URLs requested, user-agent strings, and similar standard HTTP metadata. This is true of any website on the public internet — the server has to know where to send the response.",
          "Vercel's handling of that data is governed by their own privacy policy, which you can read at vercel.com/legal/privacy-policy. The editors of this site have not enabled any of Vercel's optional analytics or insights products. We do not receive logs or aggregated metrics from Vercel; we do not look at who is reading what, when, or from where.",
          "If you would prefer that even this minimal CDN-level metadata not exist, the polite move is to read the Cabinet through a VPN or Tor, both of which work fine here.",
        ],
      },
      {
        heading: "What we do store on your device, briefly",
        paragraphs: [
          "Your browser will cache the static assets of the site — HTML pages, CSS, fonts, images, the three.js bundle that powers the Cabinet hub — in the ordinary way that browsers cache the static assets of any website, so that subsequent visits load faster. You control that cache; clearing your browser cache clears it. We do not write to localStorage, sessionStorage, or IndexedDB.",
        ],
      },
      {
        heading: "Third parties",
        paragraphs: [
          "The site loads no third-party scripts at all. The fonts are self-hosted (via @fontsource, served from the same origin). The illustrations and audio are self-hosted. The 3D models are self-hosted. There is no CDN-loaded jQuery, no Google Fonts, no Typekit, no embedded YouTube player, no Disqus, no anything of that kind.",
          "Outbound links — to DOIs at doi.org, to the editors' email address — open in your browser in the normal way; the destination site then operates under its own privacy policy. We have no control over, and no relationship with, those destinations beyond linking to them.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "The Cabinet of Shadows is a piece of long-form science writing about classic Gothic literature and modern clinical psychology. It is not directed at children, but neither does it contain anything that would be inappropriate for an older child to read. We do not knowingly collect any information from anyone, which trivially includes children, so questions of COPPA compliance do not arise here.",
        ],
      },
      {
        heading: "AI training",
        paragraphs: [
          "We do not consent to the use of any part of this site — its prose, its translations, its bibliography, its source code, its illustrations, or any other element — for the training, fine-tuning, or evaluation of machine-learning models, without explicit prior written permission. This non-consent is asserted in our robots.txt (which disallows the major AI crawlers by name), in our X-Robots-Tag HTTP header, and under the EU Directive 2019/790, Article 4 text-and-data-mining opt-out.",
        ],
      },
      {
        heading: "Changes to this notice",
        paragraphs: [
          "If we ever change any of the above — for instance, if we one day decide to add a comments section or accept newsletter signups — we will say so on this page, and the change will be documented in the public commit history of the site's source code. The whole project is in the open at github.com/frankcaules/cabinet-of-shadows. Run a diff against any past version of this file to see exactly what has changed and when.",
        ],
      },
      {
        heading: "Questions",
        paragraphs: [
          "If something on this page is unclear, or if you believe any of these claims is technically wrong, please write to frank.caules@gmail.com.",
        ],
      },
    ],
    signature: "— the Editors",
  },
  th: {
    eyebrow: "บันทึกว่าด้วยความเป็นส่วนตัว",
    title: "เว็บไซต์นี้เก็บข้อมูลอะไรบ้าง",
    lede: "ไม่เก็บอะไรเลย นี่คือคำตอบสั้น ที่เหลือของหน้านี้มีไว้เพื่อพิสูจน์ข้ออ้างดังกล่าว",
    lastUpdated: "ตรวจทานครั้งล่าสุด: พฤษภาคม ค.ศ. 2026",
    back: "← กลับสู่ตู้แห่งเงา",
    sections: [
      {
        heading: "ไม่มีการเก็บสถิติผู้เข้าชม",
        paragraphs: [
          "เว็บไซต์นี้ไม่มี Google Analytics ไม่มี Plausible ไม่มี Fathom ไม่มี Cloudflare Web Analytics ไม่มี Vercel Analytics ไม่มี Vercel Speed Insights ไม่มี Sentry ไม่มี Hotjar ไม่มี Mixpanel ไม่มี PostHog ไม่มี Segment ไม่มี LogRocket ไม่มี New Relic ไม่มี Datadog RUM ไม่มีสิ่งใดในตระกูลนั้นทั้งสิ้น หน้า HTML ที่ส่งไปยังเบราว์เซอร์ของท่านไม่โหลด JavaScript จากบุคคลที่สาม ไม่ยิงพิกเซลติดตาม ไม่ตั้งคุกกี้สำหรับวิเคราะห์ และไม่ส่งข้อมูลกลับมาในรูปแบบใด ๆ ทั้งสิ้น",
          "ข้อนี้สามารถตรวจสอบได้โดยตรง เปิดเครื่องมือพัฒนาในเบราว์เซอร์ของท่าน เลือกแท็บ Network โหลดหน้าใดของเว็บไซต์นี้ใหม่ และสังเกตว่าทุกคำขอส่งไปยัง cabinetofshadows.me เอง (หรือไปยัง CDN ของ Vercel ซึ่งเป็นช่องทางที่ข้อมูลส่งถึงท่าน ไม่ใช่เครื่องมือติดตาม) ไม่มีสัญญาณเทเลเมตรีใด ๆ ส่งออก",
        ],
      },
      {
        heading: "ไม่มีคุกกี้",
        paragraphs: [
          "เว็บไซต์นี้ไม่ตั้งคุกกี้ใด ๆ ไม่ว่าจะเป็นคุกกี้เซสชัน คุกกี้ความพอใจ หรืออะไรก็ตาม ท่านจะไม่พบป้ายแจ้งคุกกี้ที่นี่ เพราะไม่มีสิ่งใดให้ยินยอม ระเบียบ ePrivacy ของยุโรป (และฉบับเทียบเคียงในที่อื่น ๆ) กำหนดให้ต้องขอความยินยอมสำหรับคุกกี้ที่มิใช่คุกกี้จำเป็น เราแก้ปัญหานี้ด้วยการไม่มีคุกกี้เสียเลย",
        ],
      },
      {
        heading: "ไม่มีบัญชี ไม่มีแบบฟอร์ม ไม่มีการส่งข้อมูล",
        paragraphs: [
          "ไม่มีระบบล็อกอิน ไม่มีช่องแสดงความคิดเห็น ไม่มีแบบฟอร์มติดต่อ ไม่มีการสมัครรับจดหมายข่าว ไม่มีช่อง “ฝากอีเมลเพื่อรับข่าวสาร” ที่ใด ๆ ในเว็บไซต์นี้ ท่านสามารถอ่านตู้แห่งเงาได้โดยไม่ต้องเปิดเผยตัวตน อีเมล หมายเลข IP (เกินกว่าที่จำเป็นต่อการเข้าถึงเว็บใด ๆ บนอินเทอร์เน็ตสาธารณะ) หรือสิ่งใดเกี่ยวกับตัวท่าน",
          "หากท่านประสงค์จะติดต่อกองบรรณาธิการ ที่อยู่อีเมลปรากฏที่ท้ายหน้านี้ นั่นเป็นความตั้งใจ การที่ท่านเปิดโปรแกรมจดหมายของท่านเองโดยสมัครใจมิได้เทียบเท่ากับการที่เราเก็บรวบรวมที่อยู่ผ่านแบบฟอร์ม",
        ],
      },
      {
        heading: "สิ่งที่ผู้ให้บริการโฮสติงของเราเห็น",
        paragraphs: [
          "เว็บไซต์นี้โฮสต์โดย Vercel ซึ่งให้บริการผ่านเครือข่ายส่งมอบเนื้อหา (CDN) ทั่วโลก Vercel ในฐานะผู้ดำเนินการ CDN ย่อมมองเห็นคำขอที่ไหลผ่าน ได้แก่ ประทับเวลา ที่อยู่ IP URL ที่ถูกขอ สตริง user-agent และเมตาดาตา HTTP มาตรฐานอื่น ๆ สิ่งนี้เป็นจริงสำหรับเว็บไซต์ใด ๆ บนอินเทอร์เน็ตสาธารณะ เพราะเซิร์ฟเวอร์จำเป็นต้องรู้ว่าจะส่งคำตอบไปที่ใด",
          "การจัดการข้อมูลดังกล่าวของ Vercel อยู่ภายใต้นโยบายความเป็นส่วนตัวของบริษัทเอง สามารถอ่านได้ที่ vercel.com/legal/privacy-policy กองบรรณาธิการของเว็บไซต์นี้ไม่ได้เปิดใช้งานผลิตภัณฑ์การวิเคราะห์หรือ insights ใด ๆ ของ Vercel เราไม่ได้รับบันทึกหรือเมตริกรวมจาก Vercel เราไม่ดูว่าใครกำลังอ่านอะไร เมื่อใด หรือจากที่ใด",
          "หากท่านประสงค์ว่ามิให้แม้แต่เมตาดาตาระดับ CDN ขั้นต่ำนี้มีอยู่ มารยาทคืออ่านตู้แห่งเงาผ่าน VPN หรือ Tor ซึ่งทั้งสองทำงานได้ดีที่นี่",
        ],
      },
      {
        heading: "สิ่งที่เราเก็บไว้บนอุปกรณ์ของท่าน (เพียงเล็กน้อย)",
        paragraphs: [
          "เบราว์เซอร์ของท่านจะแคชสินทรัพย์คงที่ของเว็บไซต์ ได้แก่ หน้า HTML, CSS, ฟอนต์, ภาพ และชุด three.js ที่ขับเคลื่อนตู้แห่งเงา ในลักษณะเดียวกับที่เบราว์เซอร์แคชสินทรัพย์คงที่ของเว็บไซต์ใด ๆ เพื่อให้การเข้าชมครั้งต่อไปเร็วขึ้น ท่านควบคุมแคชนั้น การล้างแคชเบราว์เซอร์ก็เคลียร์ออก เราไม่เขียนข้อมูลลง localStorage, sessionStorage, หรือ IndexedDB",
        ],
      },
      {
        heading: "บุคคลที่สาม",
        paragraphs: [
          "เว็บไซต์นี้ไม่โหลดสคริปต์จากบุคคลที่สามใด ๆ ทั้งสิ้น ฟอนต์ถูกโฮสต์เอง (ผ่าน @fontsource บนโดเมนเดียวกัน) ภาพประกอบและเสียงถูกโฮสต์เอง โมเดล 3 มิติถูกโฮสต์เอง ไม่มี jQuery จาก CDN ไม่มี Google Fonts ไม่มี Typekit ไม่มี YouTube ฝัง ไม่มี Disqus ไม่มีสิ่งใดในประเภทนั้น",
          "ลิงก์ภายนอก เช่น ลิงก์ DOI ที่ doi.org หรืออีเมลของกองบรรณาธิการ จะเปิดในเบราว์เซอร์ของท่านตามปกติ จากนั้นเว็บไซต์ปลายทางจะดำเนินงานภายใต้นโยบายความเป็นส่วนตัวของตนเอง เราไม่มีอำนาจควบคุมและไม่มีความสัมพันธ์กับปลายทางเหล่านั้น เว้นแต่การลิงก์ไปหา",
        ],
      },
      {
        heading: "เด็ก",
        paragraphs: [
          "ตู้แห่งเงาเป็นงานเขียนวิทยาศาสตร์ยาวว่าด้วยวรรณกรรมกอธิคคลาสสิกและจิตวิทยาคลินิกร่วมสมัย มิได้มุ่งเป้าไปที่เด็ก แต่ก็ไม่มีเนื้อหาใดที่ไม่เหมาะสำหรับเด็กโตจะอ่าน เราไม่จงใจเก็บข้อมูลจากผู้ใด ซึ่งย่อมรวมถึงเด็กด้วย ดังนั้นประเด็นเรื่อง COPPA จึงไม่ปรากฏที่นี่",
        ],
      },
      {
        heading: "การใช้ฝึก AI",
        paragraphs: [
          "เราไม่ยินยอมให้นำส่วนใดของเว็บไซต์นี้ ทั้งบทประพันธ์ คำแปล บรรณานุกรม รหัสต้นทาง ภาพประกอบ หรือองค์ประกอบอื่นใด ไปใช้ในการฝึก ปรับจูน หรือประเมินแบบจำลองการเรียนรู้ของเครื่อง โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษรล่วงหน้าจากเรา การไม่ยินยอมนี้ระบุไว้ใน robots.txt (ซึ่งห้ามผู้รวบรวมข้อมูล AI รายหลักโดยระบุชื่อ) ในส่วนหัว HTTP X-Robots-Tag และภายใต้ระเบียบสหภาพยุโรป 2019/790 มาตรา 4 ว่าด้วยการเลือกออกจากการขุดข้อความและข้อมูล",
        ],
      },
      {
        heading: "การเปลี่ยนแปลงประกาศนี้",
        paragraphs: [
          "หากเรามีการเปลี่ยนแปลงข้อใดข้างต้น เช่น หากในวันหนึ่งเราตัดสินใจเพิ่มช่องแสดงความคิดเห็นหรือรับสมัครจดหมายข่าว เราจะระบุไว้ที่หน้านี้ และการเปลี่ยนแปลงจะถูกบันทึกในประวัติคอมมิทสาธารณะของรหัสต้นทางของเว็บไซต์ ทั้งโครงการเปิดเผยอยู่ที่ github.com/frankcaules/cabinet-of-shadows ทำการ diff กับเวอร์ชันก่อนหน้าใดของไฟล์นี้เพื่อดูว่ามีอะไรเปลี่ยน เมื่อใด",
        ],
      },
      {
        heading: "คำถาม",
        paragraphs: [
          "หากมีสิ่งใดในหน้านี้ไม่ชัดเจน หรือท่านเห็นว่าข้ออ้างใดผิดในทางเทคนิค กรุณาเขียนถึง frank.caules@gmail.com",
        ],
      },
    ],
    signature: "— กองบรรณาธิการ",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function PrivacyPage({ params }: PageProps) {
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
