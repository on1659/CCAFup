import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        page:     "var(--bg-page)",
        surface:  "var(--bg-surface)",
        raised:   "var(--bg-raised)",
        muted:    "var(--bg-muted)",
        primary:  { DEFAULT: "var(--primary)", hover: "var(--primary-hover)", soft: "var(--primary-soft)", text: "var(--primary-text)" },
        accent:   { DEFAULT: "var(--accent)", hover: "var(--accent-hover)", soft: "var(--accent-soft)", text: "var(--accent-text)" },
        success:  { DEFAULT: "var(--success)", soft: "var(--success-soft)", text: "var(--success-text)" },
        danger:   { DEFAULT: "var(--danger)", soft: "var(--danger-soft)", text: "var(--danger-text)" },
        warning:  { DEFAULT: "var(--warning)", soft: "var(--warning-soft)", text: "var(--warning-text)" },
        streak:   { DEFAULT: "var(--streak)", text: "var(--streak-text)" },
        heading:  "var(--text-heading)",
        body:     "var(--text-body)",
        sub:      "var(--text-sub)",
        hint:     "var(--text-hint)",
        border:   { DEFAULT: "var(--border)", hover: "var(--border-hover)" },
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        h1:      ["24px", { lineHeight: "1.3", fontWeight: "500" }],
        h2:      ["18px", { lineHeight: "1.4", fontWeight: "500" }],
        h3:      ["16px", { lineHeight: "1.5", fontWeight: "500" }],
        body:    ["15px", { lineHeight: "1.7", fontWeight: "400" }],
        small:   ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      borderRadius: { sm: "4px", md: "8px", lg: "12px", xl: "14px" },
      zIndex: { toc: "10", sidebar: "20", header: "30", dropdown: "40", overlay: "50", modal: "55", toast: "60", fullscreen: "70" },
    },
  },
  plugins: [typography],
};
export default config;
