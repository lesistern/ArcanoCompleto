import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWAInit from "@ducanh2912/next-pwa";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Configuración de PWA con @ducanh2912/next-pwa (soporta Next.js 15+)
const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'supabase-api',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 24 * 60 * 60 // 24 horas
          },
          networkTimeoutSeconds: 10
        }
      },
      {
        urlPattern: /^https?.*\.(png|jpg|jpeg|webp|svg|gif|ico)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 días
          }
        }
      },
      {
        urlPattern: /^https?.*\.(woff|woff2|ttf|eot)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'font-cache',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 365 * 24 * 60 * 60 // 1 año
          }
        }
      }
    ]
  }
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
              "img-src 'self' data: blob: https://*.supabase.co https://ui-avatars.com https://*.readyplayer.me https://readyplayer.me https://staticimgly.com https://*.staticimgly.com",
              "connect-src 'self' blob: https://*.supabase.co wss://*.supabase.co https://vercel.live https://*.vercel-scripts.com https://*.readyplayer.me https://readyplayer.me https://staticimgly.com https://*.staticimgly.com",
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
          // Habilitar SharedArrayBuffer para WASM multithreading (requerido por @imgly/background-removal)
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
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

export default withPWA(bundleAnalyzer(nextConfig));
