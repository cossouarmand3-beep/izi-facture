import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--bg)",
        surface: "var(--surface)",
        'surface-ink': "var(--surface-ink)",
        ink: "var(--ink)",
        foreground: "var(--ink)",
        primary: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-ink)",
        },
        secondary: {
          DEFAULT: "var(--muted)",
          foreground: "var(--surface)",
        },
        destructive: {
          DEFAULT: "var(--danger)",
          foreground: "var(--surface)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--surface)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-ink)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--surface)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--surface)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          foreground: "var(--surface)",
        },
      },
      borderRadius: {
        card: "var(--radius-card)",
        field: "var(--radius-field)",
        pill: "var(--radius-pill)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
