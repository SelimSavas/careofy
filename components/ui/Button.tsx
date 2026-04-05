import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outlineLight" | "heroSecondary";
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "leading" | "trailing";
}

export function Button({
  variant = "primary",
  children,
  icon,
  iconPosition = "trailing",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body text-[15px] font-semibold transition-all duration-200 ease-out";

  const variants = {
    primary:
      "rounded-button bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:scale-100",
    secondary:
      "rounded-button border-2 border-navy-800 bg-transparent text-navy-800 hover:bg-navy-100",
    /** Koyu zemin üzerinde (Figma hero ikincil CTA) */
    heroSecondary:
      "rounded-button border-2 border-white bg-transparent text-white hover:bg-white/10 hover:scale-[1.01] active:scale-[0.99]",
    outlineLight:
      "rounded-button border border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white/60 hover:bg-white/10",
    ghost:
      "rounded-button bg-transparent text-gray-500 hover:bg-navy-50 hover:text-navy-800",
    danger:
      "rounded-button bg-error text-white hover:bg-red-600",
  };

  return (
    <button
      type="button"
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "leading" && icon}
      {children}
      {icon && iconPosition === "trailing" && icon}
    </button>
  );
}
