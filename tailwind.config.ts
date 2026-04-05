import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F4F6FB",
          100: "#E8EBF7",
          200: "#B8C8F0",
          500: "#4A6CC8",
          600: "#2D4A9B",
          700: "#1A2F6E",
          800: "#0D1B4B",
          900: "#0A0F1E",
        },
        brand: {
          50: "#FFF8F4",
          100: "#FEF0E7",
          200: "#FDDCCA",
          400: "#FF8C42",
          500: "#F4681A",
          600: "#E55A10",
          700: "#C2440C",
        },
        gray: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          700: "#2D3748",
          800: "#1E293B",
          900: "#0A0F1E",
        },
        success: {
          DEFAULT: "#10B981",
          bg: "#D1FAE5",
          dark: "#065F46",
        },
        warning: {
          DEFAULT: "#F59E0B",
          bg: "#FEF3C7",
          dark: "#92400E",
        },
        error: {
          DEFAULT: "#EF4444",
          bg: "#FEF2F2",
        },
        info: {
          DEFAULT: "#3B82F6",
          bg: "#EFF6FF",
          dark: "#1E40AF",
        },
      },
      fontFamily: {
        heading: ["var(--font-bricolage)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        button: "10px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(13,27,75,0.06), 0 1px 2px rgba(13,27,75,0.04)",
        "card-hover":
          "0 4px 16px rgba(13,27,75,0.10), 0 2px 4px rgba(13,27,75,0.06)",
        elevated:
          "0 20px 60px rgba(13,27,75,0.18), 0 8px 20px rgba(13,27,75,0.10)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 25px 50px -12px rgba(13,27,75,0.35)",
      },
      maxWidth: {
        figma: "90rem",
      },
      spacing: {
        section: "5rem",
      },
    },
  },
  plugins: [],
};
export default config;
