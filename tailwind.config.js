/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f04e4a',
        secondary: '#7c7b8d',
        black: '#222326'
      },
    },
  },
  plugins: [],
}

