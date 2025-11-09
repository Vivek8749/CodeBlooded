/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        'dark-base': '#020402',
        'dark-accent': '#758173',
        'dark-sage': '#A9C5A0',
        // Light mode colors
        'light-base': '#C5EFCB',
        'light-mint': '#C6DEC6',
        'light-text': '#758173',
      },
    },
  },
  plugins: [],
}
