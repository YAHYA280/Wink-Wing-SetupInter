const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  // Remove the redirects section or comment it out
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/nl",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = withNextIntl(nextConfig);