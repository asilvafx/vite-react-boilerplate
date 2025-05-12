import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
	"./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
	extend: {},
  },
  plugins: [
	tailwindcssAnimate,
  ],
};

export default config;
