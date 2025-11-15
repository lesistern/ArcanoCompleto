import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental: {
    // Optimiza imports de paquetes pesados (solo carga iconos usados)
    optimizePackageImports: ['lucide-react', 'react-icons'],
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
};

export default bundleAnalyzer(nextConfig);
