"use client";

import Link from "next/link";
import { UserContextSummaryCard } from "@/components/dashboard/UserContextSummaryCard";
import { MatchScoreTransparency } from "@/components/legal/MatchScoreTransparency";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useReportStore } from "@/store/reportStore";

export default function ReportPage() {
  const report = useReportStore((s) => s.reportData);

  if (!report) {
    return (
      <main className="p-6 md:p-8">
        <Card>
          <p className="text-gray-500">Henüz rapor yok. Testleri tamamlayıp analizi çalıştır.</p>
          <Link href="/tests/overview" className="mt-4 inline-block text-brand-500">
            Test merkezi →
          </Link>
        </Card>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-navy-800">Raporum</h2>
          <Link href="/dashboard/download">
            <Button variant="secondary">PDF (yakında)</Button>
          </Link>
        </div>
        {report.userContextSnapshot ? (
          <UserContextSummaryCard snapshot={report.userContextSnapshot} />
        ) : null}
        <MatchScoreTransparency className="mb-2" />
        <Card>
          <h3 className="mb-2 font-heading text-xl text-navy-800">{report.personalityTitle}</h3>
          <p className="whitespace-pre-line text-gray-600">{report.profileSummary}</p>
        </Card>
        <Card>
          <h4 className="mb-3 font-semibold text-navy-800">Güçlü yönler</h4>
          <ul className="space-y-3">
            {report.strengths.map((s) => (
              <li key={s.title}>
                <div className="font-medium text-navy-800">{s.title}</div>
                <div className="text-sm text-gray-500">{s.description}</div>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h4 className="mb-3 font-semibold text-navy-800">Gelişim alanları</h4>
          <ul className="space-y-3">
            {report.growthAreas.map((g) => (
              <li key={g.title}>
                <div className="font-medium text-navy-800">{g.title}</div>
                <div className="text-sm text-gray-500">{g.tip}</div>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h4 className="mb-3 font-semibold text-navy-800">Ünlü eşleşmeler</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {report.famousMatches.map((f) => (
              <li key={f.name}>
                <strong className="text-navy-800">{f.name}</strong> — {f.profession} (%{f.matchScore}){" "}
                {f.connection}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h4 className="mb-3 font-semibold text-navy-800">Sana mektup</h4>
          <p className="whitespace-pre-line text-gray-600">{report.personalLetter}</p>
        </Card>
      </div>
    </main>
  );
}
