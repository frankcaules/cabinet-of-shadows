import { notFound } from "next/navigation";
import Link from "next/link";
import { listMonsters } from "@/lib/data/monsters";
import { LOCALES, type Locale } from "@/lib/data/types";
import { t } from "@/lib/i18n/messages";
import { Colophon } from "@/components/site/Colophon";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const PATIENTS_BY_DECADE: Record<string, string[]> = {
  "1810s–1820s": ["the-creature", "horseman"],
  "1830s–1840s": ["jack", "sweeney", "varney"],
  "1860s–1870s": ["the-wolf", "carmilla"],
  "1880s–1890s": ["hyde", "dorian", "dracula", "griffin"],
  "1900s–1910s": ["erik", "golem"],
};

interface AlienistCopy {
  eyebrow: string;
  title: string;
  back: string;
  scheduleHeading: string;
  paragraphs: string[]; // before the schedule
  voiceHeading: string;
  voiceParas: string[];
  opinionHeading: string;
  opinionParas: string[];
  requestHeading: string;
  requestParas: string[];
  signature: string;
  footerLink: string;
}

const COPY: Record<Locale, AlienistCopy> = {
  en: {
    eyebrow: "A note from the editor",
    title: "On the Alienist",
    back: "← back to the Cabinet",
    scheduleHeading: "Schedule of admissions",
    paragraphs: [
      "The documents collected in this Cabinet are presented to the modern reader as if from the private notebooks of an unnamed Victorian alienist — that elegant nineteenth-century word for a doctor of the mind, predating <em>psychiatrist</em> by several decades and carrying its own particular flavour: a clinician who treats those who have become, by some inscrutable process, foreign to themselves.",
      "The alienist is a fiction. The cases are not.",
      "By this we mean: the alienist himself — his consulting room, his hand-bound casebook, his arch and self-aware narrative voice — is an editorial conceit invented to do a particular job, which is to bind together thirteen disparate monsters of Gothic literature inside a single coherent frame. The monsters are literary; the alienist who treats them is, on the plain evidence, an impossibility. He could not have read Freud in 1819, when his casebook accepts Frankenstein's Creature; he could not have read Bowlby in 1865, when he is ostensibly receiving Sabine Baring-Gould; he could not have read Spiegel and Loewenstein in 1886, when Stevenson sends him Mr. Hyde. His chronology is bad. His chronology is deliberately bad. The point of the chronology is to allow him to bring the modern clinical literature to bear on cases the period itself could not have correctly read.",
      "The clinical literature, by contrast, is real. Every paper the alienist cites in his margin notes is a real peer-reviewed paper, indexed and retrievable; the bibliography is on the [bibliography] page of this same Cabinet; the DOIs are live. Where the alienist offers a synthesis — that the Creature is a case study in disorganised attachment, that the Werewolf maps to documented clinical lycanthropy, that Spring-Heeled Jack is a print-era instance of mass sociogenic illness — these are not the alienist's idiosyncratic readings. They are positions taken in the actual literature on those works, by clinicians and humanities scholars whose names appear in the references.",
      "The thirteen cases sit across roughly a century of Gothic publication. Read in the order their patients arrived, the casebook is arranged thus:",
    ],
    voiceHeading: "On the choice of voice",
    voiceParas: [
      "We considered, in early drafts, presenting these materials as a contemporary essay — a plain modern voice walking the reader through the literature monster by monster. We rejected this for two reasons.",
      "The first is that the literature is much more interesting than the essay form makes it look. The disorganised-attachment reading of the Creature is, in the original Bowlby and Ainsworth, a thrilling piece of work; the clinical-lycanthropy review by Blom is, in its systematic survey of thirteen real cases, an act of considerable scholarly nerve; the Jonason et al. paper on Dorian Gray is so cleanly stated that one suspects its authors of having had fun. To present them in a flattened modern register is to lose what makes them worth reading at all.",
      "The second is that the alienist's voice — measured, faintly self-amused, never afraid of a Latinate verb when an Anglo-Saxon one will not do the work — gives the reader permission to take the cases seriously without taking the apparatus seriously. The Cabinet is a serious science-communication project that happens to be wearing a velvet coat. The coat is there because, in our experience, readers will follow a man in a velvet coat into the bibliography rather more readily than they will follow a man in a lab coat.",
    ],
    opinionHeading: "On what is and is not the alienist's opinion",
    opinionParas: [
      "The alienist speaks, on each dossier, with the air of a clinician closing a file. He says what the literature says. Where he editorialises — for instance, in his insistence that the Creature's violence is the absence rather than the meaning of the case, or in his discomfort with the romance reading of the Phantom — the editorial position is one we, the present authors, are willing to defend. Where he declines to editorialise — for instance, on the question of whether the Headless Horseman literally rides — he is declining for our reasons too. We are happy to leave that question with the country folk to whom it belongs.",
      "A reader who wishes to verify any clinical claim made in any dossier should follow the superscript numerals to the citations at the foot of the section, or consult the [bibliography], which is comprehensive.",
    ],
    requestHeading: "A request",
    requestParas: [
      "If you finish a dossier and feel the urge to pick up the original novel afterwards, the casebook has done what it set out to do. We did not make this Cabinet to replace the Gothic tradition with its clinical reading; we made it to suggest that the clinical reading is, in many cases, what the tradition was already telling us, in the only voice it had available.",
    ],
    signature: "— the Editors, 2026",
    footerLink: "Return to the Cabinet →",
  },
  th: {
    eyebrow: "บันทึกจากบรรณาธิการ",
    title: "ว่าด้วยอลีนิสต์",
    back: "← กลับสู่ตู้แห่งเงา",
    scheduleHeading: "ตารางการรับผู้ป่วย",
    paragraphs: [
      "เอกสารที่รวบรวมในตู้แห่งเงานี้ถูกนำเสนอแก่ผู้อ่านยุคใหม่ราวกับว่ามาจากสมุดบันทึกส่วนตัวของอลีนิสต์ยุควิกตอเรียผู้ไม่ระบุนาม — ศัพท์อันงามจากคริสต์ศตวรรษที่ 19 ที่ใช้เรียกแพทย์ผู้รักษาจิตใจ ปรากฏก่อนคำว่า <em>จิตแพทย์</em> หลายสิบปี และมีกลิ่นอายเฉพาะตัว คือแพทย์ผู้รักษาบุคคลซึ่งโดยกระบวนการอันลึกลับบางอย่างได้กลายเป็นคนแปลกหน้าต่อตัวเอง",
      "อลีนิสต์เป็นสิ่งสมมุติ สำนวนคดีหาได้เป็นเช่นนั้นไม่",
      "หมายความว่าตัวอลีนิสต์เอง — ห้องตรวจของเขา สมุดบันทึกที่เย็บด้วยมือ สำเนียงเล่าเรื่องอันแฝงด้วยอารมณ์ขันและความรู้ตัว — เป็นกลวิธีทางบรรณาธิการที่ประดิษฐ์ขึ้นเพื่อภารกิจเฉพาะ คือการผูกปีศาจสิบสามตนแห่งวรรณกรรมกอธิคที่แตกต่างกันให้อยู่ในกรอบเดียวกัน ปีศาจเป็นเรื่องวรรณกรรม ส่วนอลีนิสต์ผู้รักษาพวกเขานั้น เมื่อพิจารณาตามหลักฐานแล้วเป็นความเป็นไปไม่ได้ เขามิอาจอ่านฟรอยด์ในปี ค.ศ. 1819 เมื่อสมุดบันทึกของเขารับผู้ป่วยคือมนุษย์ของแฟรงเกนสไตน์ เขามิอาจอ่านโบว์ลบีในปี ค.ศ. 1865 เมื่อเขารับผู้ป่วยคือบาริง-กูลด์ เขามิอาจอ่านสปีเกลและเลอเวนสไตน์ในปี ค.ศ. 1886 เมื่อสตีเวนสันส่งมิสเตอร์ไฮด์มาให้ ลำดับเวลาของเขามิตรงกับความเป็นจริง โดยจงใจ ประเด็นของลำดับเวลาคือการเปิดโอกาสให้เขานำวรรณกรรมคลินิกสมัยใหม่มาตีความสำนวนที่ยุคสมัยของมันเองมิอาจอ่านได้อย่างถูกต้อง",
      "ในทางตรงข้าม วรรณกรรมคลินิกเป็นของจริง ทุกบทความที่อลีนิสต์อ้างอิงในเชิงอรรถของเขาเป็นบทความที่ผ่านการพิจารณาโดยผู้ทรงคุณวุฒิจริง สามารถสืบค้นและเข้าถึงได้ บรรณานุกรมอยู่ที่หน้า [bibliography] ของตู้นี้ หมายเลข DOI ใช้งานได้จริง เมื่ออลีนิสต์เสนอการสังเคราะห์ — เช่นว่ามนุษย์ของแฟรงเกนสไตน์เป็นกรณีศึกษาของความผูกพันแบบไร้ระเบียบ (disorganised attachment) ว่ามนุษย์หมาป่าตรงกับโรคแสดงตนเป็นหมาป่าทางคลินิก (clinical lycanthropy) ที่บันทึกไว้ ว่าสปริง-ฮีลด์แจ็คเป็นกรณีโรคทางจิตหมู่ในยุคสิ่งพิมพ์ — สิ่งเหล่านี้มิใช่การตีความตามใจตนของอลีนิสต์ แต่คือจุดยืนที่ปรากฏในวรรณกรรมจริงเกี่ยวกับผลงานเหล่านั้น โดยแพทย์และนักวิชาการมนุษยศาสตร์ ซึ่งชื่อปรากฏในรายการอ้างอิง",
      "สิบสามสำนวนนี้ครอบคลุมระยะเวลาประมาณหนึ่งศตวรรษของการตีพิมพ์วรรณกรรมกอธิค หากอ่านตามลำดับที่ผู้ป่วยมาถึง สมุดบันทึกถูกจัดเรียงดังนี้",
    ],
    voiceHeading: "ว่าด้วยการเลือกใช้สำเนียง",
    voiceParas: [
      "ในร่างแรกเราเคยพิจารณาที่จะนำเสนอเอกสารเหล่านี้ในรูปบทความร่วมสมัย — สำเนียงสมัยใหม่ที่เรียบง่ายพาผู้อ่านผ่านวรรณกรรมแต่ละเรื่อง เราปฏิเสธวิธีนี้ด้วยเหตุผลสองประการ",
      "ประการแรก วรรณกรรมนั้นน่าสนใจกว่ารูปแบบบทความมาก การอ่านมนุษย์ของแฟรงเกนสไตน์ผ่านมุมมองความผูกพันไร้ระเบียบ ในต้นฉบับของโบว์ลบีและเอนสเวิร์ธ เป็นงานที่ตื่นเต้นเร้าใจ การทบทวนโรคแสดงตนเป็นหมาป่าทางคลินิกของบลอม ในการสำรวจสิบสามกรณีจริงอย่างเป็นระบบ เป็นการกระทำที่กล้าหาญทางวิชาการ บทความของโจนาสันและคณะเกี่ยวกับโดเรียน เกรย์ เขียนได้ชัดเจนจนน่าสงสัยว่าผู้นิพนธ์สนุกกับงานนั้น การนำเสนอในระดับเสียงสมัยใหม่ที่ปราศจากชั้นเชิงคือการสูญเสียสิ่งที่ทำให้พวกมันคุ้มค่าแก่การอ่าน",
      "ประการที่สอง สำเนียงของอลีนิสต์ — สงบสำรวม แฝงอารมณ์ขันต่อตนเองเล็กน้อย ไม่เคยเกรงที่จะใช้ศัพท์ละตินเมื่อศัพท์แอนโกล-แซกซันไม่อาจทำหน้าที่ได้ — ให้สิทธิ์ผู้อ่านในการรับรู้สำนวนคดีอย่างจริงจังโดยไม่ต้องรับรู้กลไกการนำเสนอจริงจังเกินไป ตู้แห่งเงาเป็นโครงการสื่อสารวิทยาศาสตร์อย่างจริงจังที่บังเอิญสวมเสื้อกำมะหยี่ เสื้อนั้นมีไว้เพราะในประสบการณ์ของเรา ผู้อ่านจะเดินตามชายเสื้อกำมะหยี่เข้าสู่บรรณานุกรมได้ง่ายกว่าตามชายในเสื้อกาวน์แล็บมาก",
    ],
    opinionHeading: "ว่าด้วยสิ่งที่เป็นและไม่เป็นความเห็นของอลีนิสต์",
    opinionParas: [
      "อลีนิสต์พูดในแต่ละสำนวนด้วยท่าทางของแพทย์ผู้กำลังปิดแฟ้ม เขากล่าวสิ่งที่วรรณกรรมกล่าว ที่ใดเขาแสดงความเห็นส่วนตัว — เช่นในการยืนกรานว่าความรุนแรงของมนุษย์ของแฟรงเกนสไตน์คือการขาดหายมิใช่ความหมายของคดี หรือในความไม่สบายใจของเขาต่อการอ่านแฟนทอมในแนวโรแมนติก — จุดยืนทางบรรณาธิการนั้นเป็นจุดยืนที่ผู้นิพนธ์ปัจจุบันเรายินดีปกป้อง ที่ใดเขาปฏิเสธที่จะแสดงความเห็น — เช่นในประเด็นว่าผู้ขี่ม้าไร้หัวขี่ม้าจริงหรือไม่ — เขาปฏิเสธด้วยเหตุผลของเราเช่นกัน เรายินดีที่จะปล่อยคำถามนั้นไว้กับชาวบ้านในชนบทผู้เป็นเจ้าของมัน",
      "ผู้อ่านที่ต้องการตรวจสอบข้ออ้างทางคลินิกในสำนวนใดสามารถติดตามเลขยกของอ้างอิงไปยังเชิงอรรถท้ายภาค หรือสืบค้นจาก [bibliography] ซึ่งครอบคลุมทุกรายการ",
    ],
    requestHeading: "คำขอ",
    requestParas: [
      "หากท่านอ่านสำนวนใดจบแล้วรู้สึกอยากหยิบนวนิยายต้นฉบับขึ้นมาอ่าน สมุดบันทึกนี้ได้บรรลุภารกิจที่ตั้งไว้แล้ว เรามิได้สร้างตู้แห่งเงานี้เพื่อแทนที่ขนบกอธิคด้วยการอ่านเชิงคลินิก แต่เพื่อเสนอแนะว่าการอ่านเชิงคลินิกในหลายกรณีคือสิ่งที่ขนบนั้นกำลังบอกเราอยู่แล้ว ในเสียงเดียวที่มันมี",
    ],
    signature: "— กองบรรณาธิการ, ค.ศ. 2026",
    footerLink: "กลับสู่ตู้แห่งเงา →",
  },
};

/**
 * Render a paragraph of trusted editorial copy with two interpolations:
 *   • `[bibliography]`  → a Next <Link> to /<locale>/sources
 *   • `<em>...</em>`    → an italic <em> element
 *
 * Uses an allowlist parser instead of dangerouslySetInnerHTML so the
 * rendered tree is always safe, even if future copy is sourced from a
 * less-trusted place (translators, CMS, etc.).
 */
function renderParaWithLinks(p: string, locale: Locale) {
  // First split on the [bibliography] token. Then within each plain segment,
  // split on the limited <em>...</em> tag we allow. Anything that doesn't
  // match either is rendered as a literal text node — never as HTML.
  const tokenParts = p.split(/(\[bibliography\])/g);
  const out: React.ReactNode[] = [];
  let key = 0;
  for (const tp of tokenParts) {
    if (tp === "[bibliography]") {
      out.push(
        <Link key={key++} href={`/${locale}/sources`}>
          {t(locale, "homeNavSources")}
        </Link>,
      );
      continue;
    }
    const emParts = tp.split(/(<em>[^<]*<\/em>)/g);
    for (const ep of emParts) {
      const m = /^<em>([^<]*)<\/em>$/.exec(ep);
      if (m) {
        out.push(<em key={key++}>{m[1]}</em>);
      } else if (ep) {
        out.push(<span key={key++}>{ep}</span>);
      }
    }
  }
  return out;
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AlienistPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!LOCALES.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const copy = COPY[locale];
  const monstersByLocale = Object.fromEntries(
    listMonsters(locale).map((m) => [m.slug, m]),
  );

  return (
    <main id="main" className="alienist">
      <header className="alienist__header">
        <p className="alienist__eyebrow">{copy.eyebrow}</p>
        <h1 className="alienist__title">{copy.title}</h1>
        <p className="alienist__return">
          <Link href={`/${locale}`}>{copy.back}</Link>
        </p>
      </header>

      <section className="alienist__prose">
        {copy.paragraphs.map((p, i) => (
          <p key={i}>{renderParaWithLinks(p, locale)}</p>
        ))}
      </section>

      <section className="alienist__schedule" aria-label={copy.scheduleHeading}>
        <ol>
          {Object.entries(PATIENTS_BY_DECADE).map(([decade, slugs]) => (
            <li key={decade}>
              <span className="alienist__decade">{decade}</span>
              <span className="alienist__patients">
                {slugs.map((s, i) => {
                  const m = monstersByLocale[s];
                  if (!m) return null;
                  return (
                    <span key={s}>
                      <Link href={`/${locale}/dossier/${s}`}>{m.name}</Link>
                      {i < slugs.length - 1 ? " · " : ""}
                    </span>
                  );
                })}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="alienist__prose">
        <h2 className="alienist__h2">{copy.voiceHeading}</h2>
        {copy.voiceParas.map((p, i) => (
          <p key={i}>{renderParaWithLinks(p, locale)}</p>
        ))}
        <h2 className="alienist__h2">{copy.opinionHeading}</h2>
        {copy.opinionParas.map((p, i) => (
          <p key={i}>{renderParaWithLinks(p, locale)}</p>
        ))}
        <h2 className="alienist__h2">{copy.requestHeading}</h2>
        {copy.requestParas.map((p, i) => (
          <p key={i}>{renderParaWithLinks(p, locale)}</p>
        ))}
        <p className="alienist__sig">{copy.signature}</p>
      </section>

      <footer className="alienist__footer">
        <p>
          <Link href={`/${locale}`}>{copy.footerLink}</Link>
        </p>
      </footer>

      <Colophon locale={locale} />

      <style>{`
        .alienist {
          --measure: 38rem;
          max-width: 100%;
          padding: 5rem 1.5rem 6rem;
          margin: 0 auto;
        }
        .alienist__header,
        .alienist__prose,
        .alienist__schedule,
        .alienist__footer {
          max-width: var(--measure);
          margin: 0 auto;
        }
        .alienist__eyebrow {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          opacity: 0.7;
          color: var(--color-cabinet-accent);
          margin: 0;
        }
        .alienist__title {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(2.5rem, 4vw + 1rem, 4rem);
          line-height: 1.05;
          margin: 0.4rem 0 1.25rem;
        }
        .alienist__return {
          margin: 1.5rem 0 0;
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .alienist__return a { text-decoration: none; }
        .alienist__return a:hover { text-decoration: underline; }
        .alienist__prose { margin: 3rem auto 0; }
        .alienist__prose p {
          font-family: var(--font-body-default);
          font-size: 1.05rem;
          line-height: 1.7;
          text-align: justify;
          hyphens: auto;
          margin: 0 0 1.15rem;
        }
        .alienist__prose p:first-of-type::first-letter {
          font-family: var(--font-display-default);
          font-size: 3.4em;
          float: left;
          line-height: 0.88;
          margin: 0.05em 0.18em 0 0;
          color: var(--color-cabinet-accent);
        }
        .alienist__h2 {
          font-family: var(--font-display-default);
          font-style: italic;
          font-size: clamp(1.4rem, 1.5vw + 1rem, 1.8rem);
          margin: 2.5rem 0 0.9rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-cabinet-rule);
        }
        .alienist__sig {
          font-style: italic;
          opacity: 0.7;
          margin-top: 2rem;
        }
        .alienist__schedule {
          margin: 2.5rem auto;
          padding: 1.5rem 0;
          border-top: 1px solid var(--color-cabinet-rule);
          border-bottom: 1px solid var(--color-cabinet-rule);
        }
        .alienist__schedule ol {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.85rem;
        }
        .alienist__schedule li {
          display: grid;
          grid-template-columns: 9rem 1fr;
          gap: 1rem;
          align-items: baseline;
        }
        @media (max-width: 540px) {
          .alienist__schedule li { grid-template-columns: 1fr; gap: 0.25rem; }
        }
        .alienist__decade {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-cabinet-accent);
          opacity: 0.85;
        }
        .alienist__patients {
          font-family: var(--font-body-default);
          font-size: 1rem;
          line-height: 1.55;
        }
        .alienist__patients a {
          color: var(--color-cabinet-ink);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 180ms ease;
        }
        .alienist__patients a:hover,
        .alienist__patients a:focus-visible {
          border-bottom-color: var(--color-cabinet-accent);
        }
        .alienist__footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-cabinet-rule);
          text-align: center;
        }
        .alienist__footer a {
          font-family: ui-monospace, "Cascadia Mono", Consolas, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
      `}</style>
    </main>
  );
}
