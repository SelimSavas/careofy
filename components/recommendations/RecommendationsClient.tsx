"use client";

import { MapPin, Star, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { MatchScoreTransparency } from "@/components/legal/MatchScoreTransparency";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DEPARTMENT_CATALOG, PROFESSION_CATALOG } from "@/lib/career/catalog";
import { rankDepartments, rankProfessions } from "@/lib/careerMatch/matchProfile";
import { buildClientUserContext, formatReasonPrefix } from "@/lib/report/userContext";
import { cn } from "@/lib/utils";
import { useReportStore } from "@/store/reportStore";
import { useUserStore } from "@/store/userStore";

const SAMPLE_UNIS = [
  { name: "Boğaziçi Üniversitesi", city: "İstanbul", type: "TM / MF / DİL-1" },
  { name: "ODTÜ", city: "Ankara", type: "TM / MF" },
  { name: "İstanbul Üniversitesi", city: "İstanbul", type: "TM / MF / DİL" },
  { name: "Ankara Üniversitesi", city: "Ankara", type: "TM / MF" },
  { name: "Hacettepe Üniversitesi", city: "Ankara", type: "MF / TM" },
  { name: "İTÜ", city: "İstanbul", type: "MF / TM" },
  { name: "Ege Üniversitesi", city: "İzmir", type: "TM / MF" },
  { name: "Koç Üniversitesi", city: "İstanbul", type: "TM / MF / DİL" },
  { name: "Sabancı Üniversitesi", city: "İstanbul", type: "TM / MF" },
  { name: "Gazi Üniversitesi", city: "Ankara", type: "TM / MF" },
  { name: "Marmara Üniversitesi", city: "İstanbul", type: "TM / MF" },
  { name: "Dokuz Eylül Üniversitesi", city: "İzmir", type: "TM / MF" },
];

const roadmap = [
  { time: "Şu An", title: "Temel Hazırlık", actions: ["Bootcamp", "Portfolio", "Araç öğrenimi"] },
  { time: "1 Yıl", title: "İlk Deneyim", actions: ["Junior rol", "Proje çeşitliliği"] },
  { time: "3 Yıl", title: "Uzmanlaşma", actions: ["Mid seviye", "Mentorluk"] },
  { time: "5 Yıl", title: "Liderlik", actions: ["Lead rol", "Strateji"] },
];

function facultyLookup(deptName: string) {
  return DEPARTMENT_CATALOG.find((d) => d.name === deptName)?.faculty ?? "Fakülte (katalog)";
}

export function RecommendationsClient() {
  const role = useUserStore((s) => s.role);
  const displayName = useUserStore((s) => s.displayName);
  const userBackground = useUserStore((s) => s.background);
  const report = useReportStore((s) => s.reportData);
  const profileVector = useReportStore((s) => s.profileVector);
  const [tab, setTab] = useState<"a" | "b">("a");

  const livePrefix = formatReasonPrefix(buildClientUserContext(role, displayName, userBackground));

  const departmentRows = useMemo(() => {
    const fromReport = report?.recommendations?.filter((r) => r.type === "department") ?? [];
    if (fromReport.length > 0) {
      return fromReport.map((r, i) => ({
        rank: i + 1,
        name: r.title,
        faculty: facultyLookup(r.title),
        match: r.matchScore,
        reason: r.reason,
        fields: r.requiredSkills?.length ? r.requiredSkills : [],
      }));
    }
    if (!profileVector) return [];
    return rankDepartments(profileVector, DEPARTMENT_CATALOG, 80).map((d, i) => ({
      rank: i + 1,
      name: d.entry.name,
      faculty: d.entry.faculty,
      match: d.matchPercent,
      reason: `${livePrefix}${d.reason}`,
      fields: d.entry.tracks,
    }));
  }, [report, profileVector, livePrefix]);

  const universityRows = useMemo(() => {
    const base = departmentRows.slice(0, 16);
    return base.map((d, i) => {
      const u = SAMPLE_UNIS[i % SAMPLE_UNIS.length];
      return {
        name: u.name,
        program: d.name,
        type: u.type,
        score: 455 - i * 6,
        city: u.city,
        match: d.match,
      };
    });
  }, [departmentRows]);

  const workerCareers = useMemo(() => {
    const fromReport = report?.recommendations?.filter((r) => r.type !== "department") ?? [];
    if (fromReport.length > 0) return fromReport;
    if (!profileVector) return [];
    return rankProfessions(profileVector, PROFESSION_CATALOG, 80).map((r) => ({
      title: r.entry.title,
      type: "profession" as const,
      matchScore: r.matchPercent,
      futureScore: r.entry.futureOutlook,
      reason: `${livePrefix}${r.reason}`,
      salaryRange: "",
      city: [] as string[],
    }));
  }, [report, profileVector, livePrefix]);

  const isStudent = role !== "WORKER";

  return (
    <main className="p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-sm text-gray-500">
          Öneriler <span className="mx-2">/</span>{" "}
          <span className="text-navy-800">{isStudent ? "Eğitim" : "Kariyer"}</span>
        </div>

        <MatchScoreTransparency className="mb-6" />

        {isStudent ? (
          <>
            <div className="mb-8 flex gap-4 overflow-x-auto border-b border-gray-200">
              <button
                type="button"
                onClick={() => setTab("a")}
                className={cn(
                  "whitespace-nowrap border-b-2 px-6 py-3 font-semibold transition ease-out",
                  tab === "a" ? "border-brand-500 text-brand-500" : "border-transparent text-gray-500"
                )}
              >
                Bölümler
              </button>
              <button
                type="button"
                onClick={() => setTab("b")}
                className={cn(
                  "whitespace-nowrap border-b-2 px-6 py-3 font-semibold transition ease-out",
                  tab === "b" ? "border-brand-500 text-brand-500" : "border-transparent text-gray-500"
                )}
              >
                Üniversiteler
              </button>
            </div>
            {tab === "a" ? (
              <div className="grid gap-6">
                {departmentRows.length === 0 ? (
                  <p className="text-center text-gray-500">
                    Bölüm eşleşmesi için önce testleri tamamlayıp analiz alın.
                  </p>
                ) : (
                  departmentRows.map((p) => (
                    <Card key={`${p.rank}-${p.name}`} hover>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <Badge variant="match" className="mb-2">
                            #{p.rank} · %{p.match} uyum
                          </Badge>
                          <h3 className="text-xl text-navy-800">{p.name}</h3>
                          <p className="text-sm text-gray-500">{p.faculty}</p>
                          <p className="mt-2 text-sm text-gray-600">{p.reason}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {p.fields.map((f) => (
                              <span
                                key={f}
                                className="rounded-full bg-navy-50 px-3 py-1 text-xs text-navy-800"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Star className="text-brand-500" size={28} />
                      </div>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <Card className="overflow-x-auto p-0">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-gray-200 bg-navy-50">
                    <tr>
                      <th className="p-4 font-semibold text-navy-800">Üniversite</th>
                      <th className="p-4">Program</th>
                      <th className="p-4">Tür</th>
                      <th className="p-4">Örnek taban</th>
                      <th className="p-4">Şehir</th>
                      <th className="p-4">Uyum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {universityRows.map((u) => (
                      <tr key={`${u.name}-${u.program}`} className="border-b border-gray-100">
                        <td className="p-4 font-medium text-navy-800">{u.name}</td>
                        <td className="p-4">{u.program}</td>
                        <td className="p-4">{u.type}</td>
                        <td className="p-4">{u.score}</td>
                        <td className="p-4">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {u.city}
                          </span>
                        </td>
                        <td className="p-4 text-brand-500">%{u.match}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-gray-100 p-4 text-xs text-gray-500">
                  Taban puanları örnektir; güncel YÖK atlas verisi ile değiştirin. Uyum yüzdesi profil
                  vektörünüzle katalog ağırlıklarından hesaplanır.
                </p>
              </Card>
            )}
          </>
        ) : (
          <>
            <div className="mb-8 flex gap-4 overflow-x-auto border-b border-gray-200">
              <button
                type="button"
                onClick={() => setTab("a")}
                className={cn(
                  "whitespace-nowrap border-b-2 px-6 py-3 font-semibold transition ease-out",
                  tab === "a" ? "border-brand-500 text-brand-500" : "border-transparent text-gray-500"
                )}
              >
                Yol haritası
              </button>
              <button
                type="button"
                onClick={() => setTab("b")}
                className={cn(
                  "whitespace-nowrap border-b-2 px-6 py-3 font-semibold transition ease-out",
                  tab === "b" ? "border-brand-500 text-brand-500" : "border-transparent text-gray-500"
                )}
              >
                Meslekler
              </button>
            </div>
            {tab === "a" ? (
              <div className="grid gap-8 md:grid-cols-4">
                {roadmap.map((m) => (
                  <Card key={m.time} className="border-t-4 border-brand-500">
                    <div className="mb-2 text-xs font-semibold uppercase text-brand-500">{m.time}</div>
                    <h4 className="mb-3 text-navy-800">{m.title}</h4>
                    <ul className="list-inside list-disc text-sm text-gray-600">
                      {m.actions.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {workerCareers.length === 0 ? (
                  <p className="col-span-2 text-center text-gray-500">
                    Meslek eşleşmesi için önce testleri tamamlayıp analiz alın.
                  </p>
                ) : (
                  workerCareers.map((c) => (
                    <Card key={c.title} hover>
                      <Badge variant="match" className="mb-2">
                        %{c.matchScore} uyum
                      </Badge>
                      <h3 className="text-lg text-navy-800">{c.title}</h3>
                      <p className="text-sm text-gray-600">{c.reason}</p>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp size={14} /> Gelecek: {c.futureScore}/10
                        </span>
                        {c.salaryRange ? <span>{c.salaryRange}</span> : null}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
