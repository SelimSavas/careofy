import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analiz — Careofy",
  description: "Sonuçların işleniyor.",
};

export default function ProcessingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
