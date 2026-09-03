import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio-api.cristianpuentes.com",
        pathname: "/portfolio-media/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);