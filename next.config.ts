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
};

export default nextConfig;
