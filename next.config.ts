import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['anpr-app-38041218298.asia-southeast2.run.app'], // Replace 'localhost' with your actual domain in production
  },
};

module.exports = {
  images: {
    domains: ['storage.googleapis.com'],
  },
};

export default nextConfig;
