/** @type {import('next').NextConfig} */
const removeImports = require("next-remove-imports")();
const nextConfig = {
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
};

module.exports = removeImports(nextConfig);
// module.exports = nextConfig;
