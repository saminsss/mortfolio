import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
      allowedOrigins: [
        "xxxxxxxx-3000.xxx.devtunnels.ms" /* or Codespace port forward url, no including scheme */,
        "localhost:3000",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BLOB_HOSTNAME ?? "",
      },
    ],
  },
};

export default nextConfig;
