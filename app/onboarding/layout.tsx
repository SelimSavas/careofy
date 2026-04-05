import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Başlangıç — Careofy",
  description: "Profilini tamamla ve testlere başla.",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
