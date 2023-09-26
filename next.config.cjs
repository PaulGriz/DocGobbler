/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  // From the SVGR Docs: https://react-svgr.com/docs/next/
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"))
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      }
    )
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
  // If you have a paid Vercel plan, you can enable the following:
  // functions: {
  //   "api/**/*.ts": {
  //     maxDuration: 60,
  //   },
  // },
}

module.exports = nextConfig
