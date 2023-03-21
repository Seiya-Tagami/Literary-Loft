/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SpaceMono: ['Space Mono']
      },
      colors: {
        darkblue: {
          main: "#152836",
          sub: "#11232F",
        },
        lightgreen: "#13E5C0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
