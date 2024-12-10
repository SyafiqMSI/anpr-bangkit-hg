import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['35.197.141.36'], // Replace 'localhost' with your actual domain in production
  },
};

module.exports = {
  images: {
    domains: ['storage.googleapis.com'],
  },
};

export default nextConfig;
