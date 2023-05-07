/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minHeight: {
      1: "10rem",
      2: "15rem",
      3: "16rem",
      4: "25rem",
    },
    extend: {},
  },
  plugins: [],
};
