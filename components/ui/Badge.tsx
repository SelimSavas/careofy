import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "type" | "match" | "success" | "warning" | "default" | "info";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-3 py-1 font-body font-semibold text-xs";

  const variants = {
    type: "bg-navy-800 text-white font-bold px-3.5 py-1.5 text-sm",
    match: "bg-brand-100 text-brand-500",
    success: "bg-success-bg text-success-dark",
    warning: "bg-warning-bg text-warning-dark",
    default: "bg-gray-100 text-gray-500",
    info: "bg-info-bg text-info-dark",
  };

  return (
    <span className={cn(baseStyles, variants[variant], className)}>
      {children}
    </span>
  );
}
