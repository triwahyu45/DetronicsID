/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#133B4E',
          'navy-dark': '#0D2734',
          'navy-light': '#1D5570',
          orange: '#F9831F',
          'orange-hover': '#EA6F07',
          'orange-light': '#FFF3E8',
          surface: '#0B0F17',
          card: '#151D2C',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 10px -2px rgba(0, 0, 0, 0.4), 0 1px 3px 0 rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 28px -6px rgba(0, 0, 0, 0.6), 0 4px 10px -2px rgba(0, 0, 0, 0.4)',
        'elevated': '0 20px 40px -12px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
}
