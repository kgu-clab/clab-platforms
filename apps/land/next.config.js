/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_SERVER_URL],
  },
};

module.exports = nextConfig;
