import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sl: {
          yellow: "#FFBE29",
          maroon: "#8D153A",
          orange: "#EB7400",
          green: "#00534E",
        },
        primary: "#002147",
        secondary: "#3b82f6",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        purgatory: ["Purgatory", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
