import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      backgroundColor: {
        main: "#F4F8FE",
        blue_default: "#59B9FF",
        blue_light: "#F4F8FE",
      },
      colors: {
        searchbar: "#A6B0C7",
        gray: "#A6B0C7",
      },
    },
  },
  plugins: [],
};
export default config;
