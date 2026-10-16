/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Static Export untuk Cloudflare Pages ───
  output: "export",
  images: {
    unoptimized: true,
  },

  // ─── Turbopack untuk dev (hot reload Tailwind) ───
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;