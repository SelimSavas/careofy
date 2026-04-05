"use client";

import {
  Download,
  FileText,
  Home,
  Settings,
  Target,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { useReportStore } from "@/store/reportStore";
import { useUserStore } from "@/store/userStore";

const links = [
  { href: "/dashboard", label: "Genel Bakış", icon: Home },
  { href: "/dashboard/profile", label: "Profilim", icon: User },
  { href: "/dashboard/report", label: "Raporlarım", icon: FileText },
  { href: "/dashboard/recommendations", label: "Önerilerim", icon: Target },
];

export function AppSidebar() {
  const pathname = usePathname();
  const displayName = useUserStore((s) => s.displayName);
  const role = useUserStore((s) => s.role);
  const report = useReportStore((s) => s.reportData);
  const mbti = useReportStore((s) => s.profileVector?.mbti?.type);
  const ennea = useReportStore((s) => s.profileVector?.enneagram?.code);

  const badge =
    mbti && ennea ? `${mbti} | ${ennea}` : mbti ?? ennea ?? "Profil hazırlanıyor";

  return (
    <aside className="hidden w-[260px] shrink-0 flex-col bg-navy-800 p-6 text-white md:flex">
      <Link href="/" className="mb-6 flex items-center gap-2">
        <Logo size={36} />
        <span className="font-heading font-bold">Careofy</span>
      </Link>
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy-100 text-2xl">
          {role === "STUDENT" ? "🎓" : "👤"}
        </div>
        <div className="mb-2 font-semibold">
          Merhaba{displayName ? `, ${displayName}` : ""} 👋
        </div>
        <Badge variant="match" className="bg-brand-500 text-xs text-white">
          {badge}
        </Badge>
        {report && (
          <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-success" />
            Analiz hazır
          </div>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition",
                active
                  ? "border-l-4 border-brand-500 bg-brand-500"
                  : "hover:bg-white/5"
              )}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
        <Link
          href="/dashboard/download"
          className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand-100 px-4 py-3 font-semibold text-brand-500 transition hover:bg-brand-500 hover:text-white"
        >
          <Download size={20} />
          Raporu İndir
        </Link>
      </nav>
      <Link
        href="/dashboard/profile"
        className="mt-4 flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/5"
      >
        <Settings size={20} />
        <span>Ayarlar</span>
      </Link>
    </aside>
  );
}
