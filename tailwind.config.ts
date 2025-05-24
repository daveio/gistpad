import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        // Catppuccin Mocha color palette
        "ctp-rosewater": "#f5e0dc",
        "ctp-flamingo": "#f2cdcd",
        "ctp-pink": "#f5c2e7",
        "ctp-mauve": "#cba6fc",
        "ctp-red": "#f38ba8",
        "ctp-maroon": "#eba0ac",
        "ctp-peach": "#fab387",
        "ctp-yellow": "#f9e2af",
        "ctp-green": "#a6e3a1",
        "ctp-teal": "#94e2d5",
        "ctp-sky": "#89dceb",
        "ctp-sapphire": "#74c7ec",
        "ctp-blue": "#89b4fa",
        "ctp-lavender": "#b4befe",
        "ctp-text": "#cdd6f4",
        "ctp-subtext1": "#bac2de",
        "ctp-subtext0": "#a6adc8",
        "ctp-overlay2": "#9399b2",
        "ctp-overlay1": "#7f849c",
        "ctp-overlay0": "#6c7086",
        "ctp-surface2": "#585b70",
        "ctp-surface1": "#45475a",
        "ctp-surface0": "#313244",
        "ctp-base": "#1e1e2e",
        "ctp-mantle": "#181825",
        "ctp-crust": "#11111b"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["Source Sans Pro", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: [
          "Victor Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      },
      animation: {
        glow: "glow 2s ease-in-out infinite"
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(203, 166, 252, 0.7), 0 0 10px rgba(203, 166, 252, 0.5)"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(203, 166, 252, 0.9), 0 0 30px rgba(203, 166, 252, 0.7)"
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch",
            color: "#cdd6f4",
            fontFamily: "Source Sans Pro, ui-sans-serif, system-ui, sans-serif",
            a: {
              color: "#89b4fa",
              "&:hover": {
                color: "#74c7ec"
              }
            },
            h1: {
              color: "#cba6fc",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
            },
            h2: {
              color: "#f5c2e7",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
            },
            h3: {
              color: "#89b4fa",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
            },
            h4: {
              color: "#74c7ec",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
            },
            h5: {
              color: "#89dceb",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
            },
            h6: {
              color: "#94e2d5",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
            },
            strong: {
              color: "#f5e0dc"
            },
            code: {
              color: "#f5e0dc",
              fontFamily:
                "Victor Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
              fontFeatureSettings: '"liga" 1, "calt" 1',
              fontVariantLigatures: "common-ligatures contextual"
            },
            pre: {
              fontFamily:
                "Victor Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
              fontFeatureSettings: '"liga" 1, "calt" 1',
              fontVariantLigatures: "common-ligatures contextual"
            },
            figcaption: {
              color: "#bac2de"
            },
            blockquote: {
              color: "#bac2de",
              borderLeftColor: "#89b4fa"
            }
          }
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")]
} satisfies Config
