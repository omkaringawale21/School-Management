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
        "custom-image": "url('/sign-in-bg.jpg')",
      },
      colors: {
        omkarSky: "#c3ebfa",
        omkarSkyLight: "#edf9fd",
        omkarPurple: "#cfceff",
        omkarPurpleLight: "#f1f0ff",
        omkarYellow: "#fae27c",
        omkarYellowLight: "#fefce8",
      },
    },
  },
  plugins: [],
};
export default config;
