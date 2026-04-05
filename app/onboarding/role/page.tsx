import { Suspense } from "react";
import { OnboardingRoleClient } from "./role-client";

export default function OnboardingRolePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
          Yükleniyor…
        </div>
      }
    >
      <OnboardingRoleClient />
    </Suspense>
  );
}
