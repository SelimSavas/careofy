"use client";

import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { TestDisclaimerBanner } from "@/components/legal/TestDisclaimerBanner";
import { TEST_CENTER_ITEMS } from "@/lib/testConfig";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { TestType } from "@/types/test.types";
import { useTestStore } from "@/store/testStore";

type ServerSessionPayload = Partial<
  Record<
    TestType,
    {
      currentIndex: number;
      answers: Record<string, string | number>;
      completed: boolean;
      startedAt: string;
    }
  >
>;

export function TestOverviewClient() {
  const router = useRouter();
  const sessions = useTestStore((s) => s.sessions);
  const getProgress = useTestStore((s) => s.getProgress);
  const hydrateFromServer = useTestStore((s) => s.hydrateFromServer);
  const allDone = useTestStore((s) => s.allTestsCompleted());
  const [countdown, setCountdown] = useState<number | null>(null);
  const [progressReady, setProgressReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/tests/progress");
      if (!cancelled && res.ok) {
        const data = (await res.json()) as { sessions?: ServerSessionPayload };
        if (data.sessions) hydrateFromServer(data.sessions);
      }
      if (!cancelled) setProgressReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [hydrateFromServer]);

  const completedCount = useMemo(
    () => TEST_CENTER_ITEMS.filter((t) => sessions[t.type]?.completed).length,
    [sessions]
  );

  useEffect(() => {
    if (!allDone) {
      setCountdown(null);
      return;
    }
    let remaining = 3;
    setCountdown(remaining);
    const id = window.setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        router.push("/processing");
      }
    }, 1000);
    return () => clearInterval(id);
  }, [allDone, router]);

  const statusOf = (type: (typeof TEST_CENTER_ITEMS)[0]["type"]) => {
    const s = sessions[type];
    if (s?.completed) return "completed" as const;
    if (s && Object.keys(s.answers).length > 0) return "in-progress" as const;
    return "not-started" as const;
  };

  return (
    <DashboardShell>
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="mx-auto max-w-5xl">
          {!progressReady && (
            <div className="mb-8 flex justify-center py-6">
              <LoadingSpinner label="İlerlemen senkronize ediliyor…" />
            </div>
          )}
          <h2 className="mb-2 text-navy-800">Test Merkezi</h2>
          <p className="mb-4 text-gray-500">
            {completedCount} test tamamlandı — {TEST_CENTER_ITEMS.length - completedCount}{" "}
            test kaldı
          </p>
          <div className="mb-8">
            <TestDisclaimerBanner />
          </div>

          {allDone && countdown !== null && (
            <div className="mb-8 rounded-2xl border border-success/30 bg-success-bg p-4 text-success-dark">
              Tüm testler tamamlandı. Analiz {countdown} saniye içinde başlayacak…
            </div>
          )}

          {completedCount < TEST_CENTER_ITEMS.length && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-warning/20 bg-gradient-to-r from-warning-bg to-brand-100 p-4">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="font-semibold text-warning-dark">
                  Tüm testleri tamamlayınca analizin başlıyor
                </div>
                <div className="text-sm text-warning-dark/80">
                  Kalan {TEST_CENTER_ITEMS.length - completedCount} testi tamamla
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {TEST_CENTER_ITEMS.map((test) => {
              const st = statusOf(test.type);
              const progress = getProgress(test.type);
              const border =
                st === "completed"
                  ? "border-l-success"
                  : st === "in-progress"
                    ? "border-l-warning"
                    : "border-l-gray-200";
              const bg = st === "completed" ? "bg-emerald-50" : "bg-white";

              return (
                <Card key={test.slug} className={`flex flex-col border-l-4 ${border} ${bg}`}>
                  <div className="mb-4 flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-100">
                      <test.icon className="text-navy-800" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-navy-800">{test.name}</h3>
                      <div className="flex gap-3 text-sm text-gray-500">
                        <span>{test.duration}</span>
                        <span>•</span>
                        <span>{test.questionsLabel}</span>
                      </div>
                    </div>
                    {st === "completed" && <Check className="text-success" size={24} />}
                  </div>
                  <p className="mb-4 text-sm text-gray-500">{test.description}</p>
                  {progress > 0 && st !== "completed" && (
                    <div className="mb-4">
                      <div className="mb-2 flex justify-between text-xs text-gray-500">
                        <span>İlerleme</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-navy-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between border-t border-gray-200 pt-4">
                    {st === "completed" && (
                      <>
                        <Badge variant="success">✓ Tamamlandı</Badge>
                        <Link href={`/tests/${test.slug}`}>
                          <Button variant="ghost" className="px-4 py-2 text-sm">
                            Gözden geçir
                          </Button>
                        </Link>
                      </>
                    )}
                    {st === "in-progress" && (
                      <>
                        <Badge variant="warning">Devam et</Badge>
                        <Link href={`/tests/${test.slug}`}>
                          <Button variant="primary" className="px-4 py-2 text-sm">
                            Devam et <ChevronRight size={16} />
                          </Button>
                        </Link>
                      </>
                    )}
                    {st === "not-started" && (
                      <>
                        <Badge variant="default">Başla</Badge>
                        <Link href={`/tests/${test.slug}`}>
                          <Button variant="secondary" className="px-4 py-2 text-sm">
                            Başla <ChevronRight size={16} />
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
