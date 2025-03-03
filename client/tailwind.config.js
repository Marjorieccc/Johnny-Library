/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        fjalla: ["Fjalla One", "sans-serif"],
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
      },
      colors: {
        "primary-red": {
          DEFAULT: "#C41E24",
          600: "#B01B20",
          700: "#9A1017",
        },
        gray: {
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        "focus-blue": {
          100: "#DBEAFE",
          500: "#3B82F6",
        },
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(59, 130, 246, 0.5)",
      },
      outlineWidth: {
        3: "3px",
      },
      outlineOffset: {
        2: "2px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  tailwindConfig: "./styles/tailwind.config.js",
};
