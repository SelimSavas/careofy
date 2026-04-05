"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Briefcase } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import type { UserRoleType } from "@/types/user.types";
import { useUserStore } from "@/store/userStore";

const roles: {
  id: UserRoleType;
  icon: typeof BookOpen;
  title: string;
  description: string;
}[] = [
  {
    id: "STUDENT",
    icon: BookOpen,
    title: "Öğrenciyim",
    description: "Üniversite & bölüm rehberliği",
  },
  {
    id: "WORKER",
    icon: Briefcase,
    title: "Çalışanım",
    description: "Kariyer haritası & meslek önerileri",
  },
];

export function OnboardingRoleClient() {
  const router = useRouter();
  const search = useSearchParams();
  const { status } = useSession();
  const setRole = useUserStore((s) => s.setRole);
  const [selected, setSelected] = useState<UserRoleType | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=" + encodeURIComponent("/onboarding/role"));
    }
  }, [status, router]);

  useEffect(() => {
    const t = search.get("type");
    if (t === "student") setSelected("STUDENT");
    if (t === "worker") setSelected("WORKER");
  }, [search]);

  const onContinue = () => {
    if (!selected) return;
    setRole(selected);
    router.push("/onboarding/background");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <LoadingSpinner label="Oturum kontrol ediliyor…" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        Giriş sayfasına yönlendiriliyor…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-8 flex items-center justify-center gap-3">
            <Logo />
            <span className="font-heading text-xl font-bold text-navy-800">Careofy</span>
          </div>
          <div className="mb-8 flex justify-center gap-2">
            <div className="h-2 w-10 rounded-full bg-brand-500" />
            <div className="h-2 w-10 rounded-full bg-gray-200" />
          </div>
        </div>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-navy-800">Sen kimsin?</h2>
          <p className="text-lg text-gray-500">Sana en uygun deneyimi hazırlayalım</p>
        </div>
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selected === role.id;
            return (
              <motion.button
                key={role.id}
                type="button"
                layout
                onClick={() => setSelected(role.id)}
                className="text-left"
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Card
                  className={`h-[180px] rounded-[20px] p-6 transition-all duration-200 ${
                    isSelected
                      ? "scale-[1.02] border-2 border-brand-500 bg-brand-50 shadow-lg"
                      : "border-2 border-gray-200 hover:border-navy-800"
                  }`}
                >
                  {isSelected && <div className="mb-4 h-3 w-3 rounded-full bg-brand-500" />}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-100">
                    <Icon className="text-navy-800" size={24} />
                  </div>
                  <h3 className="mb-2 text-navy-800">{role.title}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </Card>
              </motion.button>
            );
          })}
        </div>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button variant="ghost">Geri</Button>
          </Link>
          <Button
            variant="primary"
            icon={<ArrowRight size={20} />}
            disabled={!selected}
            className="px-12"
            onClick={onContinue}
          >
            Devam
          </Button>
        </div>
      </div>
    </div>
  );
}
