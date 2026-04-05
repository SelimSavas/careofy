import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş — Careofy",
  description: "Careofy hesabınla giriş yap.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
