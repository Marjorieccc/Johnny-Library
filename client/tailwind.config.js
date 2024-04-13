/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fjalla: ["Fjalla One", "sans-serif"],
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
