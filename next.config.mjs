/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "api-game.ruhyat.com",
      "127.0.0.1",
      "file-game.ruhyat.com",
    ],
  },
};

export default nextConfig;
