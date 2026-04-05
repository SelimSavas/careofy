import Link from "next/link";

export function TestDisclaimerBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-amber-200/80 bg-amber-50/90 text-amber-950 ${
        compact ? "px-3 py-2 text-xs" : "p-4 text-sm"
      }`}
      role="note"
    >
      <p className="leading-relaxed">
        <strong>Uyarı:</strong> Careofy testleri ve raporları{" "}
        <strong>tıbbi teşhis, psikiyatrik veya psikolojik tanı</strong> amacı taşımaz; profesyonel sağlık hizmetinin
        yerine geçmez. Sonuçlar yalnızca kariyer ve kişisel gelişim keşfi içindir.{" "}
        {!compact && (
          <>
            Ayrıntılar için{" "}
            <Link href="/legal#test-uyarisi" className="font-semibold underline underline-offset-2">
              test uyarısı metni
            </Link>
            .
          </>
        )}
      </p>
    </div>
  );
}
