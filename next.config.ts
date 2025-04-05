const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: { ignoreDuringBuilds: true },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/nl/home",
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
