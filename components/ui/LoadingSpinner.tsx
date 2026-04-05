import { cn } from "@/lib/utils";

export function LoadingSpinner({
  className,
  label = "Yükleniyor",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 text-gray-500", className)}
      role="status"
      aria-live="polite"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500"
        aria-hidden
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
