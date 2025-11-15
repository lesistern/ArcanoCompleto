import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  experimental: {
    // Partial Prerendering - Combina estático + dinámico
    ppr: 'incremental',

    // Optimiza imports de paquetes pesados (solo carga iconos usados)
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },

  // Comprimir respuestas
  compress: true,
};

export default bundleAnalyzer(nextConfig);
