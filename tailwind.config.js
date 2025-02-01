import { colors } from "./lib/colors"

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: colors.primary.DEFAULT,
          foreground: "white",
          ...colors.primary,
        },
        secondary: {
          DEFAULT: colors.secondary.DEFAULT,
          foreground: colors.primary.DEFAULT,
          ...colors.secondary,
        },
        accent: {
          DEFAULT: colors.accent.DEFAULT,
          foreground: "white",
          ...colors.accent,
        },
        muted: {
          DEFAULT: colors.secondary.DEFAULT,
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

