/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during builds for production deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Disable TypeScript checking during builds for production deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [], // Add any external image domains here
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/dashboard/overview',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },

  // Environment variables validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Output configuration for static export (if needed)
  // output: 'export', // Uncomment for static export
  
  // Trailing slash configuration
  trailingSlash: false,
  
  // Compression
  compress: true,
  
  // PoweredByHeader: false, // Disable X-Powered-By header
};

module.exports = nextConfig;
