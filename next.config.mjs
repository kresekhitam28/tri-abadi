/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — sesuai hosting Anda (Cloudflare Pages, dll)
  output: "export",

  // Wajib untuk static export
  images: {
    unoptimized: true,
  },

  // ✅ Fitur kompatibel dengan static export:
  experimental: {
    inlineCss: true,             // hilangkan render-blocking CSS
    optimizePackageImports: ["lucide-react"], // kurangi bundle size
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;