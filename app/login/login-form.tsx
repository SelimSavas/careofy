"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-body text-[15px] text-navy-800 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

function safeCallbackPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/tests/overview";
  return raw;
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = safeCallbackPath(searchParams.get("callbackUrl"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!res || res.error || res.ok === false) {
        setError(
          res?.error === "CredentialsSignin"
            ? "E-posta veya şifre hatalı."
            : "Giriş yapılamadı. Bağlantını veya sunucuyu kontrol edip tekrar deneyin."
        );
        return;
      }

      // Tam sayfa geçiş: JWT oturum çerezi bazen client router ile hemen görünmez; middleware güvenilir çalışır.
      window.location.assign(callbackUrl);
    } catch {
      setError("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="mb-8 flex items-center gap-3">
        <Logo />
        <span className="font-heading text-xl font-bold text-navy-800">Careofy</span>
      </div>
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-card">
        <h1 className="mb-2 text-center font-heading text-2xl font-bold text-navy-800">Giriş</h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Hesabın yok mu?{" "}
          <Link href="/signup" className="font-medium text-brand-500 hover:underline">
            Kayıt ol
          </Link>
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-800">
              E-posta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="ornek@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-800">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {error && (
            <p className="rounded-lg bg-error-bg px-3 py-2 text-center text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Giriş yapılıyor…" : "Giriş yap"}
          </Button>
        </form>
        <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-brand-500">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
