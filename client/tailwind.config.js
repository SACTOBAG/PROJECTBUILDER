/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#FFFAF5',
          100: '#FFF0DE',
          200: '#FDDCB0',
          300: '#F5C17D',
          400: '#D4944C',
          500: '#6F4E37',
          600: '#5A3E2B',
          700: '#462F20',
          800: '#332216',
          900: '#1F150D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
