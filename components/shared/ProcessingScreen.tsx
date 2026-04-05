"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { buildProfileVector } from "@/lib/scoring";
import { useReportStore } from "@/store/reportStore";
import { useUserStore } from "@/store/userStore";
import { buildClientUserContext } from "@/lib/report/userContext";
import { useTestStore } from "@/store/testStore";

const steps = [
  "Test sonuçların analiz ediliyor...",
  "Kişilik profilin oluşturuluyor...",
  "Sana özel öneriler hazırlanıyor...",
  "Az kaldı...",
];

export function ProcessingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const sessions = useTestStore((s) => s.sessions);
  const setFromAnalysis = useReportStore((s) => s.setFromAnalysis);
  const role = useUserStore((s) => s.role);
  const displayName = useUserStore((s) => s.displayName);
  const background = useUserStore((s) => s.background);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((p) => (p + 1) % steps.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const profileVector = buildProfileVector(sessions);
    const userContext = buildClientUserContext(role, displayName, background);

    (async () => {
      try {
        const res = await axios.post(
          "/api/ai/analyze",
          { profileVector, userContext },
          { signal: controller.signal }
        );
        setFromAnalysis({
          profileVector,
          reportData: res.data.reportData,
          reportId: res.data.reportId,
        });
        router.push("/dashboard");
      } catch (e) {
        if (axios.isAxiosError(e) && e.code === "ERR_CANCELED") return;
        router.push("/dashboard");
      }
    })();

    return () => controller.abort();
  }, [sessions, role, displayName, background, router, setFromAnalysis]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-800 px-6">
      <div className="absolute left-20 top-20 h-64 w-64 rounded-full bg-navy-700 opacity-50 blur-3xl" />
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-navy-700 opacity-30 blur-3xl" />

      <div className="relative z-10 text-center">
        <div className="relative mx-auto mb-12 h-48 w-48">
          <svg className="animate-spin-slow absolute inset-0 h-full w-full">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="var(--orange-500)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="40 20"
              opacity={0.8}
            />
          </svg>
          <svg className="absolute inset-0 h-full w-full">
            <circle cx="96" cy="96" r="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            <circle cx="96" cy="96" r="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="none" />
            <circle cx="96" cy="96" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
            {[0, 60, 120, 180, 240, 300].map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const x = 96 + Math.cos(rad) * 60;
              const y = 96 + Math.sin(rad) * 60;
              return (
                <line
                  key={angle}
                  x1="96"
                  y1="96"
                  x2={x}
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-brand-500">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex h-16 items-center justify-center">
          <p
            className={`text-xl transition-opacity duration-500 ease-out ${
              step === 3 ? "animate-pulse font-semibold text-brand-500" : "text-white"
            }`}
          >
            {steps[step]}
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <div className="h-1 overflow-hidden rounded-full bg-navy-700">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-1000 ease-out"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
