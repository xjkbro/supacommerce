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
    // async redirects() {
    //     return [
    //         {
    //             source: "/:slug",
    //             destination: "/api/redirect?slug=:slug",
    //             permanent: false,
    //         },
    //     ];
    // },
};

module.exports = removeImports(nextConfig);
// module.exports = nextConfig;
