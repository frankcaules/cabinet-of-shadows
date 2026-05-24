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
    "The Cabinet of Shadows uses Google Analytics 4 via Google Tag Manager, with IP-anonymized page views and no other tracking. This page documents what is collected and how to opt out.",
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
    lede: "Page views, with the IP address anonymized at collection, sent to Google Analytics 4 through a Google Tag Manager container. That is the short answer. The remainder of this page documents exactly what is collected, why this changed from a previous version of this notice, and how to opt out.",
    lastUpdated: "Last reviewed: May 2026 (substantial revision: analytics added)",
    back: "← back to the Cabinet",
    sections: [
      {
        heading: "Google Analytics 4 via Google Tag Manager",
        paragraphs: [
          "The Cabinet of Shadows loads Google Tag Manager on every page. That container in turn loads Google Analytics 4. Together they record: page views (which URLs are visited), approximate session duration, screen size, the referring URL, and the country of access (not city, not street, not anything that resolves to a person). IP addresses are truncated at the Google Analytics collection edge before storage. We have not enabled Google Signals, demographic reporting, advertising features, or any user-ID linkage.",
          "You can verify the only outbound tracking traffic by opening your browser's developer tools, switching to the Network tab, and reloading any page on this site. Requests to googletagmanager.com (the container) and google-analytics.com (the beacon endpoint) will appear; everything else is either cabinetofshadows.me itself or the Vercel edge that delivers it to you.",
          "A previous version of this notice asserted that no analytics were loaded. That is no longer accurate, and we explain the change below.",
        ],
      },
      {
        heading: "Cookies and how to refuse them",
        paragraphs: [
          "Google Analytics 4 sets one first-party cookie, named _ga. It contains a randomly generated identifier used to recognize returning visits within an aggregate, anonymous count. It is not linked to your Google account, to your email address, or to anything the editors of this site control. It expires after two years of no return visits, and you can clear it from your browser at any time.",
          "We use no other cookies. There is still no login cookie, no session cookie, no preference cookie, no advertising cookie.",
          "If you would prefer that no analytics requests be sent at all, several mechanisms work here. A content blocker such as uBlock Origin blocks the relevant Google domains by default. Global Privacy Control (GPC) and Do Not Track (DNT), when your browser sends them, are honored by GA4 to the extent that Google honors them generally — which is partial, so the more reliable opt-outs are a blocker, the official Google Analytics Opt-out Browser Add-on at tools.google.com/dlpage/gaoptout, or browsing through Tor or a privacy-focused browser (Brave, LibreWolf) that ships with blocking enabled. We do not show a cookie banner because GA4's single cookie is treated as an analytics cookie, not a marketing cookie, under most regimes, and in our judgment the opt-out paths above are more honest than a yes/no button that nobody reads.",
        ],
      },
      {
        heading: "No accounts, no forms, no submissions",
        paragraphs: [
          "There is no login. There is no comments section. There is no contact form. There is no newsletter signup. There is no \"share your email for updates\" anywhere on this site. You may read the Cabinet without ever revealing your identity, your email, your IP address (beyond what reaching any web page over the public internet necessarily entails — and beyond the truncated, anonymized GA4 sample of that), or anything else about yourself.",
          "If you would like to write to the editors, the email address is shown at the foot of this page. That is a conscious choice — you opening your mail client of your own free will is not the same as us harvesting addresses through a form.",
        ],
      },
      {
        heading: "What our hosting provider sees",
        paragraphs: [
          "This site is hosted by Vercel, which serves it from a global content-delivery network. Vercel, as the operator of that CDN, necessarily sees the requests that flow through it: timestamps, IP addresses, the URLs requested, user-agent strings, and similar standard HTTP metadata. This is true of any website on the public internet — the server has to know where to send the response.",
          "Vercel's handling of that data is governed by their own privacy policy, which you can read at vercel.com/legal/privacy-policy. The editors of this site have not enabled any of Vercel's optional analytics or insights products; the analytics we have chosen run through Google instead, as described in the first section.",
          "If you would prefer that even CDN-level metadata not exist, the polite move is to read the Cabinet through a VPN or Tor, both of which work fine here — and which also defeat the Google Analytics beacon as a side effect.",
        ],
      },
      {
        heading: "What we store on your device",
        paragraphs: [
          "Your browser will cache the static assets of the site — HTML pages, CSS, fonts, images, the three.js bundle that powers the Cabinet hub — in the ordinary way that browsers cache the static assets of any website, so that subsequent visits load faster. You control that cache; clearing your browser cache clears it. We do not write to localStorage, sessionStorage, or IndexedDB.",
          "The single cookie this site sets is described above in the cookies section. Clearing site data through your browser's developer tools removes it.",
        ],
      },
      {
        heading: "Third parties",
        paragraphs: [
          "Two third parties receive any data at all from your visit: Vercel (because they serve the bytes — see above) and Google (because we send page views to Google Analytics 4 via Google Tag Manager — see above). No other third-party JavaScript runs on this site. The fonts are self-hosted (via @fontsource, served from the same origin). The illustrations are self-hosted. The 3D models are self-hosted. There is no CDN-loaded jQuery, no Google Fonts, no Typekit, no embedded YouTube player, no Disqus, no Stripe, no Segment, no PostHog, no anything else.",
          "Outbound links — to DOIs at doi.org, to the editors' email address — open in your browser in the normal way; the destination site then operates under its own privacy policy. We have no control over, and no relationship with, those destinations beyond linking to them.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "The Cabinet of Shadows is a piece of long-form science writing about classic Gothic literature and modern clinical psychology. It is not directed at children, but neither does it contain anything that would be inappropriate for an older child to read. We do not knowingly collect any individually identifying information from anyone, which trivially includes children, so questions of COPPA compliance do not arise here.",
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
          "The previous version of this notice (in the git history of this file, before this revision) stated that no analytics of any kind were loaded. We changed our minds: we wanted a coarse, anonymized signal for which dossiers were actually being read, so that translation effort, bibliography work, and future writing could be directed where they would matter most. We chose GA4 specifically because Google Search Console verification works against it without requiring an additional file, meta tag, or DNS record on this site.",
          "If we change any of this again — for instance, if we disable analytics and revert to nothing, or if we add a comments section, or if we ever begin collecting personal data — we will say so on this page, and the change will be documented in the public commit history of the site's source code. The whole project is in the open at github.com/frankcaules/cabinet-of-shadows. Run a diff against any past version of this file to see exactly what has changed and when.",
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
    lede: "ยอดเข้าชมหน้า โดยที่อยู่ IP ถูกตัดให้เป็นนิรนามตั้งแต่ขั้นการเก็บ ถูกส่งไปยัง Google Analytics 4 ผ่านคอนเทนเนอร์ของ Google Tag Manager นี่คือคำตอบสั้น ที่เหลือของหน้านี้บันทึกว่ามีการเก็บข้อมูลใดบ้าง เหตุใดข้อความจึงเปลี่ยนจากประกาศฉบับก่อน และจะปฏิเสธการเก็บข้อมูลได้อย่างไร",
    lastUpdated: "ตรวจทานครั้งล่าสุด: พฤษภาคม ค.ศ. 2026 (ปรับปรุงครั้งสำคัญ: เพิ่มการเก็บสถิติ)",
    back: "← กลับสู่ตู้แห่งเงา",
    sections: [
      {
        heading: "Google Analytics 4 ผ่าน Google Tag Manager",
        paragraphs: [
          "ตู้แห่งเงาโหลด Google Tag Manager ในทุกหน้า โดยคอนเทนเนอร์ดังกล่าวโหลด Google Analytics 4 ต่อเนื่องไป ทั้งสองรวมกันบันทึก: ยอดเข้าชมหน้า (URL ที่ถูกเข้าชม) ระยะเวลาเซสชันโดยประมาณ ขนาดหน้าจอ URL ที่อ้างถึง และประเทศที่เข้าชม (ไม่ใช่เมือง ไม่ใช่ที่อยู่ ไม่ใช่สิ่งใดที่ระบุตัวบุคคล) ที่อยู่ IP ถูกตัดให้เป็นนิรนามที่ขอบการเก็บของ Google Analytics ก่อนการจัดเก็บ เราไม่ได้เปิดใช้งาน Google Signals การรายงานข้อมูลประชากร คุณสมบัติด้านโฆษณา หรือการเชื่อมโยง User-ID ใด ๆ",
          "ท่านสามารถตรวจสอบการสื่อสารติดตามขาออกได้โดยตรง เปิดเครื่องมือพัฒนาในเบราว์เซอร์ของท่าน เลือกแท็บ Network โหลดหน้าใดของเว็บไซต์นี้ใหม่ จะปรากฏคำขอไปยัง googletagmanager.com (คอนเทนเนอร์) และ google-analytics.com (ปลายทางสัญญาณ) ที่เหลือคือ cabinetofshadows.me เอง หรือ Vercel ที่ส่งมอบเนื้อหามาให้ท่าน",
          "ประกาศฉบับก่อนกล่าวว่าเว็บไซต์นี้ไม่โหลดเครื่องมือเก็บสถิติใดเลย ข้อความนั้นไม่ตรงต่อความจริงอีกต่อไป และเราอธิบายการเปลี่ยนแปลงไว้ด้านล่าง",
        ],
      },
      {
        heading: "คุกกี้และวิธีปฏิเสธ",
        paragraphs: [
          "Google Analytics 4 ตั้งคุกกี้ปฐมภูมิหนึ่งตัวชื่อ _ga ซึ่งบรรจุตัวระบุแบบสุ่มที่ใช้จดจำการเข้าชมซ้ำในรูปแบบของการนับนิรนามรวม ไม่ได้เชื่อมโยงกับบัญชี Google ของท่าน อีเมลของท่าน หรือสิ่งใดที่กองบรรณาธิการของเว็บไซต์นี้ควบคุม คุกกี้นี้หมดอายุหลังไม่มีการเข้าชมซ้ำเป็นเวลาสองปี ท่านสามารถล้างจากเบราว์เซอร์ของท่านได้ทุกเมื่อ",
          "เราไม่ใช้คุกกี้อื่นใด ยังคงไม่มีคุกกี้ล็อกอิน ไม่มีคุกกี้เซสชัน ไม่มีคุกกี้ความพอใจ ไม่มีคุกกี้โฆษณา",
          "หากท่านประสงค์ว่าจะไม่ส่งคำขอเก็บสถิติเลย มีวิธีการหลายอย่างที่ใช้ได้ที่นี่ ตัวบล็อกเนื้อหาเช่น uBlock Origin จะบล็อกโดเมนของ Google โดยปริยาย Global Privacy Control (GPC) และ Do Not Track (DNT) เมื่อเบราว์เซอร์ของท่านส่งสัญญาณนั้น GA4 จะปฏิบัติตามเท่าที่ Google ปฏิบัติตามทั่วไป (ซึ่งเป็นบางส่วน) ดังนั้นวิธีปฏิเสธที่เชื่อถือได้กว่าคือใช้ตัวบล็อก ใช้ Google Analytics Opt-out Browser Add-on อย่างเป็นทางการที่ tools.google.com/dlpage/gaoptout หรือเข้าชมผ่าน Tor หรือเบราว์เซอร์ที่เน้นความเป็นส่วนตัว (Brave, LibreWolf) ซึ่งมีการบล็อกตั้งแต่ต้น เราไม่แสดงป้ายแจ้งคุกกี้ เพราะคุกกี้เดี่ยวของ GA4 ถูกจัดเป็นคุกกี้สถิติ มิใช่คุกกี้การตลาด ตามระเบียบส่วนใหญ่ และในความเห็นของเรา การให้เส้นทางปฏิเสธข้างต้นซื่อตรงกว่าปุ่ม “ยอมรับ/ปฏิเสธ” ที่ไม่มีใครอ่าน",
        ],
      },
      {
        heading: "ไม่มีบัญชี ไม่มีแบบฟอร์ม ไม่มีการส่งข้อมูล",
        paragraphs: [
          "ไม่มีระบบล็อกอิน ไม่มีช่องแสดงความคิดเห็น ไม่มีแบบฟอร์มติดต่อ ไม่มีการสมัครรับจดหมายข่าว ไม่มีช่อง “ฝากอีเมลเพื่อรับข่าวสาร” ที่ใด ๆ ในเว็บไซต์นี้ ท่านสามารถอ่านตู้แห่งเงาได้โดยไม่ต้องเปิดเผยตัวตน อีเมล หมายเลข IP (เกินกว่าที่จำเป็นต่อการเข้าถึงเว็บใด ๆ บนอินเทอร์เน็ตสาธารณะ และเกินกว่าตัวอย่าง GA4 ที่ถูกตัดให้นิรนามแล้ว) หรือสิ่งใดเกี่ยวกับตัวท่าน",
          "หากท่านประสงค์จะติดต่อกองบรรณาธิการ ที่อยู่อีเมลปรากฏที่ท้ายหน้านี้ นั่นเป็นความตั้งใจ การที่ท่านเปิดโปรแกรมจดหมายของท่านเองโดยสมัครใจมิได้เทียบเท่ากับการที่เราเก็บรวบรวมที่อยู่ผ่านแบบฟอร์ม",
        ],
      },
      {
        heading: "สิ่งที่ผู้ให้บริการโฮสติงของเราเห็น",
        paragraphs: [
          "เว็บไซต์นี้โฮสต์โดย Vercel ซึ่งให้บริการผ่านเครือข่ายส่งมอบเนื้อหา (CDN) ทั่วโลก Vercel ในฐานะผู้ดำเนินการ CDN ย่อมมองเห็นคำขอที่ไหลผ่าน ได้แก่ ประทับเวลา ที่อยู่ IP URL ที่ถูกขอ สตริง user-agent และเมตาดาตา HTTP มาตรฐานอื่น ๆ สิ่งนี้เป็นจริงสำหรับเว็บไซต์ใด ๆ บนอินเทอร์เน็ตสาธารณะ เพราะเซิร์ฟเวอร์จำเป็นต้องรู้ว่าจะส่งคำตอบไปที่ใด",
          "การจัดการข้อมูลดังกล่าวของ Vercel อยู่ภายใต้นโยบายความเป็นส่วนตัวของบริษัทเอง สามารถอ่านได้ที่ vercel.com/legal/privacy-policy กองบรรณาธิการของเว็บไซต์นี้ไม่ได้เปิดใช้งานผลิตภัณฑ์การวิเคราะห์หรือ insights ใด ๆ ของ Vercel เครื่องมือวิเคราะห์ที่เราเลือกใช้คือของ Google ตามที่อธิบายในส่วนแรก",
          "หากท่านประสงค์ว่ามิให้แม้แต่เมตาดาตาระดับ CDN มีอยู่ มารยาทคืออ่านตู้แห่งเงาผ่าน VPN หรือ Tor ซึ่งทั้งสองทำงานได้ดีที่นี่ และเป็นผลพลอยได้ที่จะปิดสัญญาณ Google Analytics ไปด้วย",
        ],
      },
      {
        heading: "สิ่งที่เราเก็บไว้บนอุปกรณ์ของท่าน",
        paragraphs: [
          "เบราว์เซอร์ของท่านจะแคชสินทรัพย์คงที่ของเว็บไซต์ ได้แก่ หน้า HTML, CSS, ฟอนต์, ภาพ และชุด three.js ที่ขับเคลื่อนตู้แห่งเงา ในลักษณะเดียวกับที่เบราว์เซอร์แคชสินทรัพย์คงที่ของเว็บไซต์ใด ๆ เพื่อให้การเข้าชมครั้งต่อไปเร็วขึ้น ท่านควบคุมแคชนั้น การล้างแคชเบราว์เซอร์ก็เคลียร์ออก เราไม่เขียนข้อมูลลง localStorage, sessionStorage, หรือ IndexedDB",
          "คุกกี้เดียวที่เว็บไซต์นี้ตั้งได้อธิบายไว้ในส่วนคุกกี้ข้างต้น การล้างข้อมูลเว็บไซต์ผ่านเครื่องมือพัฒนาของเบราว์เซอร์จะลบออก",
        ],
      },
      {
        heading: "บุคคลที่สาม",
        paragraphs: [
          "บุคคลที่สามสองรายได้รับข้อมูลจากการเข้าชมของท่าน: Vercel (เพราะส่งมอบไบต์ — ดูด้านบน) และ Google (เพราะเราส่งยอดเข้าชมหน้าไปยัง Google Analytics 4 ผ่าน Google Tag Manager — ดูด้านบน) ไม่มี JavaScript จากบุคคลที่สามอื่นใดทำงานในเว็บไซต์นี้ ฟอนต์ถูกโฮสต์เอง (ผ่าน @fontsource บนโดเมนเดียวกัน) ภาพประกอบถูกโฮสต์เอง โมเดล 3 มิติถูกโฮสต์เอง ไม่มี jQuery จาก CDN ไม่มี Google Fonts ไม่มี Typekit ไม่มี YouTube ฝัง ไม่มี Disqus ไม่มี Stripe ไม่มี Segment ไม่มี PostHog ไม่มีสิ่งใดประเภทนั้น",
          "ลิงก์ภายนอก เช่น ลิงก์ DOI ที่ doi.org หรืออีเมลของกองบรรณาธิการ จะเปิดในเบราว์เซอร์ของท่านตามปกติ จากนั้นเว็บไซต์ปลายทางจะดำเนินงานภายใต้นโยบายความเป็นส่วนตัวของตนเอง เราไม่มีอำนาจควบคุมและไม่มีความสัมพันธ์กับปลายทางเหล่านั้น เว้นแต่การลิงก์ไปหา",
        ],
      },
      {
        heading: "เด็ก",
        paragraphs: [
          "ตู้แห่งเงาเป็นงานเขียนวิทยาศาสตร์ยาวว่าด้วยวรรณกรรมกอธิคคลาสสิกและจิตวิทยาคลินิกร่วมสมัย มิได้มุ่งเป้าไปที่เด็ก แต่ก็ไม่มีเนื้อหาใดที่ไม่เหมาะสำหรับเด็กโตจะอ่าน เราไม่จงใจเก็บข้อมูลที่ระบุตัวบุคคลจากผู้ใด ซึ่งย่อมรวมถึงเด็กด้วย ดังนั้นประเด็นเรื่อง COPPA จึงไม่ปรากฏที่นี่",
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
          "ประกาศฉบับก่อน (อยู่ในประวัติ git ของไฟล์นี้ก่อนการแก้ไขนี้) ระบุว่าไม่มีการโหลดเครื่องมือเก็บสถิติใดเลย เราเปลี่ยนใจ เราต้องการสัญญาณนิรนามเชิงคร่าวว่าเอกสารคดีใดถูกอ่านบ้าง เพื่อให้ความพยายามด้านการแปล งานบรรณานุกรม และงานเขียนในอนาคต ถูกชี้ไปยังจุดที่จะมีความหมายมากที่สุด เราเลือก GA4 โดยเฉพาะ เพราะการยืนยันความเป็นเจ้าของของ Google Search Console ทำงานกับมันได้โดยไม่ต้องเพิ่มไฟล์ เมตาแท็ก หรือบันทึก DNS อีกบนเว็บไซต์นี้",
          "หากเรามีการเปลี่ยนแปลงอีกในอนาคต เช่น ปิดการเก็บสถิติและกลับไปไม่มี หรือเพิ่มช่องแสดงความคิดเห็น หรือเริ่มเก็บข้อมูลส่วนบุคคล เราจะระบุไว้ที่หน้านี้ และการเปลี่ยนแปลงจะถูกบันทึกในประวัติคอมมิทสาธารณะของรหัสต้นทางของเว็บไซต์ ทั้งโครงการเปิดเผยอยู่ที่ github.com/frankcaules/cabinet-of-shadows ทำการ diff กับเวอร์ชันก่อนหน้าใดของไฟล์นี้เพื่อดูว่ามีอะไรเปลี่ยน เมื่อใด",
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
