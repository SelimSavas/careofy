"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Testlerin tamamlanması ne kadar sürer?",
    answer:
      "Tüm testleri tamamlamak ortalama 30-45 dakika sürer. İstediğin zaman ara verip kaldığın yerden devam edebilirsin.",
  },
  {
    question: "Test sonuçları ne kadar güvenilir?",
    answer:
      "MBTI, Enneagram, Holland RIASEC gibi yaygın kabul görmüş çerçeveler kullanıyoruz; yapay zeka analizi bu sonuçları senin bağlamına göre yorumlar.",
  },
  {
    question: "Testleri tekrar yapabilir miyim?",
    answer:
      "Evet. Kişilik zamanla gelişebileceği için yılda bir yenilemeni öneririz.",
  },
  {
    question: "Raporumu nasıl alabilirim?",
    answer:
      "Testler tamamlanınca dashboard üzerinden detaylı raporuna ulaşabilir, PDF indirmeyi (yakında) kullanabilirsin.",
  },
  {
    question: "Ücretsiz deneme var mı?",
    answer:
      "Kayıt ve test merkezine erişim ücretsizdir; gelişmiş özellikler için ücretli planlar eklenebilir.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-gradient-to-b from-white to-navy-50/80 px-6 py-section md:px-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-navy-800">Sık Sorulan Sorular</h2>
        <p className="mb-12 text-center text-lg text-gray-500">
          Aklına takılanları yanıtladık
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-figma-card transition hover:border-navy-800/25 hover:shadow-md"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-navy-50/80"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="pr-4 font-semibold text-navy-800">{faq.question}</span>
                {open === index ? (
                  <Minus className="shrink-0 text-brand-500" size={24} strokeWidth={2} />
                ) : (
                  <Plus className="shrink-0 text-gray-400" size={24} strokeWidth={2} />
                )}
              </button>
              {open === index && (
                <div className="border-t border-gray-100 bg-navy-50/60 px-6 pb-5 pt-4">
                  <p className="leading-relaxed text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
