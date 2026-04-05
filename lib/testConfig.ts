import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Circle,
  Eye,
  Heart,
  Hexagon,
  Star,
  Zap,
} from "lucide-react";
import type { TestType } from "@/types/test.types";
import { TEST_QUESTION_COUNTS } from "@/lib/testMeta";

export const TEST_CENTER_ITEMS: {
  type: TestType;
  icon: LucideIcon;
  name: string;
  duration: string;
  questionsLabel: string;
  description: string;
  slug: string;
}[] = [
  {
    type: "ENNEAGRAM",
    icon: Star,
    name: "Enneagram",
    duration: "22–28 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.ENNEAGRAM} Soru`,
    description: "9 kişilik tipi ve kanat yapını keşfet",
    slug: "enneagram",
  },
  {
    type: "MBTI",
    icon: Circle,
    name: "MBTI",
    duration: "25–32 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.MBTI} Soru`,
    description: "Tercih temelli maddelerle 16 tipe yakın profil özeti",
    slug: "mbti",
  },
  {
    type: "BIGFIVE",
    icon: Brain,
    name: "Büyük Beş",
    duration: "12–18 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.BIGFIVE} Soru`,
    description: "Araştırmada sık kullanılan beş boyut: açıklık, özdisiplin, dışadönüklük, uyumluluk, duygusal yoğunluk",
    slug: "bigfive",
  },
  {
    type: "HOLLAND",
    icon: Hexagon,
    name: "Holland RIASEC",
    duration: "18–24 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.HOLLAND} Soru`,
    description: "Kariyer ilgi alanlarını keşfet",
    slug: "holland",
  },
  {
    type: "VALUES",
    icon: Heart,
    name: "Değerler Testi",
    duration: "14–18 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.VALUES} Soru`,
    description: "Temel değerlerini ve önceliklerini öğren",
    slug: "values",
  },
  {
    type: "VARK",
    icon: Eye,
    name: "VARK",
    duration: "12–15 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.VARK} Soru`,
    description: "Öğrenme stilini belirle",
    slug: "vark",
  },
  {
    type: "STRENGTHS",
    icon: Zap,
    name: "Güçlü Yönler",
    duration: "22–28 dk",
    questionsLabel: `${TEST_QUESTION_COUNTS.STRENGTHS} Soru`,
    description: "Öne çıkan yetenek alanlarını keşfet",
    slug: "strengths",
  },
];
