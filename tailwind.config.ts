import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#FAFAF8",
        "bg-surface": "#FFFFFF",
        "bg-elevated": "#F4F5F7",
        "text-primary": "#0B1426",
        "text-secondary": "#475569",
        "text-tertiary": "#94A3B8",
        "text-on-accent": "#FFFFFF",
        "accent-500": "#0066FF",
        "accent-600": "#0052D4",
        "accent-400": "#3385FF",
        "accent-100": "#E6F0FF",
        "accent-50": "#F2F7FF",
        "graph-node-central": "#0B1426",
        "graph-node-pillar": "#0066FF",
        "graph-node-theme": "#185FA5",
        "graph-node-output": "#378ADD",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-spectral)", "Georgia", "serif"],
      },
      fontSize: {
        display: ["5rem", { lineHeight: "1.05", fontWeight: "500" }],
        "display-md": ["3.5rem", { lineHeight: "1.1", fontWeight: "500" }],
        "display-sm": ["2.5rem", { lineHeight: "1.15", fontWeight: "500" }],
        h2: ["2.25rem", { lineHeight: "1.2", fontWeight: "500" }],
        "h2-mobile": ["1.75rem", { lineHeight: "1.25", fontWeight: "500" }],
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.65", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.08em" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(11,20,38,0.04), 0 0 0 1px rgba(11,20,38,0.04)",
        card: "0 4px 12px rgba(11,20,38,0.04), 0 0 0 1px rgba(11,20,38,0.06)",
        hover: "0 12px 32px rgba(11,20,38,0.08), 0 0 0 1px rgba(11,20,38,0.08)",
        glow: "0 0 0 4px rgba(0,102,255,0.12)",
      },
      transitionDuration: {
        instant: "100ms",
        fast: "200ms",
        normal: "350ms",
        slow: "600ms",
        entrance: "1500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
