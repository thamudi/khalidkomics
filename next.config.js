/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // i18n: {
  //   locales: ['en-US', 'ar'],
  //   defaultLocale: 'en-US',
  //   fallbackLng: {
  //     default: ['en'],
  //   },
  // },
  images: {
    loader: "default",
    domains: ["localhost", "192.168.1.49"],
  },
}

module.exports = nextConfig