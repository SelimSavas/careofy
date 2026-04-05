import type { UserContextSnapshot } from "@/types/report.types";
import { userContextDetailRows } from "@/lib/report/userContext";

export function UserContextSummaryCard({
  snapshot,
  className = "",
}: {
  snapshot: UserContextSnapshot;
  className?: string;
}) {
  const rows = userContextDetailRows(snapshot);
  return (
    <div
      className={`rounded-2xl border border-brand-500/25 bg-gradient-to-br from-brand-50/90 to-white p-5 ${className}`}
    >
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-600">
        Profil bağlamın (onboarding)
      </div>
      <p className="mb-4 text-sm text-gray-600">
        Rapor ve katalog eşleşmeleri bu bilgilerle ilişkilendirilir; öneri açıklamalarında kısa etiket olarak
        görünebilir.
      </p>
      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col rounded-lg bg-white/80 px-3 py-2">
            <dt className="text-xs text-gray-500">{r.label}</dt>
            <dd className="font-medium text-navy-800">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
