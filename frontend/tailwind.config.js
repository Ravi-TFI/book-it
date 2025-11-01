/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FFC700', 
        'brand-yellow-dark': '#E6B300',
      },
    },
  },
  plugins: [],
}