/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: true, // required for static export
  },
};

export default nextConfig;
