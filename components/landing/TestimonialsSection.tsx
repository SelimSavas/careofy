import { Star } from "lucide-react";
import { Card } from "@/components/ui/Card";

const testimonials = [
  {
    name: "Zeynep Kaya",
    role: "Öğrenci, 20",
    comment:
      "Testleri tamamladıktan sonra kendimi çok daha iyi tanıdım. Bölüm seçiminde netleştim.",
    avatar: "👩‍🎓",
  },
  {
    name: "Ahmet Yılmaz",
    role: "Yazılım Geliştirici, 28",
    comment:
      "Kariyer geçişi için net bir yol haritam oldu. Careofy önerileri çok isabetliydi.",
    avatar: "👨‍💻",
  },
  {
    name: "Ayşe Demir",
    role: "Mezun, 23",
    comment:
      "Sonuçlar gerçekten beni yansıtıyordu. Hangi sektörlere odaklanacağımı biliyorum.",
    avatar: "👩‍💼",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative border-t border-gray-100 bg-white px-6 py-section md:px-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      <div className="mx-auto max-w-figma">
        <h2 className="mb-4 text-center text-navy-800">Kullanıcılarımız Ne Diyor?</h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-gray-500">
          Binlerce kişi Careofy ile kendi yolunu buldu
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              hover
              className="flex flex-col border-gray-100/90 p-8 shadow-md transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50 text-2xl shadow-inner">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-navy-800">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="fill-warning text-warning" size={18} />
                ))}
              </div>
              <p className="flex-1 leading-relaxed text-gray-600">&ldquo;{t.comment}&rdquo;</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
