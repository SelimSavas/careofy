import { Brain, Circle, Eye, Heart, Hexagon, Star, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TEST_CENTER_ITEMS } from "@/lib/testConfig";

const iconMap = {
  ENNEAGRAM: Star,
  MBTI: Circle,
  BIGFIVE: Brain,
  HOLLAND: Hexagon,
  VALUES: Heart,
  VARK: Eye,
  STRENGTHS: Zap,
} as const;

const colorFor = (i: number) => {
  const cycle = [
    { bg: "bg-navy-800", fg: "text-white" },
    { bg: "bg-brand-100", fg: "text-brand-500" },
    { bg: "bg-navy-100", fg: "text-navy-800" },
  ];
  return cycle[i % cycle.length];
};

export function TestPreviewSection() {
  return (
    <section
      id="tests"
      className="relative border-y border-gray-200/80 bg-white px-6 py-section md:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-subtle opacity-[0.35]" />
      <div className="relative mx-auto max-w-figma">
        <h2 className="mb-4 text-center text-navy-800">7 Bilimsel Test, 1 Kapsamlı Analiz</h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-gray-500">
          Her test farklı bir açıdan seni tanıyor. Birlikte, benzersiz profilini oluşturuyorlar.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {TEST_CENTER_ITEMS.map((t, i) => {
            const Icon = iconMap[t.type];
            const { bg, fg } = colorFor(i);
            return (
              <Link key={t.slug} href="/tests/overview" className="group block h-full">
                <Card
                  hover
                  className="flex h-full flex-col transition duration-300 group-hover:-translate-y-1"
                >
                  <div
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${bg} transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon className={fg} size={32} strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-navy-800">{t.name}</h3>
                  <div className="mb-3 text-sm font-semibold text-brand-500">{t.questionsLabel}</div>
                  <p className="flex-1 leading-relaxed text-gray-500">{t.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
