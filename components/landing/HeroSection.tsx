import { ArrowRight, Briefcase, FlaskConical, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const stats = [
  { v: "50K+", l: "Kullanıcı", icon: Users },
  { v: "6", l: "Bilimsel test", icon: FlaskConical },
  { v: "800+", l: "Meslek & bölüm", icon: Briefcase },
] as const;

/** Altı testi yörüngede gösteren pusula + organik arka plan + bilet önizlemesi */
function HeroCreativeVisual() {
  const orbit = [
    { deg: 0, label: "MBTI" },
    { deg: 60, label: "Holland" },
    { deg: 120, label: "Ennea" },
    { deg: 180, label: "Değer" },
    { deg: 240, label: "VARK" },
    { deg: 300, label: "Güçlü" },
  ] as const;

  return (
    <div
      className="relative mx-auto w-full max-w-[440px] [--orbit:7.25rem] sm:[--orbit:9.25rem] lg:max-w-[480px] lg:[--orbit:10.25rem]"
      aria-hidden
    >
      {/* Organik çizgiler + ışık */}
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

      {/* Dış kesik halkalar */}
      <div className="absolute left-1/2 top-[42%] w-[88%] max-w-[380px] -translate-x-1/2 -translate-y-1/2">
        <div className="aspect-square rounded-full border border-dashed border-white/[0.11]" />
      </div>
      <div className="absolute left-1/2 top-[42%] w-[72%] max-w-[310px] -translate-x-1/2 -translate-y-1/2">
        <div className="aspect-square rounded-full border border-white/[0.07]" />
      </div>

      {/* Yörünge + merkez */}
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

        {orbit.map((node, i) => (
          <div
            key={node.label}
            className="absolute left-1/2 top-[42%] z-10 animate-float"
            style={{
              animationDelay: `${i * 0.45}s`,
              transform: `translate(-50%, -50%) rotate(${node.deg}deg) translateY(calc(-1 * var(--orbit))) rotate(${-node.deg}deg)`,
            }}
          >
            <div className="rounded-full border border-white/20 bg-gradient-to-br from-white/[0.14] to-white/[0.04] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-black/20 backdrop-blur-md sm:px-3 sm:py-2 sm:text-[11px]">
              {node.label}
            </div>
          </div>
        ))}

        {/* Merkez çekirdek */}
        <div className="absolute left-1/2 top-[42%] z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-hero-pulse-glow absolute inset-[-18px] rounded-full bg-brand-400/25 blur-xl" />
          <div className="relative flex h-[7.25rem] w-[7.25rem] flex-col items-center justify-center rounded-full border border-white/20 bg-gradient-to-b from-navy-700/90 to-navy-900/95 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md sm:h-[8.25rem] sm:w-[8.25rem]">
            <div className="mb-1 flex items-center gap-1.5">
              <Badge variant="type" className="border-white/15 bg-white/10 text-white">
                INFJ
              </Badge>
            </div>
            <Sparkles className="mb-1 text-brand-400" size={26} strokeWidth={1.5} />
            <span className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Profil özün
            </span>
          </div>
        </div>
      </div>

      {/* Bilet / fiş önizlemesi */}
      <div className="relative z-30 mx-auto mt-2 max-w-[340px] -rotate-1 sm:mt-0 sm:translate-x-4 sm:translate-y-[-12px] lg:translate-x-8">
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/[0.13] to-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-stretch">
            <div className="flex w-[4.5rem] flex-col items-center justify-center border-r border-dashed border-white/20 bg-brand-500/15 py-4">
              <span className="font-heading text-2xl font-bold leading-none text-white">92</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-200">uyum</span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">Örnek eşleşme</p>
              <p className="font-heading text-lg font-bold text-white">Ürün tasarımcısı</p>
              <p className="text-xs leading-snug text-white/55">
                Veri + empati profilin bu yolu öne çıkarıyor.
              </p>
            </div>
          </div>
          <div className="flex border-t border-white/10 bg-black/20 px-4 py-2">
            <div className="flex flex-1 flex-wrap gap-1.5">
              {["Empati", "Sistem", "Yaratıcı"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[11px] text-white/35 lg:text-left">
          Görsel örnek — sonuçlar testlerine göre kişiselleşir.
        </p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[min(880px,100svh)] overflow-hidden bg-hero-mesh px-6 py-20 md:px-12 lg:px-20 lg:py-28">
      {/* Arka plan katmanları */}
      <div className="pointer-events-none absolute inset-0 bg-dot-white opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900/20 via-transparent to-navy-900/50" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-brand-500/18 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-navy-500/25 blur-[100px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-400/10 blur-[80px]" />

      <div className="relative z-10 mx-auto grid max-w-figma items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Sol: metin */}
        <div className="space-y-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-[13px] font-medium tracking-wide text-white/90 shadow-lg shadow-black/10 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 shadow-[0_0_12px_rgba(244,104,26,0.7)]" aria-hidden />
            50.000+ profil analiz edildi
          </div>

          <div className="space-y-6">
            <h1 className="font-heading text-balance text-[2.35rem] font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem]">
              <span className="block text-white/[0.92]">Kendini tanı,</span>
              <span className="mt-2 block bg-gradient-to-r from-[#ffc49a] via-brand-400 to-brand-500 bg-clip-text text-transparent drop-shadow-sm">
                doğru adımı at
              </span>
            </h1>
            <div
              className="h-1 w-14 rounded-full bg-gradient-to-r from-brand-500 to-brand-400/40 sm:w-20"
              aria-hidden
            />
            <p className="max-w-[34rem] text-lg leading-relaxed text-white sm:text-xl sm:leading-relaxed">
              Altı bilimsel test ve yapay zeka analiziyle{" "}
              <span className="font-semibold">kişisel kariyer yol haritanı</span> keşfet. Yaklaşık{" "}
              <span className="font-semibold">30 dakikada</span> potansiyelini{" "}
              <span className="font-semibold">alanında uzman mentörler</span> ile somut önerilere dönüştür.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/onboarding/role?type=student" className="w-full sm:w-auto">
              <Button
                variant="primary"
                icon={<ArrowRight size={20} />}
                className="w-full shadow-lg shadow-brand-600/30 sm:w-auto"
              >
                Öğrenciyim
              </Button>
            </Link>
            <Link href="/onboarding/role?type=worker" className="w-full sm:w-auto">
              <Button variant="heroSecondary" className="w-full sm:w-auto">
                Çalışanım
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.09] bg-white/[0.05] p-4 shadow-inner shadow-black/20 backdrop-blur-md sm:gap-4 sm:p-5 md:max-w-xl">
            {stats.map((s, i) => (
              <div
                key={s.l}
                className={`relative flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left ${i > 0 ? "sm:border-l sm:border-white/10 sm:pl-4 md:pl-6" : ""}`}
              >
                <s.icon className="mb-0.5 text-brand-400/90 sm:hidden" size={18} strokeWidth={1.75} />
                <div className="font-heading text-xl font-bold tabular-nums tracking-tight text-white sm:text-2xl">
                  {s.v}
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-white/45 sm:text-xs sm:normal-case sm:tracking-normal">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sağ: yaratıcı pusula görseli */}
        <div className="relative mx-auto w-full lg:mx-0">
          <HeroCreativeVisual />
        </div>
      </div>
    </section>
  );
}
