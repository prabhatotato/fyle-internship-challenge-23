/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {  
    extend: {
      colors: {
        'custom-dark': '#000000',
        'custom-light': '#434343',
      },
    },
    plugins: [],
  }

}
