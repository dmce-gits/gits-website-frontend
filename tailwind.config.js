/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "bg-backimage": "url('./background.png')",
      },
    },
  },
  plugins: [],
};
