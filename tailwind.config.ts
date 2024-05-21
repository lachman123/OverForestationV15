import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        zoomIn: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.4)" },
        },
        panLR: {
          "0%, 100%": { transform: "translateX(0) scale(1.1)" },
          "50%": { transform: "translateX(5%) scale(1.1)" },
        },
        panR: {
          "0%": { transform: "translateX(-10%) scale(1.2)" },
          "100%": { transform: "translateX(10%) scale(1.2)" },
        },
      },
      animation: {
        scale: "scale 20s ease-in-out infinite",
        zoomIn: "zoomIn 10s ease-in-out forwards",
        panLR: "panLR 10s ease-in-out infinite",
        panR: "panR 10s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
