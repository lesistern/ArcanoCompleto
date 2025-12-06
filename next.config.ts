import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  turbopack: {
    root: process.cwd(),
  },

  // Comprimir respuestas
  compress: true,

  // Permitir imágenes de Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  // Headers de seguridad y performance
  async headers() {
    return [
      {
        // Aplicar a todas las rutas
        source: '/:path*',
        headers: [
          // Seguridad
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://vercel.live https://*.vercel-scripts.com",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.supabase.co https://ui-avatars.com https://*.readyplayer.me https://readyplayer.me",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live https://*.vercel-scripts.com https://*.readyplayer.me https://readyplayer.me",
              "frame-src 'self' https://*.readyplayer.me https://readyplayer.me",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "base-uri 'self'",
              "object-src 'none'",
            ].join('; ')
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self "https://*.readyplayer.me" "https://readyplayer.me"), microphone=(self "https://*.readyplayer.me" "https://readyplayer.me"), geolocation=()'
          },
        ],
      },
      {
        // Cache agresivo para assets estáticos
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache para imágenes
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
