/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en'
  },
  images: {
    loader: "default",
    domains: ["localhost", "192.168.1.49"],
  },
}

module.exports = nextConfig