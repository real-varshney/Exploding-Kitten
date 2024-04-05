/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing:{
        '3': '0.75rem',
      }
    },
  },
  plugins: [],
}

