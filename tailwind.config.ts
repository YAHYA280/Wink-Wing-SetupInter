import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#FF4907",
        secondary: "#003956",
      },
      backgroundImage: {
        hero: "url('/hero-image.jpg')",
        searchCity: "url('/searchcity-bg.jpg')",
        searchLocation: "url('/section-bg.jpg')",
        signup: "url('/signup-bg.jpg')",
        help: "url('/details-help.svg')",
      },
      screens: {
        xs: "380px",
        xxl: "1400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
