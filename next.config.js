/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  images: {
    domains: ['img.laximo.ru']
  }
}

module.exports = nextConfig
