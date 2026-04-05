export interface ProfileVector {
  mbti?: MBTIResult;
  enneagram?: EnneagramResult;
  holland?: HollandResult;
  values?: ValuesResult;
  vark?: VARKResult;
  strengths?: StrengthsResult;
}

export interface MBTIResult {
  type: string;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

export interface EnneagramResult {
  type: number;
  wing: number;
  code: string;
  growthDirection: number;
  stressDirection: number;
}

export interface HollandResult {
  code: string;
  scores: { R: number; I: number; A: number; S: number; E: number; C: number };
}

export interface ValuesResult {
  topValues: string[];
  scores: Record<string, number>;
}

export interface VARKResult {
  dominant: string;
  scores: { V: number; A: number; R: number; K: number };
}

export interface StrengthsResult {
  topThemes: string[];
  scores: Record<string, number>;
}

export interface StrengthItem {
  title: string;
  description: string;
  workApplication: string;
}

export interface GrowthItem {
  title: string;
  description: string;
  tip: string;
}

export interface FamousMatch {
  name: string;
  profession: string;
  matchScore: number;
  connection: string;
}

export interface RecommendationItem {
  title: string;
  type?: string;
  matchScore: number;
  reason: string;
  futureScore: number;
  salaryRange?: string;
  requiredSkills?: string[];
  transitionTime?: string;
  city?: string[];
}

export interface RoadmapMilestone {
  title: string;
  description: string;
  actions: string[];
  skills: string[];
}

export interface CareerRoadmap {
  now: RoadmapMilestone;
  oneYear: RoadmapMilestone;
  threeYear: RoadmapMilestone;
  fiveYear: RoadmapMilestone;
}

export interface ActionStep {
  timeframe: string;
  actions: string[];
}

/** Onboarding’den gelen bağlam; rapor ve öneri metinlerinde gösterilir. */
export interface UserContextSnapshot {
  role: "STUDENT" | "WORKER";
  displayName?: string;
  age?: number;
  city?: string;
  gradeLevel?: string;
  examField?: string;
  jobTitle?: string;
  industry?: string;
  yearsExp?: number;
}

export interface AIReportData {
  profileSummary: string;
  personalityTitle: string;
  strengths: StrengthItem[];
  growthAreas: GrowthItem[];
  famousMatches: FamousMatch[];
  recommendations: RecommendationItem[];
  careerRoadmap?: CareerRoadmap;
  personalLetter: string;
  actionPlan: ActionStep[];
  sideHustles?: { title: string; reason: string; startTip: string }[];
  userContextSnapshot?: UserContextSnapshot;
}
