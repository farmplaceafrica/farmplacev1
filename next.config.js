// const nextConfig = {
//     experimental: {
//         turbo: true, // Ensure Turbopack is enabled
//     },
//     webpack(config) {
//         config.module.rules.push({
//             test: /\.svg$/,
//             use: ["@svgr/webpack"],
//         });
//         return config;
//     },
// };

// module.exports = nextConfig;


// const nextConfig = {
//     webpack(config) {
//         config.module.rules.push({
//             test: /\.svg$/,
//             use: ["@svgr/webpack"],
//         });
//         return config;
//     },
// };

// module.exports = nextConfig;

// module.exports = {
//     experimental: {
//         turbo: {
//             rules: {
//                 '*.svg': {
//                     loaders: ['@svgr/webpack'],
//                     as: '*.js',
//                 },
//             },
//         },
//     },
// };


/** @type {import('next').NextConfig} */
const nextConfig = {

    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.(".svg")
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // Keep existing file-loader behavior for ?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ["@svgr/webpack"], // Use SVGR for non-URL SVGs
            }
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

module.exports = nextConfig;
