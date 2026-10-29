import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#172033",
        muted: "#6d7890",
        canvas: "#f7f8fc",
        line: "#e8ebf2",
        brand: {
          50: "#edf5ff",
          100: "#d8eaff",
          500: "#3d82f6",
          600: "#2f6ddd",
          700: "#2555b4",
        },
        mint: "#21b996",
        amber: "#f4a83a",
        coral: "#ed6a72",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(27, 38, 65, 0.05)",
        card: "0 2px 12px rgba(27, 38, 65, 0.04)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
    },
  },
  plugins: [],
};

export default config;
