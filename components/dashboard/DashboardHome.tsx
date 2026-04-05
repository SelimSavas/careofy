"use client";

import { Download, Sparkles } from "lucide-react";
import Link from "next/link";
import { PersonalityRadar } from "@/components/dashboard/PersonalityRadar";
import { UserContextSummaryCard } from "@/components/dashboard/UserContextSummaryCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BIGFIVE_TRAIT_LABELS } from "@/lib/bigFiveLabels";
import { useReportStore } from "@/store/reportStore";

export function DashboardHome() {
  const pv = useReportStore((s) => s.profileVector);
  const report = useReportStore((s) => s.reportData);

  const mbti = pv?.mbti?.type ?? "—";
  const ennea = pv?.enneagram?.code ?? "—";
  const holland = pv?.holland?.code ?? "—";
  const val = pv?.values?.topValues?.[0] ?? "—";
  const vark = pv?.vark?.dominant ?? "—";
  const str = pv?.strengths?.topThemes?.[0] ?? "—";
  const bf =
    pv?.bigFive?.topTraits
      ?.map((k) => BIGFIVE_TRAIT_LABELS[k as keyof typeof BIGFIVE_TRAIT_LABELS] ?? k)
      .join(" · ") ?? "—";

  const testResults = [
    { name: "MBTI", result: mbti, description: pv?.mbti ? "Özet tip" : "Testi tamamla" },
    {
      name: "Büyük Beş",
      result: bf,
      description: pv?.bigFive ? "Öne çıkan boyutlar" : "Testi tamamla",
    },
    {
      name: "Enneagram",
      result: ennea,
      description: pv?.enneagram ? "Tip ve kanat" : "Testi tamamla",
    },
    {
      name: "Holland",
      result: holland,
      description: pv?.holland ? "İlgi kodu" : "Testi tamamla",
    },
    { name: "Değerler", result: val, description: pv?.values ? "Öncelik" : "Testi tamamla" },
    { name: "VARK", result: vark, description: pv?.vark ? "Öğrenme stili" : "Testi tamamla" },
    {
      name: "Güçlü Yönler",
      result: str,
      description: pv?.strengths ? "Öne çıkan tema" : "Testi tamamla",
    },
  ];

  const recommendations =
    report?.recommendations?.slice(0, 3).map((r) => ({
      title: r.title,
      match: r.matchScore,
      reason: r.reason,
    })) ?? [
      { title: "Öneriler için testleri tamamla", match: 0, reason: "Analiz sonrası kişiselleşecek" },
    ];

  const strengths =
    report?.strengths?.map((s) => s.title) ??
    (pv?.strengths?.topThemes?.length
      ? pv.strengths.topThemes
      : ["Empati", "Strateji", "Yaratıcılık", "Liderlik", "Analitik"]);

  const title = report?.personalityTitle ?? "Kişilik profilin";
  const subtitle = mbti !== "—" ? "Savunucu profiline yakın bir özet" : "Testleri tamamlayınca burası dolacak";

  return (
    <main className="p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {report?.userContextSnapshot ? (
          <UserContextSummaryCard snapshot={report.userContextSnapshot} className="mb-6" />
        ) : null}
        {report && (
          <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-100 to-brand-50 p-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <div className="font-semibold text-brand-500">Analizin hazır!</div>
                <div className="text-sm text-gray-700">
                  Ünlü eşleşmelerini ve detayları raporda gör
                </div>
              </div>
            </div>
            <Link href="/dashboard/report">
              <Button variant="ghost" className="text-brand-500 hover:bg-brand-500/10">
                Görüntüle →
              </Button>
            </Link>
          </div>
        )}

        <Card
          variant="accent"
          className="mb-8 bg-gradient-to-br from-navy-800 to-navy-700 p-8"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="mb-2 text-sm text-white/70">Kişilik özetin</div>
              <div className="mb-2 font-heading text-5xl font-bold text-brand-500">
                {mbti}
              </div>
              <div className="mb-4 text-xl text-white">{title}</div>
              <p className="mb-6 text-sm text-white/70">{subtitle}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {ennea !== "—" && (
                  <Badge variant="type" className="border border-white/20 bg-white/10 text-white">
                    Enneagram {ennea}
                  </Badge>
                )}
                {holland !== "—" && (
                  <Badge variant="type" className="border border-white/20 bg-white/10 text-white">
                    {holland}
                  </Badge>
                )}
                {vark !== "—" && (
                  <Badge variant="type" className="border border-white/20 bg-white/10 text-white">
                    {vark}
                  </Badge>
                )}
              </div>
              <div className="text-sm text-white/70">Güçlü yönler</div>
              <div className="mt-2 flex flex-wrap gap-1 text-sm text-white">
                {strengths.map((strength) => (
                  <span key={strength}>
                    {strength}
                    <span className="mx-1 text-white/50">·</span>
                  </span>
                ))}
              </div>
            </div>
            <PersonalityRadar />
          </div>
        </Card>

        <div className="mb-8">
          <h3 className="mb-4 text-navy-800">Test sonuçların</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {testResults.map((test) => (
              <Card key={test.name} hover className="group cursor-pointer">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="mb-1 text-sm text-gray-500">{test.name}</div>
                    <div className="font-heading text-xl font-bold text-navy-800">
                      {test.result}
                    </div>
                  </div>
                  <Sparkles className="text-brand-500 opacity-0 transition group-hover:opacity-100" size={20} />
                </div>
                <p className="mb-3 text-sm text-gray-500">{test.description}</p>
                <Link href="/tests/overview" className="text-sm font-semibold text-brand-500 hover:underline">
                  Test merkezi →
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-navy-800">Öne çıkan öneriler</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendations.map((rec) => (
              <Card key={rec.title} hover className="group cursor-pointer">
                <Badge variant="match" className="mb-3">
                  {rec.match ? `${rec.match}% Uyum` : "Öneri"}
                </Badge>
                <h4 className="mb-2 text-navy-800">{rec.title}</h4>
                <p className="mb-4 text-sm text-gray-500">{rec.reason}</p>
                <Link
                  href="/dashboard/recommendations"
                  className="text-sm font-semibold text-brand-500 hover:underline"
                >
                  Detay →
                </Link>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/dashboard/download">
            <Button variant="primary" icon={<Download size={20} />}>
              Raporumu indir
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
