/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  productionBrowserSourceMaps: false,
  basePath: process.env.NODE_ENV === 'production' ? '/blog-posts' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/blog-posts/' : '',
};

export default nextConfig;