/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    boxShadow: {
      card: "4px 4px 24px 4px rgba(41,45,49,0.1)",
    },
    colors: {
      green: "#178c3b",
      lime: "#8dc641",
      lemon: "#f6ef42",
      yellow: "#fbbd1e",
      orange: "#ec7423",
      bg: "#fff7f1",
      purple: "#3e1c6c",
      black: "#000000",
      grey: "#9ca3af",
      white: "#ffffff",
      red: "#dc3b2b",
    },
    fontFamily: {
      body: ["Quicksand", "sans-serif"],
      heading: ["Braah One", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
