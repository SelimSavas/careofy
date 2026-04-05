import { getQuestions } from "@/lib/questions";
import type { TestType } from "@/types/test.types";
import {
  scoreEnneagram,
  scoreHolland,
  scoreMBTI,
  scoreStrengths,
  scoreValues,
  scoreVARK,
} from "@/lib/scoring/scoreTests";

export function buildTestResultPayload(
  testType: TestType,
  answers: Record<string, string | number>
) {
  const qs = getQuestions(testType);
  switch (testType) {
    case "MBTI": {
      const r = scoreMBTI(answers, qs);
      return {
        rawScores: JSON.stringify(r),
        normalizedProfile: JSON.stringify({ mbti: { type: r.type, scores: r.scores } }),
        primaryResult: r.type,
        secondaryResult: null as string | null,
      };
    }
    case "ENNEAGRAM": {
      const r = scoreEnneagram(answers, qs);
      return {
        rawScores: JSON.stringify(r),
        normalizedProfile: JSON.stringify({
          enneagram: {
            type: r.type,
            wing: r.wing,
            code: r.code,
            growthDirection: r.growthDirection,
            stressDirection: r.stressDirection,
          },
        }),
        primaryResult: `Tip ${r.type}`,
        secondaryResult: r.code,
      };
    }
    case "HOLLAND": {
      const r = scoreHolland(answers, qs);
      return {
        rawScores: JSON.stringify(r),
        normalizedProfile: JSON.stringify({ holland: { code: r.code, scores: r.scores } }),
        primaryResult: r.code,
        secondaryResult: null,
      };
    }
    case "VALUES": {
      const r = scoreValues(answers, qs);
      return {
        rawScores: JSON.stringify(r),
        normalizedProfile: JSON.stringify({ values: { topValues: r.topValues, scores: r.scores } }),
        primaryResult: r.topValues[0] ?? "—",
        secondaryResult: r.topValues.slice(1).join(", ") || null,
      };
    }
    case "VARK": {
      const r = scoreVARK(answers, qs);
      return {
        rawScores: JSON.stringify(r),
        normalizedProfile: JSON.stringify({ vark: { dominant: r.dominant, scores: r.scores } }),
        primaryResult: r.dominant,
        secondaryResult: null,
      };
    }
    case "STRENGTHS": {
      const r = scoreStrengths(answers, qs);
      return {
        rawScores: JSON.stringify(r),
        normalizedProfile: JSON.stringify({
          strengths: { topThemes: r.topThemes, scores: r.scores },
        }),
        primaryResult: r.topThemes[0] ?? "—",
        secondaryResult: r.topThemes.slice(1).join(", ") || null,
      };
    }
    default:
      return {
        rawScores: "{}",
        normalizedProfile: "{}",
        primaryResult: "",
        secondaryResult: null,
      };
  }
}
