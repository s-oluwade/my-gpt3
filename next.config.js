/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: 'dummyimage.com',
            },
        ],
    },
};

module.exports = nextConfig;
