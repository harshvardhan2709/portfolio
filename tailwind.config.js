/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#fb923c', // orange-400
          500: '#f97316', // orange-500
        },
        secondary: {
          700: '#0f0f0f', // soft black (text / cards)
          800: '#0a0a0a', // deep black (sections)
          900: '#000000', // true black (background)
        },
      },
    },
  },
  plugins: [],
};
