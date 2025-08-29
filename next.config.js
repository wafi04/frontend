/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    remotePatterns : [
      {
         hostname : "images.tokopedia.net"
      },{
        hostname : "cdn.ourastore.com"
      },
      {
        hostname : "www.ourastore.com"
      },
      {
        hostname : "res.cloudinary.com"
      },
      {
        hostname : "client-cdn.bangjeff.com"
      },
      {
        hostname : "vazzuniverse.id"
      }
    ]
  }
}

module.exports = nextConfig
