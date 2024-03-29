const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    loader: "default",
    domains: [process.env.DOMAINS, process.env.BUCKET_ENDPOINT],
  },
}

module.exports = nextConfig