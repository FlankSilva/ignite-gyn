/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/screens/*.tsx', './src/components/*.tsx', './src/routes/*.tsx'],
  theme: {
    extend: {},
    colors: {
      'background': {
        'page': '#202024'
      }
    }
  },
  
  plugins: [],
}

