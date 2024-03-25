/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oxfordBlue: "#0E1428",
        xanthous: "#FFC145",
        seaGreen: "#008148",
        auburn: "#A22522",
      },
    },
  },
  plugins: [],
};
