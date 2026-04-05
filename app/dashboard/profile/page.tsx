"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";

export default function ProfilePage() {
  const router = useRouter();
  const displayName = useUserStore((s) => s.displayName);
  const role = useUserStore((s) => s.role);
  const background = useUserStore((s) => s.background);
  const setDisplayName = useUserStore((s) => s.setDisplayName);
  const [name, setName] = useState(displayName);

  return (
    <main className="p-6 md:p-8">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-6 text-navy-800">Profilim</h2>
        <Card className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Görünen ad</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-button border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-navy-800"
            />
          </div>
          <div className="text-sm text-gray-500">
            Rol:{" "}
            <span className="font-medium text-navy-800">
              {role === "WORKER" ? "Çalışan" : role === "STUDENT" ? "Öğrenci" : "—"}
            </span>
          </div>
          {background?.city && (
            <div className="text-sm text-gray-500">
              Şehir: <span className="text-navy-800">{background.city}</span>
            </div>
          )}
          <Button
            variant="primary"
            onClick={() => {
              setDisplayName(name);
              router.push("/dashboard");
            }}
          >
            Kaydet
          </Button>
        </Card>
      </div>
    </main>
  );
}
