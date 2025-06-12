/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        'blue': {
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gold: '#FFD700',
        navy: '#0A1128',
        charcoal: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Poppins', 'serif'],
      }
    },
  },
  plugins: [],
} 