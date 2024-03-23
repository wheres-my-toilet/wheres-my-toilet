/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/intro_page", permanent: true }]
  }
};

export default nextConfig;
