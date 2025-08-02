/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
