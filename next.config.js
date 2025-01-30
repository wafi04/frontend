/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
      {
        hostname: "www.adidas.co.id",
      },
      {
        hostname: "static.nike.com",
      },
      {
        hostname: "plus.unsplash.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "unsplash.com",
      },
      {
        hostname: "img.freepik.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
