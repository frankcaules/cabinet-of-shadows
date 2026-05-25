import { notFound } from "next/navigation";
import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";
import { Colophon } from "@/components/site/Colophon";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for The Cabinet of Shadows: data controller identity, what is collected (GA4 page views, IP-anonymized), legal basis, retention, your rights under GDPR / UK GDPR / CCPA / CPRA / LGPD / PDPA, international transfers, and how to opt out.",
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
    title: "Privacy Policy",
    lede: "Page views, with the IP address anonymized at collection, sent to Google Analytics 4 through a Google Tag Manager container. That is the short answer. The remainder of this page documents exactly what is collected, the legal basis for collecting it, how long it is kept, who the data controller is, the rights you have under the GDPR, the UK GDPR, the CCPA / CPRA, the LGPD, the PDPA, and similar regimes, and how to opt out at any time.",
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
        heading: "Data controller, legal basis, and retention",
        paragraphs: [
          "For the purposes of the EU General Data Protection Regulation (GDPR), the UK GDPR, Brazil's Lei Geral de Proteção de Dados (LGPD), Thailand's Personal Data Protection Act (PDPA), and Canada's PIPEDA, the data controller of this site is Frank Caules, reachable at frank.caules@gmail.com. The site is operated as a personal, non-commercial publication; no legal entity sits behind it, and no joint controllership arrangement applies.",
          "The legal basis on which we process the small amount of personal data that does pass through this site is legitimate interest (GDPR Article 6(1)(f) and equivalents). The legitimate interest is operating and improving a freely readable casebook of original science writing: aggregated page-view counts let us see which dossiers are read and which are not, which informs translation and bibliography priorities. No personal data is processed for marketing, profiling, advertising, sale, or onward disclosure.",
          "Retention. The GA4 user-data retention is set to fourteen (14) months, after which event-level data is automatically deleted from Google's systems. The _ga first-party cookie expires after two years of no return visit. Vercel's request logs (containing your IP address for the standard length of time required to serve a web page) are governed by Vercel's own privacy policy at vercel.com/legal/privacy-policy and we do not retain copies. We keep no personal data of our own on any device under our control.",
          "Automated decision-making. None. We do not profile readers, score them, or make any automated decisions that produce legal or similarly significant effects on you (GDPR Article 22 and equivalents).",
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
        heading: "International data transfers",
        paragraphs: [
          "Vercel operates a global content-delivery network with edge nodes in many countries; depending on where you are, the bytes of this page may reach you from a server in the United States, the European Union, Singapore, or elsewhere. Vercel is a United States company; for readers in the United Kingdom, the European Economic Area, Switzerland, Brazil, and other jurisdictions with cross-border-transfer rules, Vercel's data processing is covered by Standard Contractual Clauses (or local equivalents) as documented in their Data Processing Agreement.",
          "Google Analytics 4 processes data in the United States. For readers in the EEA, the United Kingdom, and Switzerland, Google operates under the EU-US Data Privacy Framework (DPF), the UK Extension to the DPF, and the Swiss-US DPF — current adequacy decisions issued by the European Commission and the Swiss Federal Data Protection and Information Commissioner — supplemented by Standard Contractual Clauses where required. Google's relevant terms and supplementary measures are documented at business.safety.google/adscontrollerterms and policies.google.com/privacy/frameworks.",
          "If you would prefer that no transfer to either party take place, a content blocker, GPC/DNT, the official Google Analytics opt-out add-on, or a VPN / Tor will reliably prevent the GA4 transfer; only the Vercel CDN transfer (which is required to send you the page itself) cannot be avoided while reading this site.",
        ],
      },
      {
        heading: "Your rights under international law",
        paragraphs: [
          "Wherever you are reading from, the data-protection law of your jurisdiction may grant you a set of rights over the personal data we process about you. Because we collect very little — essentially anonymized GA4 page views plus whatever CDN-level metadata Vercel handles to deliver the page — most of these rights are trivially satisfied. We list them here so you know they exist, and how to exercise them.",
          "Under the GDPR and UK GDPR (readers in the European Union, the European Economic Area, the United Kingdom, and Switzerland) you have the right to: access the personal data we hold about you (Article 15); have inaccurate data rectified (Article 16); have data erased (\"the right to be forgotten\", Article 17); restrict processing (Article 18); receive your data in a portable format (Article 20); object to processing carried out on the basis of legitimate interest (Article 21); and not be subject to solely automated decision-making with legal or similarly significant effects (Article 22).",
          "Under the CCPA and CPRA (California residents) you have the right to: know what personal information we collect, use, disclose, and share; delete the personal information we hold about you, with limited exceptions; correct inaccurate personal information; limit the use and disclosure of \"sensitive\" personal information (we collect none); opt out of the \"sale\" or \"sharing\" of personal information (we do neither and have never done either); and not be discriminated against for exercising any of these rights. The categories of personal information GA4 may collect on our behalf are identifiers (IP address, truncated at collection) and internet-activity information (URLs visited, referrer, approximate session duration). We do not sell or share personal information as those terms are defined under California law.",
          "Under the LGPD (readers in Brazil) you have the rights listed in Article 18: confirmation of processing, access, correction, anonymization or deletion, portability, information about with whom data is shared, and revocation of consent. Under the PDPA (readers in Thailand) you have the rights listed in Sections 30–37: access, correction, deletion, restriction, portability, objection, and the right to withdraw consent. Under PIPEDA (readers in Canada) you have the right to access and correct your personal information and to challenge our compliance.",
          "To exercise any of these rights, write to frank.caules@gmail.com with the subject [privacy request]. Tell us what right you are exercising and, if you can, enough information for us to identify the data you mean (for GA4, this is usually the device or browser you were reading from and the approximate dates). We will respond within thirty (30) days; for requests that require Google's cooperation, we will route them to Google on your behalf and write back with the outcome.",
          "If you believe we have mishandled your personal data, you have the right to lodge a complaint with a supervisory authority. EU readers may complain to the data protection authority of their country of residence (the European Data Protection Board maintains a current list at edpb.europa.eu/about-edpb/about-edpb/members_en). UK readers may complain to the Information Commissioner's Office at ico.org.uk. Brazilian readers may complain to the ANPD at gov.br/anpd. Thai readers may complain to the Office of the Personal Data Protection Committee at pdpc.or.th. Canadian readers may complain to the Office of the Privacy Commissioner of Canada at priv.gc.ca. Californian readers may complain to the California Privacy Protection Agency at cppa.ca.gov.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "The Cabinet of Shadows is a piece of long-form science writing about classic Gothic literature and modern clinical psychology. It is not directed at children, but neither does it contain anything that would be inappropriate for an older child to read. We do not knowingly collect any individually identifying information from anyone, which trivially includes children under thirteen for the purposes of the United States COPPA, children under sixteen for the purposes of the GDPR's Article 8 baseline (subject to Member-State variation between thirteen and sixteen), and the equivalent thresholds under the LGPD, PDPA, and PIPEDA. If you are a parent or guardian who believes we have inadvertently collected information from a child, write to frank.caules@gmail.com and we will investigate and delete.",
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
    title: "นโยบายความเป็นส่วนตัว",
    lede: "ยอดเข้าชมหน้า โดยที่อยู่ IP ถูกตัดให้เป็นนิรนามตั้งแต่ขั้นการเก็บ ถูกส่งไปยัง Google Analytics 4 ผ่านคอนเทนเนอร์ของ Google Tag Manager นี่คือคำตอบสั้น ที่เหลือของหน้านี้บันทึกว่ามีการเก็บข้อมูลใดบ้าง ฐานทางกฎหมายของการเก็บ ระยะเวลาเก็บรักษา ผู้ควบคุมข้อมูลคือใคร สิทธิของท่านภายใต้ GDPR, UK GDPR, CCPA / CPRA, LGPD, PDPA และระเบียบอื่นที่คล้ายกัน และจะปฏิเสธการเก็บข้อมูลได้อย่างไรในทุกเมื่อ",
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
        heading: "ผู้ควบคุมข้อมูล ฐานทางกฎหมาย และระยะเวลาเก็บรักษา",
        paragraphs: [
          "เพื่อวัตถุประสงค์ของ EU General Data Protection Regulation (GDPR), UK GDPR, Lei Geral de Proteção de Dados (LGPD) ของบราซิล, Personal Data Protection Act (PDPA) ของไทย และ PIPEDA ของแคนาดา ผู้ควบคุมข้อมูลของเว็บไซต์นี้คือ Frank Caules ติดต่อได้ที่ frank.caules@gmail.com เว็บไซต์นี้ดำเนินการในฐานะสิ่งพิมพ์ส่วนบุคคล มิใช่เชิงพาณิชย์ ไม่มีนิติบุคคลใดอยู่เบื้องหลัง และไม่มีข้อตกลงผู้ควบคุมร่วม",
          "ฐานทางกฎหมายที่เราใช้ในการประมวลผลข้อมูลส่วนบุคคลจำนวนน้อยที่ไหลผ่านเว็บไซต์นี้คือประโยชน์อันชอบธรรม (legitimate interest) ตาม GDPR มาตรา 6(1)(f) และบทบัญญัติที่เทียบเท่า ประโยชน์อันชอบธรรมคือการดำเนินงานและปรับปรุงแฟ้มคดีงานเขียนวิทยาศาสตร์ต้นฉบับที่อ่านได้โดยเสรี ยอดเข้าชมหน้าแบบนิรนามรวมช่วยให้เราเห็นว่าเอกสารคดีใดถูกอ่านบ้าง ซึ่งกำหนดลำดับความสำคัญของงานแปลและบรรณานุกรม ไม่มีการประมวลผลข้อมูลส่วนบุคคลเพื่อการตลาด การจำแนกบุคคล การโฆษณา การขาย หรือการเปิดเผยต่อบุคคลอื่น",
          "ระยะเวลาเก็บรักษา การเก็บข้อมูลผู้ใช้ของ GA4 ตั้งไว้ที่สิบสี่ (14) เดือน หลังจากนั้นข้อมูลระดับเหตุการณ์จะถูกลบโดยอัตโนมัติจากระบบของ Google คุกกี้ปฐมภูมิ _ga หมดอายุหลังไม่มีการเข้าชมซ้ำเป็นเวลาสองปี บันทึกคำขอของ Vercel (ซึ่งบรรจุที่อยู่ IP ของท่านตามเวลามาตรฐานที่จำเป็นในการส่งมอบหน้าเว็บ) อยู่ภายใต้นโยบายความเป็นส่วนตัวของ Vercel เองที่ vercel.com/legal/privacy-policy เราไม่ได้เก็บสำเนา เราไม่มีข้อมูลส่วนบุคคลใดในอุปกรณ์ใดที่อยู่ภายใต้การควบคุมของเรา",
          "การตัดสินใจอัตโนมัติ ไม่มี เราไม่ได้จำแนกผู้อ่าน ไม่ได้ให้คะแนน ไม่ได้ตัดสินใจอัตโนมัติใดที่ก่อให้เกิดผลทางกฎหมายหรือผลกระทบสำคัญในทำนองเดียวกันต่อท่าน (GDPR มาตรา 22 และบทบัญญัติที่เทียบเท่า)",
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
        heading: "การส่งข้อมูลข้ามประเทศ",
        paragraphs: [
          "Vercel ดำเนินเครือข่ายส่งมอบเนื้อหา (CDN) ระดับโลก พร้อมโหนดขอบในหลายประเทศ ไบต์ของหน้านี้อาจมาถึงท่านจากเซิร์ฟเวอร์ในสหรัฐอเมริกา สหภาพยุโรป สิงคโปร์ หรือที่อื่น ขึ้นอยู่กับที่ตั้งของท่าน Vercel เป็นบริษัทสหรัฐอเมริกา สำหรับผู้อ่านในสหราชอาณาจักร เขตเศรษฐกิจยุโรป สวิตเซอร์แลนด์ บราซิล และเขตอำนาจอื่นที่มีกฎเรื่องการส่งข้อมูลข้ามพรมแดน การประมวลผลข้อมูลของ Vercel อยู่ภายใต้ Standard Contractual Clauses (หรือเทียบเท่าในประเทศ) ตามที่ระบุในข้อตกลงประมวลผลข้อมูลของบริษัท",
          "Google Analytics 4 ประมวลผลข้อมูลในสหรัฐอเมริกา สำหรับผู้อ่านในเขตเศรษฐกิจยุโรป สหราชอาณาจักร และสวิตเซอร์แลนด์ Google ดำเนินการภายใต้ EU-US Data Privacy Framework (DPF), UK Extension to the DPF และ Swiss-US DPF — การตัดสินใจเรื่องความเพียงพอในปัจจุบันที่ออกโดยคณะกรรมาธิการยุโรปและคณะกรรมาธิการคุ้มครองข้อมูลและข้อมูลสารสนเทศแห่งสหพันธรัฐสวิส — เสริมด้วย Standard Contractual Clauses ตามที่กำหนด เงื่อนไขที่เกี่ยวข้องและมาตรการเสริมของ Google มีระบุไว้ที่ business.safety.google/adscontrollerterms และ policies.google.com/privacy/frameworks",
          "หากท่านประสงค์ว่ามิให้มีการส่งข้อมูลไปยังฝ่ายใด ตัวบล็อกเนื้อหา GPC/DNT, Google Analytics opt-out add-on อย่างเป็นทางการ หรือ VPN / Tor จะป้องกันการส่งข้อมูลไปยัง GA4 ได้อย่างน่าเชื่อถือ มีเพียงการส่งข้อมูลผ่าน CDN ของ Vercel เท่านั้น (ซึ่งจำเป็นต่อการส่งหน้าเว็บไปให้ท่าน) ที่หลีกเลี่ยงไม่ได้ขณะอ่านเว็บไซต์นี้",
        ],
      },
      {
        heading: "สิทธิของท่านภายใต้กฎหมายระหว่างประเทศ",
        paragraphs: [
          "ไม่ว่าท่านจะอ่านจากที่ใด กฎหมายคุ้มครองข้อมูลในเขตอำนาจของท่านอาจมอบสิทธิให้ท่านเหนือข้อมูลส่วนบุคคลที่เราประมวลผลเกี่ยวกับท่าน เนื่องจากเราเก็บข้อมูลน้อยมาก — โดยพื้นฐานคือยอดเข้าชม GA4 แบบนิรนาม บวกกับเมตาดาตาระดับ CDN ที่ Vercel จัดการเพื่อส่งหน้าเว็บ — สิทธิเหล่านี้ส่วนใหญ่จึงได้รับการตอบสนองอย่างง่าย เรารายการไว้ที่นี่เพื่อให้ท่านทราบว่ามีอยู่ และจะใช้สิทธิเหล่านั้นอย่างไร",
          "ภายใต้ GDPR และ UK GDPR (ผู้อ่านในสหภาพยุโรป เขตเศรษฐกิจยุโรป สหราชอาณาจักร และสวิตเซอร์แลนด์) ท่านมีสิทธิ: เข้าถึงข้อมูลส่วนบุคคลที่เราเก็บเกี่ยวกับท่าน (มาตรา 15), แก้ไขข้อมูลที่ไม่ถูกต้อง (มาตรา 16), ลบข้อมูล (\"สิทธิที่จะถูกลืม\", มาตรา 17), จำกัดการประมวลผล (มาตรา 18), รับข้อมูลในรูปแบบที่สามารถถ่ายโอนได้ (มาตรา 20), คัดค้านการประมวลผลที่อยู่บนฐานประโยชน์อันชอบธรรม (มาตรา 21) และไม่ตกอยู่ภายใต้การตัดสินใจอัตโนมัติเพียงอย่างเดียวที่มีผลทางกฎหมายหรือผลกระทบสำคัญในทำนองเดียวกัน (มาตรา 22)",
          "ภายใต้ CCPA และ CPRA (ผู้อาศัยในแคลิฟอร์เนีย) ท่านมีสิทธิ: ทราบว่าเราเก็บ ใช้ เปิดเผย และแบ่งปันข้อมูลส่วนบุคคลใดบ้าง; ลบข้อมูลส่วนบุคคลที่เราเก็บเกี่ยวกับท่าน โดยมีข้อยกเว้นจำกัด; แก้ไขข้อมูลส่วนบุคคลที่ไม่ถูกต้อง; จำกัดการใช้และเปิดเผยข้อมูลส่วนบุคคล \"ที่อ่อนไหว\" (เราไม่ได้เก็บ); ปฏิเสธการ \"ขาย\" หรือ \"แบ่งปัน\" ข้อมูลส่วนบุคคล (เราไม่ทำทั้งสองและไม่เคยทำ); และไม่ถูกเลือกปฏิบัติเมื่อใช้สิทธิเหล่านี้ ประเภทของข้อมูลส่วนบุคคลที่ GA4 อาจเก็บแทนเราคือตัวระบุ (ที่อยู่ IP ที่ถูกตัดให้สั้นตั้งแต่ขั้นการเก็บ) และข้อมูลกิจกรรมอินเทอร์เน็ต (URL ที่เข้าชม ผู้อ้างถึง ระยะเวลาเซสชันโดยประมาณ) เราไม่ขายหรือแบ่งปันข้อมูลส่วนบุคคลตามที่นิยามไว้ในกฎหมายแคลิฟอร์เนีย",
          "ภายใต้ LGPD (ผู้อ่านในบราซิล) ท่านมีสิทธิตามที่ระบุในมาตรา 18: ยืนยันการประมวลผล เข้าถึง แก้ไข ทำให้นิรนามหรือลบ ถ่ายโอนได้ ข้อมูลเกี่ยวกับผู้ที่ข้อมูลถูกแบ่งปัน และเพิกถอนความยินยอม ภายใต้ PDPA (ผู้อ่านในประเทศไทย) ท่านมีสิทธิตามที่ระบุในมาตรา 30-37: เข้าถึง แก้ไข ลบ จำกัด ถ่ายโอนได้ คัดค้าน และเพิกถอนความยินยอม ภายใต้ PIPEDA (ผู้อ่านในแคนาดา) ท่านมีสิทธิเข้าถึงและแก้ไขข้อมูลส่วนบุคคลของท่าน และท้าทายการปฏิบัติตามของเรา",
          "หากต้องการใช้สิทธิเหล่านี้ กรุณาเขียนถึง frank.caules@gmail.com พร้อมหัวข้อ [privacy request] บอกเราว่าท่านกำลังใช้สิทธิใด และหากเป็นไปได้ ข้อมูลที่เพียงพอให้เราระบุข้อมูลที่ท่านหมายถึง (สำหรับ GA4 โดยทั่วไปคืออุปกรณ์หรือเบราว์เซอร์ที่ท่านใช้อ่าน และวันที่โดยประมาณ) เราจะตอบกลับภายในสามสิบ (30) วัน สำหรับคำร้องที่ต้องอาศัยความร่วมมือของ Google เราจะส่งต่อให้ Google แทนท่านและเขียนกลับมาพร้อมผลลัพธ์",
          "หากท่านเชื่อว่าเราได้จัดการข้อมูลส่วนบุคคลของท่านโดยมิชอบ ท่านมีสิทธิยื่นเรื่องร้องเรียนต่อหน่วยงานกำกับดูแล ผู้อ่านในสหภาพยุโรปสามารถร้องเรียนต่อหน่วยงานคุ้มครองข้อมูลในประเทศที่อยู่อาศัย (European Data Protection Board มีรายการปัจจุบันที่ edpb.europa.eu/about-edpb/about-edpb/members_en) ผู้อ่านในสหราชอาณาจักรสามารถร้องเรียนต่อ Information Commissioner's Office ที่ ico.org.uk ผู้อ่านในบราซิลร้องเรียนต่อ ANPD ที่ gov.br/anpd ผู้อ่านในประเทศไทยร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคลที่ pdpc.or.th ผู้อ่านในแคนาดาร้องเรียนต่อ Office of the Privacy Commissioner of Canada ที่ priv.gc.ca ผู้อ่านในแคลิฟอร์เนียร้องเรียนต่อ California Privacy Protection Agency ที่ cppa.ca.gov",
        ],
      },
      {
        heading: "เด็ก",
        paragraphs: [
          "ตู้แห่งเงาเป็นงานเขียนวิทยาศาสตร์ยาวว่าด้วยวรรณกรรมกอธิคคลาสสิกและจิตวิทยาคลินิกร่วมสมัย มิได้มุ่งเป้าไปที่เด็ก แต่ก็ไม่มีเนื้อหาใดที่ไม่เหมาะสำหรับเด็กโตจะอ่าน เราไม่จงใจเก็บข้อมูลที่ระบุตัวบุคคลจากผู้ใด ซึ่งย่อมรวมถึงเด็กอายุต่ำกว่าสิบสามปีตามวัตถุประสงค์ของ COPPA ของสหรัฐอเมริกา เด็กอายุต่ำกว่าสิบหกปีตามฐานของ GDPR มาตรา 8 (ขึ้นอยู่กับการปรับเปลี่ยนของรัฐสมาชิกระหว่างสิบสามถึงสิบหก) และเกณฑ์ที่เทียบเท่าภายใต้ LGPD, PDPA, และ PIPEDA หากท่านเป็นบิดามารดาหรือผู้ปกครองที่เชื่อว่าเราได้เก็บข้อมูลจากเด็กโดยไม่ตั้งใจ กรุณาเขียนถึง frank.caules@gmail.com แล้วเราจะตรวจสอบและลบให้",
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
