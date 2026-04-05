import { ArrowRight, Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function UserTypeSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-navy-800 px-6 py-section md:px-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-dot-white opacity-[0.12]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 max-w-3xl -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative mx-auto max-w-figma">
        <h2 className="mb-4 text-center text-white">Hangi Yolculuğa Başlayalım?</h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-white/60">
          Rolüne göre içerik, öneriler ve yol haritası otomatik şekillenir.
        </p>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <Card className="border-gray-100 p-8 shadow-elevated md:p-10">
            <Badge variant="match">Öğrenci</Badge>
            <div className="my-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-100 shadow-inner">
              <GraduationCap className="text-navy-800" size={40} strokeWidth={1.5} />
            </div>
            <h3 className="mb-4 text-navy-800">Öğrenci Yolculuğu</h3>
            <ul className="mb-10 space-y-4">
              {[
                "Üniversite önerileri",
                "Bölüm eşleştirme",
                "YKS uyumu analizi",
                "Kariyer başlangıcı rehberi",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={20} />
                  <span className="text-gray-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/onboarding/role?type=student" className="block">
              <Button variant="primary" className="w-full shadow-lg shadow-brand-600/20" icon={<ArrowRight size={20} />}>
                Öğrenci Olarak Başla
              </Button>
            </Link>
          </Card>

          <Card className="border-gray-100 p-8 shadow-elevated md:p-10">
            <Badge variant="match">Çalışan</Badge>
            <div className="my-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy-100 shadow-inner">
              <Briefcase className="text-navy-800" size={40} strokeWidth={1.5} />
            </div>
            <h3 className="mb-4 text-navy-800">Çalışan Yolculuğu</h3>
            <ul className="mb-10 space-y-4">
              {[
                "Kariyer yol haritası",
                "Meslek eşleştirme",
                "Yan gelir fikirleri",
                "Şehir önerisi ve analiz",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={20} />
                  <span className="text-gray-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/onboarding/role?type=worker" className="block">
              <Button variant="primary" className="w-full shadow-lg shadow-brand-600/20" icon={<ArrowRight size={20} />}>
                Çalışan Olarak Başla
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
