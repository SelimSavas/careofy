import { ArrowRight, Briefcase, FlaskConical, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HeroCreativeVisual } from "@/components/landing/HeroCreativeVisual";

const stats = [
  { v: "50K+", l: "Kullanıcı", icon: Users },
  { v: "6", l: "Bilimsel test", icon: FlaskConical },
  { v: "800+", l: "Meslek & bölüm", icon: Briefcase },
] as const;

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

        {/* Sağ: canlı dönen pusula görseli */}
        <div className="relative mx-auto w-full lg:mx-0">
          <HeroCreativeVisual />
        </div>
      </div>
    </section>
  );
}
