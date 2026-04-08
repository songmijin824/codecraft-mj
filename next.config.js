/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // 기존 svg rule 찾기
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    // 기존 rule에서 svg 제거
    fileLoaderRule.exclude = /\.svg$/;

    // SVGR 추가
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
