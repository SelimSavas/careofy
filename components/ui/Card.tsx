import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "accent" | "orange" | "glass";
  className?: string;
  hover?: boolean;
  floating?: boolean;
}

export function Card({
  children,
  variant = "default",
  className = "",
  hover = false,
  floating = false,
}: CardProps) {
  const floatCls =
    floating &&
    "shadow-elevated ring-1 ring-navy-800/[0.06] backdrop-blur-sm";

  const baseStyles = "transition-all duration-200 ease-out";

  const variants = {
    default: cn(
      "rounded-[16px] border border-gray-200 bg-white p-6 shadow-figma-card",
      floatCls,
      hover &&
        "cursor-pointer hover:border-navy-800 hover:shadow-card-hover"
    ),
    accent: cn(
      "rounded-[24px] border border-white/10 bg-navy-800 p-6 text-white",
      floatCls || "shadow-xl shadow-black/20"
    ),
    orange:
      "rounded-[16px] border border-brand-200 bg-brand-100 p-6 shadow-figma-card",
    glass:
      "rounded-[20px] border border-white/10 bg-white/[0.07] p-6 text-white shadow-glow backdrop-blur-md",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)}>{children}</div>
  );
}
