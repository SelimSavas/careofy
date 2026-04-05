"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 font-body text-[15px] text-navy-800 outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<"STUDENT" | "WORKER">("STUDENT");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (password.length < 8) {
      setError("Şifre en az 8 karakter olmalı.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          name: name.trim() || undefined,
          role,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Kayıt başarısız.");
        setLoading(false);
        return;
      }
      const sign = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (sign?.error) {
        setError("Hesap oluşturuldu ancak giriş yapılamadı. Lütfen giriş sayfasından deneyin.");
        setLoading(false);
        return;
      }
      router.push("/onboarding/role");
      router.refresh();
    } catch {
      setError("Bir hata oluştu. Tekrar deneyin.");
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
        <h1 className="mb-2 text-center font-heading text-2xl font-bold text-navy-800">Kayıt ol</h1>
        <p className="mb-6 text-center text-sm text-gray-500">
          Zaten hesabın var mı?{" "}
          <Link href="/login" className="font-medium text-brand-500 hover:underline">
            Giriş yap
          </Link>
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-800">
              Ad (isteğe bağlı)
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Adınız"
            />
          </div>
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
            <span className="mb-1.5 block text-sm font-medium text-navy-800">Profil</span>
            <div className="flex gap-3">
              <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500/5">
                <input
                  type="radio"
                  name="role"
                  checked={role === "STUDENT"}
                  onChange={() => setRole("STUDENT")}
                  className="text-brand-500"
                />
                <span className="text-sm text-navy-800">Öğrenci</span>
              </label>
              <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500/5">
                <input
                  type="radio"
                  name="role"
                  checked={role === "WORKER"}
                  onChange={() => setRole("WORKER")}
                  className="text-brand-500"
                />
                <span className="text-sm text-navy-800">Çalışan</span>
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-800">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              minLength={8}
            />
          </div>
          <div>
            <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-navy-800">
              Şifre tekrar
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
              minLength={8}
            />
          </div>
          {error && (
            <p className="rounded-lg bg-error-bg px-3 py-2 text-center text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Kaydediliyor…" : "Hesap oluştur"}
          </Button>
        </form>
        <Link href="/" className="mt-6 block text-center text-sm text-gray-500 hover:text-brand-500">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}
