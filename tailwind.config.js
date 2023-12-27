/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/screens/*.tsx',
    './src/components/*.tsx',
    './src/routes/*.tsx',
  ],
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      gray: {
        100: '#E1E1E6',
        200: '#C4C4CC',
        300: '#7C7C8A',
        400: '#323238',
        500: '#29292E',
        600: '#202024',
        700: '#121214',
      },
      green: {
        500: '#00B37E',
        700: '#00875F',
      },
    },
    fontFamily: {
      roboto_regular: 'Roboto_400Regular',
      roboto_bold: 'Roboto_700Bold',
    },
  },

  plugins: [],
}
