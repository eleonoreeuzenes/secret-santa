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
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromBottom: {
          '0%': { transform: 'translateY(20%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        moveDownMail: 'moveDownMail 1.5s ease-out forwards',
        moveDownShop: 'moveDownShop 2s ease-out forwards',
        moveDownGift: 'moveDownGift 1s ease-out forwards',
        slideInFromTop: 'slideInFromTop 1s ease-out',
        slideInFromBottom: 'slideInFromBottom 1s ease-in',
      },
    },
  },
  plugins: [],
}
