/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  server: {
    // Listen on all available network interfaces
    host: '0.0.0.0',
    // You can change this port if needed
    port: 3000,
  },
};

export default nextConfig;
