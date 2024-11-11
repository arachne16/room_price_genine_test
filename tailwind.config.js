/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        badgeBgColor: '#d8f9f3',
        badgeTextColor: '#1e8f71'
      }
    },
  },
  plugins: [],
};