/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#e3c29c', // Pale Gold (Text/Accents)
          500: '#d6b38d',
          600: '#c9a47e',
        },
        primary: {
          DEFAULT: '#07363c', // Deep Teal (Brand Color)
          light: '#0a4a52',
          dark: '#042226',
        },
        charcoal: '#1A1A1A',
        ivory: '#F9F9F5',
        dark: {
          900: '#0F0F0F',
          800: '#181818',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
