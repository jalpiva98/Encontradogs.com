/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'color-01': '#62d5b4',
        'color-02': '#184a4a',
      },
      boxShadow: {
        'S01': '5px 5px rgba(0, 98, 90, 0.4), 10px 10px rgba(0, 98, 90, 0.3), 15px 15px rgba(0, 98, 90, 0.2), 20px 20px rgba(0, 98, 90, 0.1), 25px 25px rgba(0, 98, 90, 0.05)',
        'S02': '5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)',
      },
    },
  },
  variants: {},
  plugins: [],
}