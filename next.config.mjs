/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  experimental: {
    turbotrace: {
      memoryLimit: 3000,
    },
  },
  output: "standalone",
  images: {
    unoptimized: true,
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "static.wixstatic.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    // ],
  },
};

export default withPlaiceholder(nextConfig);
