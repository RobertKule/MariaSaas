/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
    content: [
      "./src/renderer/index.html",
      "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          light: '#10b981', // emerald-500
          dark: '#0ea5e9', 
        },
      },
    },
    plugins: [],
  }