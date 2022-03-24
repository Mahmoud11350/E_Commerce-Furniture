/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com'],
  },
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  optimizeFonts: false,
}
