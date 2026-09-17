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
      // Enigma product lives on getenigmaai.com — do not host an Enigma page here.
      { source: "/enigma", destination: "https://getenigmaai.com", permanent: false },
      { source: "/enigma/:path*", destination: "https://getenigmaai.com", permanent: false },
      { source: "/products/enigma", destination: "https://getenigmaai.com", permanent: false },
      { source: "/contact", destination: "/#contact-form", permanent: false },
    ];
  },
};

export default nextConfig;
