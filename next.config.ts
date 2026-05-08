import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  async redirects() {
    return [
      { source: "/services", destination: "/what-we-do", permanent: true },
      { source: "/products", destination: "/what-we-do", permanent: true },
      { source: "/products/node2ai", destination: "/what-we-do", permanent: true },
      { source: "/products/supernovaai", destination: "/what-we-do", permanent: true },
    ];
  },
};

export default nextConfig;
