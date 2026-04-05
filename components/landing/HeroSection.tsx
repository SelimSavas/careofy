import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-hero-mesh px-6 py-16 md:px-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-dot-white opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-navy-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-figma items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="space-y-8">
          <Badge
            variant="match"
            className="border border-brand-500/35 bg-brand-500/15 px-4 py-1.5 text-[13px] font-semibold tracking-wide text-brand-400 backdrop-blur-sm"
          >
            ✦ 50.000+ Profil Analiz Edildi
          </Badge>

          <h1 className="text-balance text-white leading-[1.12] tracking-[-0.045em] md:text-[3.5rem]">
            Seni Tanıyan
            <br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
              Tek Mentör
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/75 md:text-[1.125rem]">
            6 bilimsel test ve yapay zeka analizi ile kişisel kariyer yol haritanı keşfet.
            Sadece 30 dakikada gerçek potansiyelini ortaya çıkar.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/onboarding/role?type=student" className="w-full sm:w-auto">
              <Button
                variant="primary"
                icon={<ArrowRight size={20} />}
                className="w-full shadow-lg shadow-brand-600/25 sm:w-auto"
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

          <div className="flex flex-wrap gap-10 border-t border-white/10 pt-10 md:gap-14">
            {[
              { v: "50K+", l: "Kullanıcı" },
              { v: "6", l: "Test" },
              { v: "800+", l: "Meslek" },
            ].map((s, i) => (
              <div key={s.l} className="relative text-white">
                {i > 0 && (
                  <span className="absolute -left-5 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-white/15 md:block md:-left-7" />
                )}
                <div className="font-heading text-3xl font-bold tracking-tight">{s.v}</div>
                <div className="text-sm text-white/55">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden h-[520px] md:block">
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-navy-600/40 via-navy-800/20 to-navy-900/40 blur-3xl" />

          <Card
            floating
            className="animate-float absolute right-6 top-6 z-10 max-w-[220px] p-5"
          >
            <div className="flex items-center gap-3">
              <Badge variant="type">INFJ</Badge>
              <span className="text-sm text-gray-500">Savunucu</span>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-100">
                <Sparkles className="text-navy-800" size={32} strokeWidth={1.75} />
              </div>
            </div>
          </Card>

          <Card
            floating
            className="animate-float-delayed absolute left-4 top-[7.5rem] z-20 max-w-[280px] p-5"
          >
            <Badge variant="match" className="mb-2">
              92% Uyum
            </Badge>
            <h4 className="mb-1 text-navy-800">UX Tasarımcısı</h4>
            <p className="text-sm leading-relaxed text-gray-500">
              Yaratıcı problem çözme becerilerin bu role mükemmel uyum sağlıyor
            </p>
          </Card>

          <Card
            variant="accent"
            floating
            className="animate-float absolute bottom-12 right-10 z-30 max-w-[240px] border border-white/10 p-5"
          >
            <div className="mb-2 text-sm font-medium text-white/90">Güçlü Yönler</div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-white/75">
              <span>Empati</span>
              <span className="text-white/40">•</span>
              <span>Strateji</span>
              <span className="text-white/40">•</span>
              <span>Yaratıcılık</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
