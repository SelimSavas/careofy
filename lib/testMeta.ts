import type { TestType } from "@/types/test.types";

/** Tüm test türleri (sıra: merkez + API ile aynı) */
export const ALL_TEST_TYPES: TestType[] = [
  "MBTI",
  "BIGFIVE",
  "ENNEAGRAM",
  "HOLLAND",
  "VALUES",
  "VARK",
  "STRENGTHS",
];

/** Soru sayıları — data/questions/*.json ile senkron (scripts/gen_questions.py) */
export const TEST_QUESTION_COUNTS: Record<TestType, number> = {
  MBTI: 28,
  BIGFIVE: 30,
  ENNEAGRAM: 24,
  HOLLAND: 24,
  VALUES: 20,
  VARK: 16,
  STRENGTHS: 24,
};

export const TEST_SLUGS: Record<string, TestType> = {
  mbti: "MBTI",
  bigfive: "BIGFIVE",
  enneagram: "ENNEAGRAM",
  holland: "HOLLAND",
  values: "VALUES",
  vark: "VARK",
  strengths: "STRENGTHS",
};

export const TEST_LABELS: Record<TestType, string> = {
  MBTI: "MBTI Kişilik Testi",
  BIGFIVE: "Büyük Beş (OCEAN)",
  ENNEAGRAM: "Enneagram",
  HOLLAND: "Holland RIASEC",
  VALUES: "Değerler Testi",
  VARK: "VARK Öğrenme Stili",
  STRENGTHS: "Güçlü Yönler",
};
