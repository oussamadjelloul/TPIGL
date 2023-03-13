/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: "900px",
      sm: "750px",
      lg: "1100px",
      xl: "1600px",
    },
    extend: {},
  },
  plugins: [],
};
