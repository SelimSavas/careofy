"use client";

import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { MATCH_SCORE_WEIGHTS_DISPLAY } from "@/lib/careerMatch/matchProfile";
import { cn } from "@/lib/utils";

export function MatchScoreTransparency({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-navy-800 transition hover:bg-gray-50"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <HelpCircle className="shrink-0 text-brand-500" size={18} />
          Bu % nasıl hesaplanıyor?
        </span>
        <ChevronDown
          size={18}
          className={cn("shrink-0 text-gray-400 transition", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="space-y-3 border-t border-gray-100 px-4 py-4 text-sm text-gray-600">
          <p>
            Meslek ve bölüm uyum yüzdeleri, testlerinden çıkan <strong>profil vektörün</strong> ile katalogdaki her
            öğenin ağırlıkları karşılaştırılarak hesaplanır. Her boyut 0–100 arası bir uyum skoru üretir; bunlar
            aşağıdaki oranlarla çarpılıp toplanır ve sonuç <strong>%35–%99</strong> aralığına getirilir (daha anlamlı
            bir dağılım için).
          </p>
          <ul className="space-y-1.5 rounded-xl bg-navy-50/80 p-3">
            {MATCH_SCORE_WEIGHTS_DISPLAY.map((w) => (
              <li key={w.id} className="flex justify-between gap-4">
                <span>{w.title}</span>
                <span className="shrink-0 font-semibold text-brand-600">%{w.percent}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">
            Holland kodu için vektörler arasında kosinüs benzerliği; MBTI için eksen uyumu; değerler, VARK ve güçlü
            yönler için ağırlıklı vektör örtüşmesi; Enneagram için tipe özgü uyum katsayısı kullanılır. Bu bir resmi
            sınav veya kurum puanı değildir.
          </p>
        </div>
      )}
    </div>
  );
}
