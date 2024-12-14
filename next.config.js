/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["fakestoreapi.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/signin",
        permanent: true,
      },
    ];
  },
  compress: true, // Enable gzip compression
  webpack: (config) => {
    // Optional: Custom Webpack configuration
    config.optimization.splitChunks = {
      chunks: 'all',
    };
    return config;
  },
};

module.exports = nextConfig;
