"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-white/5 bg-navy-800/85 px-6 shadow-sm shadow-black/10 backdrop-blur-xl md:px-20">
      <Link href="/" className="flex items-center gap-3">
        <Logo />
        <span className="font-heading text-xl font-bold tracking-tight text-white">Careofy</span>
      </Link>

      <div className="hidden items-center gap-10 md:flex">
        <a
          href="/#how-it-works"
          className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
        >
          Nasıl Çalışır
        </a>
        <a
          href="/#tests"
          className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
        >
          Testler
        </a>
        <a
          href="/#pricing"
          className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
        >
          Fiyatlandırma
        </a>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <Link href="/login">
          <Button variant="ghost" className="text-white/90 hover:bg-white/10 hover:text-white">
            Giriş Yap
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="outlineLight" className="border-white/30">
            Kayıt ol
          </Button>
        </Link>
        <Link href="/onboarding/role">
          <Button variant="primary" className="shadow-md shadow-brand-600/20">
            Ücretsiz Başla
          </Button>
        </Link>
      </div>

      <button
        type="button"
        className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        aria-label="Menü"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[72px] border-t border-white/10 bg-navy-800/98 p-6 shadow-elevated backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            <a
              href="/#how-it-works"
              className="rounded-lg py-3 text-white/75 transition hover:bg-white/5 hover:text-white"
            >
              Nasıl Çalışır
            </a>
            <a
              href="/#tests"
              className="rounded-lg py-3 text-white/75 transition hover:bg-white/5 hover:text-white"
            >
              Testler
            </a>
            <a
              href="/#pricing"
              className="rounded-lg py-3 text-white/75 transition hover:bg-white/5 hover:text-white"
            >
              Fiyatlandırma
            </a>
            <Link href="/login" className="mt-2 w-full">
              <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button variant="outlineLight" className="w-full border-white/30">
                Kayıt ol
              </Button>
            </Link>
            <Link href="/onboarding/role" className="w-full">
              <Button variant="primary" className="w-full">
                Ücretsiz Başla
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
