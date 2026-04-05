export type TestType =
  | "MBTI"
  | "BIGFIVE"
  | "ENNEAGRAM"
  | "HOLLAND"
  | "VALUES"
  | "VARK"
  | "STRENGTHS";

export type BigFiveTrait = "O" | "C" | "E" | "A" | "N";

export interface Option {
  id: string;
  label: string;
  text?: string;
  value?: number;
  dimensions?: Partial<Record<"E" | "I" | "S" | "N" | "T" | "F" | "J" | "P", number>>;
  holland?: Partial<Record<"R" | "I" | "A" | "S" | "E" | "C", number>>;
  enneagram?: Partial<Record<string, number>>;
  vark?: Partial<Record<"V" | "A" | "R" | "K", number>>;
  valueKey?: string;
  strengthKey?: string;
}

export interface Question {
  id: string;
  text: string;
  type: "binary" | "likert5" | "choice";
  options: Option[];
  dimension?: string;
  /** Büyük Beş: her madde tek boyuta gider; reverse ise 1–5 ters çevrilir */
  bigFiveItem?: { trait: BigFiveTrait; reverse?: boolean };
}

export interface TestProgress {
  testType: TestType;
  currentIndex: number;
  totalQuestions: number;
  answers: Record<string, string | number>;
  startedAt: string;
}
