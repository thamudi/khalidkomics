/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'ar'],
    defaultLocale: 'en-US',
    fallbackLng: {
      default: ['en'],
    },
  },
  images: {
    loader: "default",
    domains: ["localhost"],
  },
}

module.exports = nextConfig
