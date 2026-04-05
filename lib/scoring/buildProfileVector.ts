import { getQuestions } from "@/lib/questions";
import { ALL_TEST_TYPES } from "@/lib/testMeta";
import type { TestType } from "@/types/test.types";
import type { ProfileVector } from "@/types/report.types";
import {
  scoreBigFive,
  scoreEnneagram,
  scoreHolland,
  scoreMBTI,
  scoreStrengths,
  scoreValues,
  scoreVARK,
} from "@/lib/scoring/scoreTests";

export function buildProfileVector(
  sessions: Partial<
    Record<
      TestType,
      { answers: Record<string, string | number>; completed?: boolean }
    >
  >
): ProfileVector {
  const out: ProfileVector = {};
  for (const t of ALL_TEST_TYPES) {
    const s = sessions[t];
    if (!s?.completed) continue;
    const qs = getQuestions(t);
    switch (t) {
      case "MBTI": {
        const r = scoreMBTI(s.answers, qs);
        out.mbti = { type: r.type, scores: r.scores };
        break;
      }
      case "BIGFIVE": {
        const r = scoreBigFive(s.answers, qs);
        out.bigFive = { scores: r.scores, topTraits: r.topTraits };
        break;
      }
      case "ENNEAGRAM": {
        const r = scoreEnneagram(s.answers, qs);
        out.enneagram = {
          type: r.type,
          wing: r.wing,
          code: r.code,
          growthDirection: r.growthDirection,
          stressDirection: r.stressDirection,
        };
        break;
      }
      case "HOLLAND": {
        const r = scoreHolland(s.answers, qs);
        out.holland = { code: r.code, scores: r.scores };
        break;
      }
      case "VALUES": {
        const r = scoreValues(s.answers, qs);
        out.values = { topValues: r.topValues, scores: r.scores };
        break;
      }
      case "VARK": {
        const r = scoreVARK(s.answers, qs);
        out.vark = { dominant: r.dominant, scores: r.scores };
        break;
      }
      case "STRENGTHS": {
        const r = scoreStrengths(s.answers, qs);
        out.strengths = { topThemes: r.topThemes, scores: r.scores };
        break;
      }
      default:
        break;
    }
  }
  return out;
}
