import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-900 px-6 py-20 text-white md:px-20">
      <div className="pointer-events-none absolute inset-0 bg-dot-white opacity-[0.06]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative mx-auto max-w-figma">
        <div className="mb-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-5 md:gap-12">
          <div className="md:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <Logo />
              <span className="font-heading text-xl font-bold tracking-tight">Careofy</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Yapay zeka ve bilimsel testlerle kariyer yolculuğunda yanında
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/90">Ürün</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#how-it-works" className="text-white/55 transition hover:text-white">
                  Nasıl Çalışır
                </a>
              </li>
              <li>
                <a href="/#tests" className="text-white/55 transition hover:text-white">
                  Testler
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-white/55 transition hover:text-white">
                  Fiyatlandırma
                </a>
              </li>
              <li>
                <Link href="/tests/overview" className="text-white/55 transition hover:text-white">
                  Test Merkezi
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/90">Yasal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/legal#kvkk" className="text-white/55 transition hover:text-white">
                  KVKK
                </Link>
              </li>
              <li>
                <Link href="/legal#cerez" className="text-white/55 transition hover:text-white">
                  Çerez politikası
                </Link>
              </li>
              <li>
                <Link href="/legal#test-uyarisi" className="text-white/55 transition hover:text-white">
                  Test uyarısı
                </Link>
              </li>
              <li>
                <Link href="/legal#gizlilik" className="text-white/55 transition hover:text-white">
                  Gizlilik özeti
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/90">Şirket</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li>
                <span className="cursor-default">Hakkımızda</span>
              </li>
              <li>
                <span className="cursor-default">Blog</span>
              </li>
              <li>
                <span className="cursor-default">İletişim</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/90">Sosyal</h4>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-brand-500/50 hover:bg-brand-500/15">
                X
              </span>
              <span className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-brand-500/50 hover:bg-brand-500/15">
                in
              </span>
              <span className="cursor-default rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-brand-500/50 hover:bg-brand-500/15">
                ig
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-sm text-white/50 md:flex-row">
          <div>© 2026 Careofy. Tüm hakları saklıdır.</div>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/legal#kvkk" className="transition hover:text-white">
              KVKK
            </Link>
            <Link href="/legal#gizlilik" className="transition hover:text-white">
              Gizlilik
            </Link>
            <Link href="/legal#kullanim" className="transition hover:text-white">
              Kullanım şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
