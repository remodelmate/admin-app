// eslint-disable-next-line
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  options: {
    safelist: [/data-theme$/],
  },
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      indigo: {
        100: '#D85A56',
        200: '#D85A56',
        300: '#D85A56',
        400: '#D85A56',
        500: '#D85A56',
        600: '#D85A56',
        700: '#D85A56',
        800: '#D85A56',
        900: '#D85A56',
      },
    },
    extend: {
      colors: {
        rose: colors.rose,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  important: true,
  daisyui: {
    styled: true,
    themes: [
      'light', // first one will be the default theme
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
