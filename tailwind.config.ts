import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#0a0b0d",
          900: "#111318",
          850: "#161922",
          800: "#1c202b",
          700: "#262b38",
          600: "#343b4c",
          500: "#4a5268",
        },
        accent: {
          teal: "#3dd6c4",
          amber: "#f0a63a",
        },
        status: {
          ontrack: "#3ecf8e",
          atrisk: "#f0b429",
          blocked: "#f25555",
          unknown: "#5b6274",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.04)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(2px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseDot: "pulseDot 2s ease-in-out infinite",
        fadeIn: "fadeIn 0.35s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
