import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testler — Careofy",
  description: "Kişilik ve kariyer testlerini tamamla.",
};

export default function TestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
