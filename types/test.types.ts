export type TestType =
  | "MBTI"
  | "ENNEAGRAM"
  | "HOLLAND"
  | "VALUES"
  | "VARK"
  | "STRENGTHS";

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
}

export interface TestProgress {
  testType: TestType;
  currentIndex: number;
  totalQuestions: number;
  answers: Record<string, string | number>;
  startedAt: string;
}
