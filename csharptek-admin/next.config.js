/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*.blob.core.windows.net'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.blob.core.windows.net' }
    ]
  }
}

module.exports = nextConfig
