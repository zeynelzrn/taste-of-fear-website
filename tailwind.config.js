/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'dark-bg': '#0a0a0a',
        'panel-gray': '#121212',
      },
      fontFamily: {
        'horror': ['"Creepster"', 'cursive'],
        'tech': ['"Roboto Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}