/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#FFC700', // Using a placeholder, adjust from Figma
        'brand-yellow-dark': '#E6B300',
      },
    },
  },
  plugins: [],
}