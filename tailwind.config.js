/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F2E9E0",
        surface: "#F9F0E6",
        border: "#A7A29E",
        text: "#080503",
        "text-muted": "#848484",
      },
    },
  },
  plugins: [],
};
