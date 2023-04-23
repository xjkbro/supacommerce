/** @type {import('next').NextConfig} */
// const removeImports = require("next-remove-imports")();
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});
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
    env: {
        NEXT_PUBLIC_ENV: "PRODUCTION", //your next configs goes here
    },
    async redirects() {
        return [
            {
                source: "/:slug([a-zA-Z0-9_.+-]*)(.html|.php)",
                destination: "/posts/:slug(\\1)",
                permanent: false,
            },
        ];
    },
};

// module.exports = removeImports(nextConfig);
module.exports = withBundleAnalyzer(nextConfig);
