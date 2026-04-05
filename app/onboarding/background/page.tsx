"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Logo } from "@/components/ui/Logo";
import { useUserStore } from "@/store/userStore";

const schema = z.object({
  displayName: z.string().min(1, "İsim gerekli"),
  city: z.string().optional(),
  age: z.string().optional(),
  gradeLevel: z.string().optional(),
  examField: z.string().optional(),
  jobTitle: z.string().optional(),
  industry: z.string().optional(),
  yearsExp: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function OnboardingBackgroundPage() {
  const router = useRouter();
  const { status } = useSession();
  const role = useUserStore((s) => s.role);
  const setBackground = useUserStore((s) => s.setBackground);
  const setDisplayName = useUserStore((s) => s.setDisplayName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { displayName: "" },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=" + encodeURIComponent("/onboarding/background"));
    }
  }, [status, router]);

  useEffect(() => {
    if (!role) router.replace("/onboarding/role");
  }, [role, router]);

  const onSubmit = (data: FormValues) => {
    setDisplayName(data.displayName);
    const ageNum = data.age?.trim() ? parseInt(data.age, 10) : undefined;
    const yearsNum = data.yearsExp?.trim() ? parseInt(data.yearsExp, 10) : undefined;
    setBackground({
      city: data.city,
      age: Number.isFinite(ageNum) ? ageNum : undefined,
      gradeLevel: data.gradeLevel,
      examField: data.examField,
      jobTitle: data.jobTitle,
      industry: data.industry,
      yearsExp: Number.isFinite(yearsNum) ? yearsNum : undefined,
      interests: [],
    });
    router.push("/tests/overview");
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

  if (!role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
        Yönlendiriliyor…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-10 flex items-center justify-center gap-3">
          <Logo />
          <span className="font-heading text-xl font-bold text-navy-800">Careofy</span>
        </div>
        <div className="mb-8 flex justify-center gap-2">
          <div className="h-2 w-10 rounded-full bg-brand-500" />
          <div className="h-2 w-10 rounded-full bg-brand-500" />
        </div>
        <h2 className="mb-2 text-center text-navy-800">Kendini tanıtalım</h2>
        <p className="mb-8 text-center text-gray-500">
          Bu bilgiler analizini kişiselleştirmek için kullanılır.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-card">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Adın</label>
            <input
              {...register("displayName")}
              className="w-full rounded-button border border-gray-300 px-4 py-3 font-body outline-none ring-navy-800 focus:ring-2"
              placeholder="ör. Elif"
            />
            {errors.displayName && (
              <p className="mt-1 text-sm text-error">{errors.displayName.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Şehir</label>
            <input
              {...register("city")}
              className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
              placeholder="İstanbul"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Yaş</label>
            <input
              {...register("age")}
              className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
              inputMode="numeric"
            />
          </div>
          {role === "STUDENT" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Sınıf / düzey</label>
                <input
                  {...register("gradeLevel")}
                  className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
                  placeholder="12. sınıf, 2. sınıf üniversite…"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Alan</label>
                <input
                  {...register("examField")}
                  className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
                  placeholder="Sayısal, sözel…"
                />
              </div>
            </>
          )}
          {role === "WORKER" && (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">İş unvanı</label>
                <input
                  {...register("jobTitle")}
                  className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Sektör</label>
                <input
                  {...register("industry")}
                  className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Deneyim (yıl)</label>
                <input
                  {...register("yearsExp")}
                  className="w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
                  inputMode="numeric"
                />
              </div>
            </>
          )}
          <div className="flex gap-3 pt-4">
            <Link href="/onboarding/role" className="flex-1">
              <Button variant="secondary" className="w-full">
                Geri
              </Button>
            </Link>
            <Button type="submit" variant="primary" className="flex-1" icon={<ArrowRight size={20} />}>
              Testlere geç
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
