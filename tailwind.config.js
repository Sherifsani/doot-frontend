/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "check-start": "hsl(192, 100%, 67%)",
        "check-end": "hsl(280, 87%, 65%)",
        // Light Theme
        light: {
          "very-gray": "hsl(0, 0%, 98%)",
          "very-blue": "hsl(236, 33%, 92%)",
          "grayish-blue": "hsl(233, 11%, 84%)",
          "dark-grayish": "hsl(236, 9%, 61%)",
          "very-dark-grayish": "hsl(235, 19%, 35%)",
        },
        // Dark Theme
        dark: {
          "very-blue": "hsl(235, 21%, 11%)",
          "desaturated-blue": "hsl(235, 24%, 19%)",
          "grayish-blue": "hsl(234, 39%, 85%)",
          "grayish-blue-hover": "hsl(236, 33%, 92%)",
          "dark-grayish": "hsl(234, 11%, 52%)",
          "very-dark-grayish-1": "hsl(233, 14%, 35%)",
          "very-dark-grayish-2": "hsl(237, 14%, 26%)",
        },
      },
      backgroundImage: {
        "check-gradient":
          "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))",
      },
    },
  },
  plugins: [],
};
