import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        getsa: {
          navy: "#1A2433",      // From the "Get" text
          purple: "#A832A8",    // From the gradient start
          lavender: "#7038D1",  // From the gradient end
          pink: "#E91E63",      // Accent for growth lines
        },
      },
      borderRadius: {
        'getsa': '2rem',       // Your preferred 2rem rounded corners
      },
      backgroundImage: {
        'getsa-gradient': "linear-gradient(to right, #A832A8, #7038D1)",
      },
    },
  },
  plugins: [],
};
export default config;