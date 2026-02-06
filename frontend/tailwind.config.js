/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dimitri: ['Dimitri', 'sans-serif'],
        dimitriSwank: ['DimitriSwank', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
