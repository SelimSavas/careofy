export type UserRoleType = "STUDENT" | "WORKER";

export interface OnboardingBackground {
  gradeLevel?: string;
  examField?: string;
  jobTitle?: string;
  industry?: string;
  yearsExp?: number;
  changeDesire?: number;
  city?: string;
  age?: number;
  interests: string[];
}
