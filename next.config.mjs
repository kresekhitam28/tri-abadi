/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — sesuai hosting Anda (Cloudflare Pages, dll)
  output: "export",

  // Wajib untuk static export
  images: {
    unoptimized: true,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
