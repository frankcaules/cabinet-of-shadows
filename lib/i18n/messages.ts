import type { Locale } from "@/lib/data/types";

/**
 * Static UI strings translated into every supported locale.
 *
 * Voice:
 *   • EN — Victorian-alienist register; archaic-leaning, scholarly.
 *   • TH — formal literary Thai with light scholarly archaism;
 *          mirrors the alienist's tone in the source-language manuscript.
 */
export const MESSAGES = {
  en: {
    siteTitle: "The Cabinet of Shadows",
    siteSubtitle: "A casebook in thirteen parts",
    siteDescription: "A Victorian alienist's casebook of the monsters of Gothic literature.",
    homeLede:
      "The reconstructed case files of an unnamed Victorian alienist, who collected the monsters of Gothic literature as if they were patients — and, on the evidence of his notebooks, came to suspect they were.",
    homeHint: "hover an object to identify · click to open the case",
    homeNavAlienist: "about the alienist",
    homeNavSources: "bibliography",

    skipLink: "Skip to dossier content",
    languageSwitch: "Switch language",
    languageEn: "English",
    languageTh: "ภาษาไทย",
    languageEnShort: "EN",
    languageThShort: "TH",

    eyebrowSubject: "From the casebook of the alienist · Subject {n}",
    scrollHint: "scroll to begin the case",
    backToCabinet: "back to the Cabinet",

    sectionLegend: "The Legend",
    sectionAnxiety: "The Anxiety",
    sectionClinical: "Clinical Note",
    sectionDiagnosis: "The Diagnosis",
    sectionExit: "The Case Closed",

    diagnosisPhenomenon: "Phenomenon",
    diagnosisResearcher: "First described by",
    diagnosisYear: "Year",
    diagnosisDSM: "DSM-5 status",
    diagnosisFurtherReading: "Further reading",

    citationCount: "{n} citations across {m} cases",
    citationLink: "DOI",

    stubTitle: "Catalogue pending",
    stubLede:
      "This dossier is in preparation. The alienist's notes for this patient have not yet been transcribed and bound.",
    stubReturn: "return to the Cabinet",

    notFoundTitle: "This monster has not yet been catalogued.",
    notFoundLede: "The alienist may have left these pages out of order. Try the Cabinet.",
    notFoundReturn: "return to the Cabinet",

    loadingEyebrow: "opening the cabinet…",

    sourcesTitle: "The Bibliography",
    sourcesLede:
      "Every clinical claim in this casebook is anchored to a real peer-reviewed source. The alienist's prose is original; the science he draws on is not. {n} citations across {m} cases, grouped here by the monster they explicate.",

    alienistTitle: "About the Alienist",
  },

  th: {
    siteTitle: "ตู้แห่งเงา",
    siteSubtitle: "แฟ้มคดีสิบสามภาค",
    siteDescription:
      "แฟ้มคดีของอลีนิสต์ยุควิกตอเรียผู้ไม่ระบุนาม รวบรวมปีศาจของวรรณกรรมกอธิคไว้ในฐานะผู้ป่วย",
    homeLede:
      "แฟ้มคดีอันได้รับการเรียบเรียงขึ้นใหม่ของอลีนิสต์ยุควิกตอเรียผู้ไม่ระบุนาม ผู้รวบรวมปีศาจของวรรณกรรมกอธิคไว้ราวกับว่าเป็นผู้ป่วย — และจากหลักฐานในสมุดบันทึกของเขา เขาเริ่มที่จะเชื่อว่าเป็นเช่นนั้นจริง ๆ",
    homeHint: "วางเมาส์ที่วัตถุเพื่อพิสูจน์ทราบ · คลิกเพื่อเปิดสำนวน",
    homeNavAlienist: "ว่าด้วยอลีนิสต์",
    homeNavSources: "บรรณานุกรม",

    skipLink: "ข้ามไปยังเนื้อหาสำนวน",
    languageSwitch: "เปลี่ยนภาษา",
    languageEn: "English",
    languageTh: "ภาษาไทย",
    languageEnShort: "EN",
    languageThShort: "TH",

    eyebrowSubject: "จากแฟ้มคดีของอลีนิสต์ · ผู้ป่วยที่ {n}",
    scrollHint: "เลื่อนลงเพื่อเริ่มสำนวน",
    backToCabinet: "กลับสู่ตู้แห่งเงา",

    sectionLegend: "ตำนาน",
    sectionAnxiety: "ความวิตกในยุคสมัย",
    sectionClinical: "บันทึกคลินิก",
    sectionDiagnosis: "ผลวินิจฉัย",
    sectionExit: "ปิดสำนวน",

    diagnosisPhenomenon: "ปรากฏการณ์",
    diagnosisResearcher: "ผู้อธิบายเป็นรายแรก",
    diagnosisYear: "ปีที่อธิบาย",
    diagnosisDSM: "สถานะใน DSM-5",
    diagnosisFurtherReading: "อ่านเพิ่มเติม",

    citationCount: "การอ้างอิง {n} รายการในสำนวน {m} เรื่อง",
    citationLink: "DOI",

    stubTitle: "อยู่ระหว่างการเรียบเรียง",
    stubLede:
      "สำนวนนี้ยังอยู่ในการเตรียมเอกสาร บันทึกของอลีนิสต์สำหรับผู้ป่วยรายนี้ยังมิได้รับการคัดลอกและเข้าเล่ม",
    stubReturn: "กลับสู่ตู้แห่งเงา",

    notFoundTitle: "ปีศาจรายนี้ยังมิได้รับการลงทะเบียน",
    notFoundLede: "อลีนิสต์อาจวางเอกสารเหล่านี้สลับลำดับ ลองค้นที่ตู้แห่งเงา",
    notFoundReturn: "กลับสู่ตู้แห่งเงา",

    loadingEyebrow: "กำลังเปิดตู้…",

    sourcesTitle: "บรรณานุกรม",
    sourcesLede:
      "ทุกข้ออ้างทางคลินิกในแฟ้มคดีนี้ผูกโยงกับแหล่งอ้างอิงที่ผ่านการพิจารณาโดยผู้ทรงคุณวุฒิจริง บทประพันธ์ของอลีนิสต์เป็นต้นฉบับ ทว่าหลักวิทยาศาสตร์ที่เขาอ้างอิงนั้นมิใช่ การอ้างอิง {n} รายการในสำนวน {m} เรื่อง จัดกลุ่มตามปีศาจที่ใช้อธิบาย",

    alienistTitle: "ว่าด้วยอลีนิสต์",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type MessageKey = keyof typeof MESSAGES.en;

/**
 * Translate a message key into the given locale. Falls back to English
 * if the locale is missing the key. Supports simple {placeholder}
 * interpolation.
 */
export function t(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  const dict = MESSAGES[locale] ?? MESSAGES.en;
  // Fallback chain: requested locale → English
  const raw = (dict as Record<string, string>)[key] ?? MESSAGES.en[key] ?? key;
  if (!vars) return raw;
  return Object.keys(vars).reduce(
    (acc, k) => acc.replaceAll(`{${k}}`, String(vars[k])),
    raw,
  );
}
