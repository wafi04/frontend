/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    remotePatterns : [
      {
         hostname : "images.tokopedia.net"
      },{
        hostname : "cdn.ourastore.com"
      }
    ]
  }
}

module.exports = nextConfig
