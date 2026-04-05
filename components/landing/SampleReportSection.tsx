import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const features = [
  "Detaylı kişilik analizi",
  "Kariyer uyum yüzdeleri",
  "Güçlü ve gelişim alanları",
  "Meslek önerileri (Top 10)",
  "Eğitim yol haritası",
  "Ünlü eşleşmeleri",
];

export function SampleReportSection() {
  return (
    <section className="relative bg-navy-50 px-6 py-section md:px-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-navy-50" />
      <div className="relative mx-auto max-w-figma">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-200/40 via-transparent to-navy-200/50 blur-2xl" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-elevated">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-700 opacity-[0.08]" />

              <div className="relative p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-brand-500 shadow-md shadow-brand-600/30" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-navy-800/15" />
                    <div className="h-3 w-24 rounded bg-navy-800/10" />
                  </div>
                </div>
                <div className="mb-8 space-y-4">
                  <div className="h-6 w-3/4 rounded bg-navy-800/15" />
                  <div className="h-4 w-full rounded bg-navy-800/8" />
                  <div className="h-4 w-5/6 rounded bg-navy-800/8" />
                </div>
                <div className="mb-6 flex aspect-square items-center justify-center rounded-2xl bg-navy-100">
                  <div className="h-32 w-32 rounded-full border-[10px] border-navy-800/15" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-brand-500/20" />
                      <div className="flex-1 space-y-1">
                        <div className="h-3 w-2/3 rounded bg-navy-800/15" />
                        <div className="h-2 w-1/2 rounded bg-navy-800/8" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center bg-white/45 backdrop-blur-md">
                <div className="text-center px-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 shadow-lg shadow-brand-600/35">
                    <Lock className="text-white" size={32} strokeWidth={1.75} />
                  </div>
                  <h4 className="mb-2 text-navy-800">Raporun Seni Bekliyor</h4>
                  <p className="text-sm text-gray-500">Testleri tamamla, kilidini aç</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-500">
              Örnek çıktı
            </p>
            <h2 className="mb-4 text-navy-800">Kapsamlı Kariyer Raporu</h2>
            <p className="mb-10 text-lg leading-relaxed text-gray-500">
              Testleri tamamladıktan sonra, sana özel hazırlanan 25+ sayfalık detaylı raporu al
            </p>
            <div className="mb-10 space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="shrink-0 text-success" size={24} strokeWidth={1.75} />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <Link href="/onboarding/role">
              <Button variant="primary" className="px-10 py-4 text-base shadow-lg shadow-brand-600/20">
                Ücretsiz Başla
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
