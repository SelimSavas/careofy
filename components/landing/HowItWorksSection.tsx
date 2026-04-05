import { ArrowRight, Compass, Edit3, Fingerprint } from "lucide-react";
import { Card } from "@/components/ui/Card";

const steps = [
  {
    number: "01",
    title: "Testleri Tamamla",
    description:
      "6 bilimsel test ile kişiliğini, değerlerini ve yeteneklerini keşfet",
    icon: Edit3,
  },
  {
    number: "02",
    title: "Profilini Oluştur",
    description:
      "Yapay zeka, test sonuçlarını analiz ederek benzersiz profilini oluşturur",
    icon: Fingerprint,
  },
  {
    number: "03",
    title: "Yolunu Keşfet",
    description: "Sana özel kariyer yol haritası ve meslek önerilerini gör",
    icon: Compass,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-navy-50 px-6 py-section md:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-subtle opacity-50" />
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-brand-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-navy-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-figma">
        <h2 className="mb-4 text-center text-navy-800">Üç Adımda Yolunu Bul</h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-gray-500">
          Bilimsel ölçekler + yapay zeka yorumu ile net bir yön haritası.
        </p>
        <div className="relative grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <Card
                  hover
                  className="relative h-full overflow-hidden border-gray-200/90 pt-2 shadow-md transition hover:shadow-card-hover"
                >
                  <div className="absolute left-0 top-0 font-heading text-[120px] font-bold leading-none text-navy-800/[0.06]">
                    {step.number}
                  </div>
                  <div className="relative z-10 pt-4">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 shadow-lg shadow-brand-600/25">
                      <Icon className="text-white" size={32} strokeWidth={1.75} />
                    </div>
                    <h3 className="mb-3 text-navy-800">{step.title}</h3>
                    <p className="leading-relaxed text-gray-500">{step.description}</p>
                  </div>
                </Card>
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 z-20 hidden -translate-y-1/2 md:block md:-right-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-card">
                      <ArrowRight className="text-brand-500" size={22} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
