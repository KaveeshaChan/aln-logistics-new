import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a plain HTML/CSS/JS bundle into `out/` — cPanel has no Node.js runtime,
  // so this is a static export, not a server. See README.md "Deploying to cPanel".
  output: "export",
  // Next writes `/about/index.html` instead of `/about.html`, so Apache's default
  // directory index serves clean URLs with zero .htaccess rewrite rules.
  trailingSlash: true,
  images: {
    // Static export can't run the Node-based image optimizer. `unoptimized`
    // still renders next/image correctly (as a plain <img>), just without
    // on-the-fly resizing — remotePatterns is kept for local `next dev` only.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
