/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "#F9F0E6",
        border: "#ffffff",
        text: "#080503",
        "text-muted": "#848484",

        gray: {
          700: "var(--color-gray-700)",
          500: "var(--color-gray-500)",
          300: "var(--color-gray-300)",
          100: "var(--color-gray-100)",
        },

        primary: {
          700: "var(--color-primary-green-700)",
          300: "var(--color-primary-green-300)",
          100: "var(--color-primary-green-100)",
        },

        // block Text Colors
        secondary: {
          gray: "var(--color-secondary-gray)",
          brown: "var(--color-secondary-brown)",
          orange: "var(--color-secondary-orange)",
          yellow: "var(--color-secondary-yellow)",
          green: "var(--color-secondary-green)",
          blue: "var(--color-secondary-blue)",
          purple: "var(--color-secondary-purple)",
          pink: "var(--color-secondary-pink)",
          red: "var(--color-secondary-red)",
        },

        "bg-secondary": {
          gray: "var(--color-secondary-gray)",
          brown: "var(--color-secondary-brown)",
          orange: "var(--color-secondary-orange)",
          yellow: "var(--color-secondary-yellow)",
          green: "var(--color-secondary-green)",
          blue: "var(--color-secondary-blue)",
          purple: "var(--color-secondary-purple)",
          pink: "var(--color-secondary-pink)",
          red: "var(--color-secondary-red)",
        },
      },
    },
  },
  safelist: [
    // HTML/JSX 안에서 등장한 클래스 이름을 스캔해서 미리 CSS를 생성하는데,
    // Tailwind가 해당 패턴의 모든 클래스를 강제로 포함시켜 줍니다.
    {
      pattern:
        /secondary-(gray|brown|orange|yellow|green|blue|purple|pink|red)/,
    },
    {
      pattern:
        /bg-secondary-(gray|brown|orange|yellow|green|blue|purple|pink|red)/,
    },
  ],
  plugins: [],
};
