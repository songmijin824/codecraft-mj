/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // 기존의 SVG 규칙을 찾습니다.
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // 1. *.svg?url 형태의 임포트는 기존처럼 파일 경로로 처리합니다.
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 2. 그 외의 모든 .svg 파일 임포트는 @svgr/webpack을 사용하여 리액트 컴포넌트로 변환합니다.
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );

    // 기존 규칙에서 .svg 파일은 제외시킵니다.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
