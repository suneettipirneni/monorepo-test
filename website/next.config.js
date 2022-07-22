/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  outputFileTracing: false,
  webpack(config, options) {
    console.log(config.module.rules);
    config.module.rules.push({
      test: /\.json$/,
      loader: "json-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
