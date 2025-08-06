/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://images.unsplash.com/**"),
      new URL("https://tempdevenvb.ticket-tribe.com/**"),
    ],
  },
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
