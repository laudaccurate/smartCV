/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Space Grotesk"],
    },
    extend: {
      animation: {
        "ping-slow": "ping 3s linear infinite",
      },
      backgroundImage: {
        abstract: "url('/images/abstract-background.webp')",
        landing: "url('/images/bg.svg')",
      },
      colors: {
        primary: "#003E92",

        danger: "#FF0000",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};

