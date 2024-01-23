/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.course-api.com'],
  },
  compiler: {
    styledComponents: true,
    removeConsole: true,
  },
  optimizeFonts: false,
}
