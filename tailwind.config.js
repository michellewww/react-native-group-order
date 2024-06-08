/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#FFBD33",
        primaryDark: "#1D1D1D",
        danger: "#C30E0E",
      },
    },
  },
  plugins: [],
};
