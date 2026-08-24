import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFEFA",
        paper: "#F3F0E8",
        ivory: "#FFFEFA",
        neutral: {
          50: "#F8F6F0",
          100: "#EEEAE0",
          200: "#D8D3C7",
          300: "#C5BFB1",
          400: "#918B7F",
          500: "#686B63",
          600: "#555950",
          700: "#3F433D",
          800: "#30342F",
          900: "#242722",
        },
        blue: {
          50: "#EFF5F3",
          100: "#DCEAE6",
          200: "#BCD6D1",
          300: "#8FBAB6",
          400: "#5B918F",
          500: "#397275",
          600: "#285C61",
          700: "#204B50",
          800: "#193C41",
          900: "#132F33",
        },
        rose: {
          50: "#FBF1EC",
          100: "#F5DED3",
          200: "#EBC0AD",
          300: "#DFA084",
          400: "#D1815F",
          500: "#C46A45",
          600: "#A95436",
          700: "#87422E",
          800: "#6C3729",
          900: "#592F25",
        },
        emerald: {
          50: "#F1F5EF",
          100: "#E7ECE3",
          200: "#CCD8C5",
          300: "#A9BDA0",
          400: "#819C78",
          500: "#637F5B",
          600: "#4E6848",
          700: "#40543C",
          800: "#364533",
          900: "#2E3A2C",
        },
      },
      boxShadow: {
        sm: "0 1px 2px rgb(36 39 34 / 0.05)",
        md: "0 8px 22px -14px rgb(36 39 34 / 0.28)",
        lg: "0 12px 30px -16px rgb(36 39 34 / 0.34)",
      },
    },
  },
  plugins: [],
}

export default config
