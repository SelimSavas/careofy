"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { HERO_LIVE_SAMPLES } from "@/components/landing/heroLiveSamples";

/** Dakikada ~20 örnek → 3 sn. Daha yavaş (5 sn, ~12/dk) için 5000 yap. */
const ROTATE_MS = 3000;

const orbit = [
  { deg: 0, label: "MBTI" },
  { deg: 60, label: "Holland" },
  { deg: 120, label: "Ennea" },
  { deg: 180, label: "Değer" },
  { deg: 240, label: "VARK" },
  { deg: 300, label: "Güçlü" },
] as const;

export function HeroCreativeVisual() {
  const [i, setI] = useState(0);
  const sample = HERO_LIVE_SAMPLES[i % HERO_LIVE_SAMPLES.length];

  useEffect(() => {
    const t = window.setInterval(() => {
      setI((n) => (n + 1) % HERO_LIVE_SAMPLES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px] [--orbit:7.25rem] sm:[--orbit:9.25rem] lg:max-w-[480px] lg:[--orbit:10.25rem]">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-white/20"
        viewBox="0 0 400 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(244, 104, 26)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="rgb(139, 168, 232)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(244, 104, 26)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          d="M40 220 Q120 80 200 200 T360 180"
          stroke="url(#heroLine)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className="opacity-70"
        />
        <path
          d="M60 320 Q200 240 280 100 Q340 40 380 120"
          stroke="url(#heroLine)"
          strokeWidth="0.9"
          strokeLinecap="round"
          className="opacity-50"
        />
        <path
          d="M20 140 C100 200 180 60 320 200 S380 340 200 380"
          stroke="white"
          strokeWidth="0.6"
          strokeLinecap="round"
          className="opacity-[0.12]"
        />
      </svg>

      <div className="absolute left-1/2 top-[42%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.07] blur-3xl" />
      <div className="absolute left-[12%] top-[18%] h-24 w-24 rounded-full bg-white/[0.04] blur-2xl" />
      <div className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full bg-navy-400/20 blur-3xl" />

      <div className="absolute left-1/2 top-[42%] w-[88%] max-w-[380px] -translate-x-1/2 -translate-y-1/2">
        <div className="aspect-square rounded-full border border-dashed border-white/[0.11]" />
      </div>
      <div className="absolute left-1/2 top-[42%] w-[72%] max-w-[310px] -translate-x-1/2 -translate-y-1/2">
        <div className="aspect-square rounded-full border border-white/[0.07]" />
      </div>

      <div className="relative mx-auto flex aspect-square w-[92%] max-w-[400px] items-center justify-center pt-4">
        <div
          className="animate-hero-compass pointer-events-none absolute left-1/2 top-[42%] h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
          style={{
            background:
              "conic-gradient(from 200deg, rgba(244,104,26,0.45), transparent 25%, rgba(74,108,200,0.35), transparent 55%, rgba(244,104,26,0.3), transparent 80%)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 3px))",
          }}
        />

        {orbit.map((node, idx) => (
          <div
            key={node.label}
            className="absolute left-1/2 top-[42%] z-10"
            style={{
              transform: `translate(-50%, -50%) rotate(${node.deg}deg) translateY(calc(-1 * var(--orbit))) rotate(${-node.deg}deg)`,
            }}
          >
            {/* Salınım ayrı katmanda: animate-float transform’u yörünge transform’unu ezmesin */}
            <div className="animate-float" style={{ animationDelay: `${idx * 0.45}s` }}>
              <div className="rounded-full border border-white/20 bg-gradient-to-br from-white/[0.14] to-white/[0.04] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-black/20 backdrop-blur-md sm:px-3 sm:py-2 sm:text-[11px]">
                {node.label}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-hero-pulse-glow absolute inset-[-18px] rounded-full bg-brand-400/25 blur-xl" />
          <div className="relative flex h-[7.25rem] w-[7.25rem] flex-col items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-navy-700/90 to-navy-900/95 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:h-[8.25rem] sm:w-[8.25rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`mbti-${i}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="mb-1 flex flex-col items-center gap-1"
              >
                <Badge variant="type" className="border-white/15 bg-white/10 text-white">
                  {sample.mbti}
                </Badge>
              </motion.div>
            </AnimatePresence>
            <Sparkles className="mb-1 text-brand-400" size={26} strokeWidth={1.5} />
            <span className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Profil özün
            </span>
          </div>
        </div>
      </div>

      <div
        className="relative z-30 mx-auto mt-2 max-w-[340px] -rotate-1 sm:mt-0 sm:translate-x-4 sm:translate-y-[-12px] lg:translate-x-8"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.13] to-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex min-h-[7.5rem] items-stretch sm:min-h-[7.75rem]">
            <div className="flex w-[4.5rem] flex-col items-center justify-center border-r border-dashed border-white/20 bg-brand-500/15 py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`match-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-heading text-2xl font-bold leading-none text-white tabular-nums">
                    {sample.match}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-brand-200">uyum</span>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">
                Canlı örnek eşleşme
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${i}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-1"
                >
                  <p className="font-heading text-lg font-bold leading-tight text-white">{sample.title}</p>
                  <p className="text-xs leading-snug text-white/55">{sample.blurb}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="flex min-h-[2.75rem] border-t border-white/10 bg-black/20 px-4 py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`tags-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-wrap gap-1.5"
              >
                {sample.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-white/35 lg:text-left">
          Her {ROTATE_MS / 1000} saniyede yeni örnek (dakikada ~{Math.round(60_000 / ROTATE_MS)}).{" "}
          {HERO_LIVE_SAMPLES.length} farklı örnek döngüde. Gerçek rapor test sonuçlarına göre kişiselleşir.
        </p>
      </div>
    </div>
  );
}
