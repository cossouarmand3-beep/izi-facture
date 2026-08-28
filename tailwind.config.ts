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
      spacing: {
        "landing-md": "16px",
        "landing-lg": "24px",
        "landing-base": "4px",
        "landing-sm": "8px",
        "landing-xs": "4px",
        "landing-xl": "32px",
        "landing-container-margin": "24px",
        "landing-xxl": "48px",
        "landing-gutter": "20px"
},
      fontFamily: {
        "landing-headline-lg-mobile": [
                "Plus Jakarta Sans"
        ],
        "landing-body-sm": [
                "Inter"
        ],
        "landing-headline-lg": [
                "Plus Jakarta Sans"
        ],
        "landing-headline-sm": [
                "Plus Jakarta Sans"
        ],
        "landing-display-lg": [
                "Plus Jakarta Sans"
        ],
        "landing-currency-display": [
                "Plus Jakarta Sans"
        ],
        "landing-headline-md": [
                "Plus Jakarta Sans"
        ],
        "landing-body-md": [
                "Inter"
        ],
        "landing-body-lg": [
                "Inter"
        ],
        "landing-label-md": [
                "Inter"
        ]
},
      fontSize: {
        "landing-headline-lg-mobile": [
                "26px",
                {
                        "lineHeight": "1.2",
                        "fontWeight": "700"
                }
        ],
        "landing-body-sm": [
                "14px",
                {
                        "lineHeight": "1.5",
                        "fontWeight": "400"
                }
        ],
        "landing-headline-lg": [
                "32px",
                {
                        "lineHeight": "1.2",
                        "letterSpacing": "-0.01em",
                        "fontWeight": "700"
                }
        ],
        "landing-headline-sm": [
                "18px",
                {
                        "lineHeight": "1.4",
                        "fontWeight": "600"
                }
        ],
        "landing-display-lg": [
                "48px",
                {
                        "lineHeight": "1.1",
                        "letterSpacing": "-0.02em",
                        "fontWeight": "800"
                }
        ],
        "landing-currency-display": [
                "28px",
                {
                        "lineHeight": "1.2",
                        "fontWeight": "700"
                }
        ],
        "landing-headline-md": [
                "24px",
                {
                        "lineHeight": "1.3",
                        "fontWeight": "700"
                }
        ],
        "landing-body-md": [
                "16px",
                {
                        "lineHeight": "1.5",
                        "fontWeight": "400"
                }
        ],
        "landing-body-lg": [
                "18px",
                {
                        "lineHeight": "1.6",
                        "fontWeight": "400"
                }
        ],
        "landing-label-md": [
                "14px",
                {
                        "lineHeight": "1",
                        "letterSpacing": "0.02em",
                        "fontWeight": "600"
                }
        ]
},
      colors: {
        "landing-inverse-surface": "#2e3132",
        "landing-tertiary-fixed-dim": "#c0c1ff",
        "landing-error": "#ba1a1a",
        "landing-surface-container-lowest": "#ffffff",
        "landing-on-surface": "#191c1d",
        "landing-surface-container-highest": "#e1e3e4",
        "landing-primary-container": "#2ecc71",
        "landing-on-secondary-fixed-variant": "#44474b",
        "landing-on-secondary-container": "#626469",
        "landing-surface": "#f8f9fa",
        "landing-on-tertiary-fixed-variant": "#2f2ebe",
        "landing-on-primary-fixed": "#00210c",
        "landing-on-tertiary-fixed": "#07006c",
        "landing-surface-container": "#edeeef",
        "landing-on-background": "#191c1d",
        "landing-secondary-fixed-dim": "#c5c6cc",
        "landing-surface-container-low": "#f3f4f5",
        "landing-surface-tint": "#006d37",
        "landing-secondary-fixed": "#e1e2e8",
        "landing-on-tertiary-container": "#2c2bbc",
        "landing-primary-fixed-dim": "#4ae183",
        "landing-tertiary-fixed": "#e1e0ff",
        "landing-surface-container-high": "#e7e8e9",
        "landing-on-error-container": "#93000a",
        "landing-tertiary-container": "#a9abff",
        "landing-on-tertiary": "#ffffff",
        "landing-surface-dim": "#d9dadb",
        "landing-outline-variant": "#bbcbbb",
        "landing-on-surface-variant": "#3d4a3e",
        "landing-secondary-container": "#e1e2e8",
        "landing-secondary": "#5c5e63",
        "landing-error-container": "#ffdad6",
        "landing-surface-bright": "#f8f9fa",
        "landing-on-secondary": "#ffffff",
        "landing-on-primary-fixed-variant": "#005228",
        "landing-tertiary": "#494bd6",
        "landing-background": "#f8f9fa",
        "landing-primary": "#006d37",
        "landing-inverse-primary": "#4ae183",
        "landing-surface-variant": "#e1e3e4",
        "landing-primary-fixed": "#6bfe9c",
        "landing-on-secondary-fixed": "#191c20",
        "landing-on-primary-container": "#005027",
        "landing-inverse-on-surface": "#f0f1f2",
        "landing-on-error": "#ffffff",
        "landing-outline": "#6c7b6d",
        "landing-on-primary": "#ffffff"
,
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
