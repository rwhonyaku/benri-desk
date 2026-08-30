import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.benri-desk.com",
          },
        ],
        destination: "https://benri-desk.com/:path*",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
