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
        border: "#ffffff",
        text: "#080503",
        "text-muted": "#848484",

        // block Text Colors
        "block-gray": "#7E7A72",
        "block-brown": "#835739",
        "block-orange": "#E07C18",
        "block-yellow": "#E0B711",
        "block-green": "#3C965B",
        "block-blue": "#139A9C",
        "block-purple": "#5A56A4",
        "block-pink": "#C56E6E",
        "block-red": "#DB4E1E",

        // block Background Colors
        "block-gray_background": "#D4CEC1",
        "block-brown_background": "#B7825F",
        "block-orange_background": "#F5A85B",
        "block-yellow_background": "#FAEEBE",
        "block-green_background": "#AAE4BE",
        "block-blue_background": "#52C0C1",
        "block-purple_background": "#A9A7CD",
        "block-pink_background": "#F1C8C4",
        "block-red_background": "#F58E6B",
      },
    },
  },
  safelist: [
    // HTML/JSX 안에서 등장한 클래스 이름을 스캔해서 미리 CSS를 생성하는데,
    // Tailwind가 해당 패턴의 모든 클래스를 강제로 포함시켜 줍니다.
    {
      pattern:
        /text-block-(gray|brown|orange|yellow|green|blue|purple|pink|red)/,
    },
    {
      pattern:
        /bg-block-(gray|brown|orange|yellow|green|blue|purple|pink|red)_background/,
    },
  ],
  plugins: [],
};
