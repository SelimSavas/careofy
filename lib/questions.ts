import type { Question } from "@/types/test.types";
import type { TestType } from "@/types/test.types";
import mbti from "@/data/questions/mbti.json";
import enneagram from "@/data/questions/enneagram.json";
import holland from "@/data/questions/holland.json";
import values from "@/data/questions/values.json";
import vark from "@/data/questions/vark.json";
import strengths from "@/data/questions/strengths.json";

const MAP: Record<TestType, Question[]> = {
  MBTI: mbti as Question[],
  ENNEAGRAM: enneagram as Question[],
  HOLLAND: holland as Question[],
  VALUES: values as Question[],
  VARK: vark as Question[],
  STRENGTHS: strengths as Question[],
};

export function getQuestions(testType: TestType): Question[] {
  return MAP[testType] ?? [];
}
