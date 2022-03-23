/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
  },
  compiler: {
    styledComponents: true,
  },
  optimizeFonts: false,

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://e-c-ommerce.herokuapp.com/api/v1', // Proxy to Backend
      },
    ]
  },
}
