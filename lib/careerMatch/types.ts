/** Holland RIASEC ağırlıkları (0–5; eşleştirmede kosinüs benzerliği) */
export type HollandWeights = {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
};

/** MBTI eksenleri: -1 (I/S/T/P) … +1 (E/N/F/J) */
export type MBTIAxes = {
  ei: number;
  sn: number;
  tf: number;
  jp: number;
};

export type CatalogWeights = {
  holland: HollandWeights;
  mbtiIdeal?: MBTIAxes;
  values?: Partial<
    Record<
      | "achievement"
      | "purpose"
      | "autonomy"
      | "security"
      | "recognition"
      | "growth"
      | "service"
      | "balance"
      | "adventure"
      | "creativity"
      | "community"
      | "variety",
      number
    >
  >;
  vark?: Partial<Record<"V" | "A" | "R" | "K", number>>;
  strengths?: Partial<
    Record<
      | "communication"
      | "analytical"
      | "creative"
      | "execution"
      | "empathy"
      | "strategic"
      | "learning"
      | "discipline"
      | "adaptability"
      | "leadership"
      | "relationship"
      | "focus",
      number
    >
  >;
  enneagram?: Partial<Record<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9", number>>;
};

export interface ProfessionCatalogEntry extends CatalogWeights {
  id: string;
  title: string;
  category: string;
  futureOutlook: number;
}

export interface DepartmentCatalogEntry extends CatalogWeights {
  id: string;
  name: string;
  faculty: string;
  tracks: string[];
}

export interface RankedProfession {
  entry: ProfessionCatalogEntry;
  matchPercent: number;
  reason: string;
}

export interface RankedDepartment {
  entry: DepartmentCatalogEntry;
  matchPercent: number;
  reason: string;
}
