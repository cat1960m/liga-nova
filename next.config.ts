import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: "incremental",
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: "/dashboard/customers_old",
        destination: "/dashboard/customers",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fitness-5fc8d921.s3.us-east-1.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
