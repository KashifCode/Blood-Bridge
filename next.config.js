/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["utfs.io", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
