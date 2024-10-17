/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveDownMail: {
          '0%': { transform: 'translateY(-4.5rem) translateX(-5rem)'},
          '100%': { transform: 'translateY(-3rem) translateX(-5rem)' },
        },
        moveDownShop: {
          '0%': { transform: 'translateY(-2.5rem) translateX(-12rem)'},
          '100%': { transform: 'translateY(-0rem) translateX(-12rem)' },
        },
        moveDownGift: {
          '0%': { transform: 'translateY(-3rem) translateX(10rem)'},
          '100%': { transform: 'translateY(-0rem) translateX(10rem)'},
        },
      },
      animation: {
        moveDownMail: 'moveDownMail 1.5s ease-out forwards',
        moveDownShop: 'moveDownShop 2s ease-out forwards',
        moveDownGift: 'moveDownGift 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
