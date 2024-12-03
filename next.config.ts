import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['127.0.0.1'], // Replace 'localhost' with your actual domain in production
  },
};

// module.exports = {
//   images: {
//     domains: ['storage.googleapis.com'],
//   },
// };

export default nextConfig;
