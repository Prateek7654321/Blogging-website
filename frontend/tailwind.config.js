/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'blog-gradient': 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      }
    },
  },
  plugins: [],
}