/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Removes limit of 1000 images being optimized by vercel
        unoptimized: true,
        domains: ['books.google.com'],
    },
};

export default nextConfig;
