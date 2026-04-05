"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "careofy-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 p-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm md:p-5"
      role="dialog"
      aria-label="Çerez bilgilendirmesi"
    >
      <div className="mx-auto flex max-w-figma flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-600">
          Deneyimi iyileştirmek ve tercihlerini hatırlamak için çerezler ve yerel depolama kullanıyoruz. Devam ederek{" "}
          <Link href="/legal#cerez" className="font-semibold text-brand-600 underline underline-offset-2">
            çerez politikamızı
          </Link>{" "}
          kabul etmiş olursun.
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="primary" className="whitespace-nowrap" onClick={accept}>
            Anladım
          </Button>
          <Link href="/legal#kvkk">
            <Button variant="ghost" className="whitespace-nowrap">
              KVKK
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
