/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {  
    extend: {
      colors: {
        darkest: '#161412',
        'medium-dark': '#303036',
        lightest: '#F2EECF',
      },
    },
    plugins: [],
  }

}
